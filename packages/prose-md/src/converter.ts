import { promises as fs } from 'fs';
import path from 'path';
import type { ConversionConfig, ConversionResult, ProseJsonSource, ConversionReport } from './types';
import { validateProseContent, validateJsonSource, sanitizeFileName, validateFileName } from './validator';

/**
 * Simple HTML to Markdown converter for Node.js
 */
function simpleHtmlToMarkdown(html: string): string {
  let markdown = html
    // Headers
    .replace(/<h1[^>]*>(.*?)<\/h1>/gi, '# $1\n\n')
    .replace(/<h2[^>]*>(.*?)<\/h2>/gi, '## $1\n\n')
    .replace(/<h3[^>]*>(.*?)<\/h3>/gi, '### $1\n\n')
    .replace(/<h4[^>]*>(.*?)<\/h4>/gi, '#### $1\n\n')
    .replace(/<h5[^>]*>(.*?)<\/h5>/gi, '##### $1\n\n')
    .replace(/<h6[^>]*>(.*?)<\/h6>/gi, '###### $1\n\n')
    // Paragraphs
    .replace(/<p[^>]*>(.*?)<\/p>/gi, '$1\n\n')
    // Line breaks
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<hr\s*\/?>/gi, '---\n\n')
    // Bold
    .replace(/<strong[^>]*>(.*?)<\/strong>/gi, '**$1**')
    .replace(/<b[^>]*>(.*?)<\/b>/gi, '**$1**')
    // Italic
    .replace(/<em[^>]*>(.*?)<\/em>/gi, '*$1*')
    .replace(/<i[^>]*>(.*?)<\/i>/gi, '*$1*')
    // Strikethrough
    .replace(/<s[^>]*>(.*?)<\/s>/gi, '~~$1~~')
    .replace(/<del[^>]*>(.*?)<\/del>/gi, '~~$1~~')
    // Code
    .replace(/<code[^>]*>(.*?)<\/code>/gi, '`$1`')
    // Pre/code blocks
    .replace(/<pre[^>]*><code[^>]*>([\s\S]*?)<\/code><\/pre>/gi, '```\n$1\n```\n\n')
    // Links
    .replace(/<a[^>]*href="([^"]*)"[^>]*>(.*?)<\/a>/gi, '[$2]($1)')
    // Images
    .replace(/<img[^>]*src="([^"]*)"[^>]*alt="([^"]*)"[^>]*>/gi, '![$2]($1)')
    // Lists
    .replace(/<ul[^>]*>([\s\S]*?)<\/ul>/gi, (match, content) => {
      return content.replace(/<li[^>]*>(.*?)<\/li>/gi, '- $1\n') + '\n';
    })
    .replace(/<ol[^>]*>([\s\S]*?)<\/ol>/gi, (match, content) => {
      let counter = 1;
      return content.replace(/<li[^>]*>(.*?)<\/li>/gi, () => `${counter++}. $1\n`) + '\n';
    })
    // Remove remaining HTML tags
    .replace(/<[^>]+>/g, '')
    // Clean up whitespace
    .replace(/\n{3,}/g, '\n\n')
    .trim();

  return markdown;
}

/**
 * Main converter class
 */
export class ProseMarkdownConverter {
  private config: ConversionConfig;

  constructor(config: ConversionConfig) {
    this.config = config;
  }

  /**
   * Recursively extract all prose documents from nested JSON
   */
  private async extractDocuments(data: unknown, prefix = ''): Promise<Array<{ document: ProseJsonSource; id: string }>> {
    const documents: Array<{ document: ProseJsonSource; id: string }> = [];

    if (!data || typeof data !== 'object') {
      return documents;
    }

    // Handle arrays
    if (Array.isArray(data)) {
      for (let i = 0; i < data.length; i++) {
        const item = data[i];
        const id = `${prefix}[${i}]`;
        
        if (this.isProseDocument(item)) {
          documents.push({ document: item as ProseJsonSource, id });
        } else if (typeof item === 'object' && item !== null) {
          const nested = await this.extractDocuments(item, id);
          documents.push(...nested);
        }
      }
    } else {
      // Handle objects
      const obj = data as Record<string, unknown>;
      
      for (const [key, value] of Object.entries(obj)) {
        const id = prefix ? `${prefix}.${key}` : key;
        
        // Check if this is a prose document
        if (this.isProseDocument(value)) {
          documents.push({ document: value as ProseJsonSource, id });
        } else if (typeof value === 'object' && value !== null) {
          // Recurse into nested objects
          const nested = await this.extractDocuments(value, id);
          documents.push(...nested);
        }
      }
    }

    return documents;
  }

  /**
   * Check if an object is a valid prose document
   */
  private isProseDocument(obj: unknown): boolean {
    if (!obj || typeof obj !== 'object') {
      return false;
    }

    const candidate = obj as Record<string, unknown>;
    
    // Must have title and content fields
    return (
      typeof candidate.title === 'string' &&
      typeof candidate.content === 'string' &&
      candidate.title.length > 0 &&
      candidate.content.length > 0
    );
  }

  /**
   * Convert a single HTML content to Markdown
   */
  async convertFile(source: ProseJsonSource, sourceFileName: string): Promise<ConversionResult> {
    try {
      // Validate JSON source
      const sourceValidation = validateJsonSource(source);
      if (!sourceValidation.isValid) {
        return {
          success: false,
          sourcePath: sourceFileName,
          title: source.title || 'Unknown',
          error: sourceValidation.error,
        };
      }

      // Validate content with prose patterns
      if (this.config.validation.enabled) {
        const validation = validateProseContent(source.content, this.config.validation.patterns);
        if (!validation.isValid) {
          return {
            success: false,
            sourcePath: sourceFileName,
            title: source.title,
            error: `Validation failed: ${validation.error}`,
          };
        }
      }

      // Clean HTML if needed
      let htmlContent = source.content;
      if (this.config.conversion.cleanHtml) {
        htmlContent = this.cleanHtmlContent(htmlContent);
      }

      // Convert HTML to Markdown using simple converter
      let markdown: string;
      try {
        markdown = simpleHtmlToMarkdown(htmlContent);
      } catch (error) {
        return {
          success: false,
          sourcePath: sourceFileName,
          title: source.title,
          error: `Error converting HTML to markdown: ${error instanceof Error ? error.message : String(error)}`,
        };
      }

      // Generate output filename
      let fileName = source.title;
      if (this.config.naming.sanitize) {
        fileName = sanitizeFileName(fileName);
      }
      if (!validateFileName(fileName)) {
        fileName = sanitizeFileName(fileName);
      }

      const outputFileName = `${fileName}.md`;
      const outputPath = path.join(this.config.outputDir, outputFileName);

      // Create output directory if needed
      await fs.mkdir(this.config.outputDir, { recursive: true });

      // Prepare final content
      let finalContent = markdown;
      if (this.config.conversion.includeMetadata) {
        finalContent = this.prependMetadata(source, finalContent);
      }

      // Write file
      await fs.writeFile(outputPath, finalContent, 'utf-8');

      return {
        success: true,
        sourcePath: sourceFileName,
        destinationPath: outputPath,
        title: source.title,
        message: `Successfully converted to ${outputFileName}`,
      };
    } catch (error) {
      return {
        success: false,
        sourcePath: sourceFileName,
        title: source.title || 'Unknown',
        error: `Conversion error: ${error instanceof Error ? error.message : String(error)}`,
      };
    }
  }

  /**
   * Convert all JSON files in source directory with recursive document extraction
   */
  async convertDirectory(): Promise<ConversionReport> {
    const startTime = new Date();
    const results: ConversionResult[] = [];

    try {
      // Read source directory
      const files = await fs.readdir(this.config.sourceDir);
      const jsonFiles = files.filter(f => f.endsWith('.json'));

      if (jsonFiles.length === 0) {
        console.warn(`No JSON files found in ${this.config.sourceDir}`);
      }

      // Process each file
      for (const jsonFile of jsonFiles) {
        const filePath = path.join(this.config.sourceDir, jsonFile);
        
        try {
          const content = await fs.readFile(filePath, 'utf-8');
          const jsonData = JSON.parse(content);
          
          // Extract all documents from nested structure
          const documents = await this.extractDocuments(jsonData);

          if (documents.length === 0) {
            results.push({
              success: false,
              sourcePath: jsonFile,
              title: 'Unknown',
              error: 'No valid prose documents found in JSON file',
            });
            console.warn(`⚠ ${jsonFile}: No valid prose documents found`);
            continue;
          }

          // Process each extracted document
          for (const { document, id } of documents) {
            const result = await this.convertFile(document, `${jsonFile}:${id}`);
            results.push(result);

            // Log result
            if (result.success) {
              console.log(`✓ ${jsonFile}:${id} → ${path.basename(result.destinationPath || '')}`);
            } else {
              console.error(`✗ ${jsonFile}:${id}: ${result.error}`);
            }
          }
        } catch (error) {
          results.push({
            success: false,
            sourcePath: jsonFile,
            title: 'Unknown',
            error: `Failed to read or parse JSON: ${error instanceof Error ? error.message : String(error)}`,
          });
          console.error(`✗ ${jsonFile}: Failed to process`);
        }
      }
    } catch (error) {
      console.error(`Directory conversion error: ${error}`);
    }

    const endTime = new Date();
    const duration = endTime.getTime() - startTime.getTime();
    const successfulConversions = results.filter(r => r.success).length;

    return {
      totalFiles: results.length,
      successfulConversions,
      failedConversions: results.length - successfulConversions,
      results,
      startTime,
      endTime,
      duration,
    };
  }

  /**
   * Clean HTML content by removing prose wrapper
   */
  private cleanHtmlContent(html: string): string {
    // Extract content from prose div if present
    const proseMatch = html.match(/<div[^>]*class="[^"]*prose[^"]*"[^>]*>([\s\S]*?)<\/div>/);
    if (proseMatch && proseMatch[1]) {
      return proseMatch[1];
    }
    return html;
  }

  /**
   * Prepend metadata as frontmatter
   */
  private prependMetadata(source: ProseJsonSource, markdown: string): string {
    const frontmatter: Record<string, any> = {
      title: source.title,
      generatedAt: new Date().toISOString(),
    };

    // Add additional metadata fields if present
    if (source.excerpt) {
      frontmatter.excerpt = source.excerpt;
    }
    if (source.categories) {
      frontmatter.categories = source.categories;
    }
    if (source.tags) {
      frontmatter.tags = source.tags;
    }
    if (source.author) {
      frontmatter.author = source.author;
    }

    const frontmatterStr = JSON.stringify(frontmatter, null, 2);
    return `---\n${frontmatterStr}\n---\n\n${markdown}`;
  }
}

/**
 * Print conversion report
 */
export function printReport(report: ConversionReport): void {
  console.log('\n' + '='.repeat(60));
  console.log('Conversion Report');
  console.log('='.repeat(60));
  console.log(`Total files: ${report.totalFiles}`);
  console.log(`Successful: ${report.successfulConversions} ✓`);
  console.log(`Failed: ${report.failedConversions} ✗`);
  console.log(`Duration: ${report.duration}ms`);
  console.log('='.repeat(60) + '\n');
}
