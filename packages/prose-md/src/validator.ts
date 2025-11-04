import type { ValidationPattern, ValidationResult, ProseJsonSource } from './types';
import { unified } from 'unified';
import rehypeParse from 'rehype-parse';

/**
 * Validate if content contains prose div element
 */
export function validateProseContent(html: string, patterns: ValidationPattern[], strict: boolean = true, skipTags: string[] = []): ValidationResult {
  if (!html || typeof html !== 'string') {
    return { isValid: false, error: 'Content is not a valid string', matchedPatterns: [] };
  }

  const matchedPatterns: string[] = [];

  try {
    // Quick sanity check: contains any HTML tag
    if (!/<[^>]+>/i.test(html)) {
      return { isValid: false, error: 'Content does not contain valid HTML', matchedPatterns: [] };
    }

    // Parse HTML to HAST synchronously
    const processor = unified().use(rehypeParse, { fragment: true });
    // @ts-expect-error rehype-parse augments parse
    const tree = processor.parse(html) as any;

    const patternMatches = patterns.map((p) => ({ pattern: p, matched: hastHasMatch(tree, p, skipTags) }));

    for (const { pattern, matched } of patternMatches) {
      if (matched) {
        matchedPatterns.push(`${pattern.tag}[${pattern.attribute}]`);
      }
    }

    if (strict) {
      const allMatch = patternMatches.every((m) => m.matched);
      return allMatch
        ? { isValid: true, matchedPatterns }
        : { isValid: false, error: missingPatternMessage(patternMatches), matchedPatterns };
    } else {
      const anyMatch = patternMatches.some((m) => m.matched);
      return anyMatch
        ? { isValid: true, matchedPatterns }
        : { isValid: false, error: missingPatternMessage(patternMatches), matchedPatterns };
    }
  } catch (error) {
    return {
      isValid: false,
      error: `Validation error: ${error instanceof Error ? error.message : String(error)}`,
      matchedPatterns,
    };
  }
}

function missingPatternMessage(matches: Array<{ pattern: ValidationPattern; matched: boolean }>): string {
  const missing = matches.filter((m) => !m.matched).map((m) => `${m.pattern.tag}[${m.pattern.attribute}] ~ ${String(m.pattern.pattern)}`);
  return missing.length > 0 ? `Patterns not found: ${missing.join(', ')}` : 'No required patterns matched';
}

function hastHasMatch(tree: any, pattern: ValidationPattern, skipTags: string[] = []): boolean {
  let found = false;

  function toCamelCase(name: string): string {
    return name.replace(/-([a-z])/g, (_, c) => c.toUpperCase());
  }

  function mapAttributeName(attr: string): string {
    const lower = attr.toLowerCase();
    if (lower === 'class') return 'className';
    return toCamelCase(attr);
  }

  function visit(node: any) {
    if (found) return;
    if (node && node.type === 'element' && typeof node.tagName === 'string') {
      // Skip traversing subtrees of specified tags
      if (skipTags.includes(node.tagName.toLowerCase())) {
        return;
      }
      if (node.tagName.toLowerCase() === pattern.tag.toLowerCase()) {
        const props = (node.properties || {}) as Record<string, unknown>;
        const propKey = mapAttributeName(pattern.attribute);
        const value = (props as any)[propKey] ?? (props as any)[pattern.attribute];
        const attrStr = Array.isArray(value) ? value.join(' ') : value == null ? '' : String(value);
        if (typeof pattern.pattern === 'string') {
          if (attrStr.includes(pattern.pattern)) {
            found = true;
          }
        } else if (pattern.pattern instanceof RegExp) {
          if (pattern.pattern.test(attrStr)) {
            found = true;
          }
        }
      }
    }
    const children: any[] = Array.isArray(node?.children) ? node.children : [];
    for (const child of children) visit(child);
  }

  visit(tree);
  return found;
}

/**
 * Check if a specific pattern exists using regex
 */
function validatePatternRegex(html: string, pattern: ValidationPattern): boolean {
  try {
    // Build regex to match tag with attribute containing pattern
    const attrPattern = typeof pattern.pattern === 'string' 
      ? pattern.pattern.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
      : pattern.pattern;
    
    const regex = new RegExp(
      `<${pattern.tag}[^>]*${pattern.attribute}="[^"]*${attrPattern}[^"]*"[^>]*>`,
      'i'
    );
    
    return regex.test(html);
  } catch (error) {
    console.error(`Error validating pattern: ${error}`);
    return false;
  }
}

/**
 * Validate JSON source file structure
 */
export function validateJsonSource(data: unknown): { isValid: boolean; error?: string } {
  if (!data || typeof data !== 'object') {
    return {
      isValid: false,
      error: 'Data must be a valid object',
    };
  }

  const source = data as Record<string, unknown>;

  // Check required fields
  if (!source.title || typeof source.title !== 'string') {
    return {
      isValid: false,
      error: 'Missing or invalid "title" field',
    };
  }

  if (!source.content || typeof source.content !== 'string') {
    return {
      isValid: false,
      error: 'Missing or invalid "content" field',
    };
  }

  return { isValid: true };
}

/**
 * Validate file name
 */
export function validateFileName(fileName: string): boolean {
  // Check for invalid characters
  const invalidChars = /[<>:"/\\|?*\x00-\x1F]/g;
  return !invalidChars.test(fileName);
}

/**
 * Sanitize file name
 */
export function sanitizeFileName(fileName: string): string {
  return fileName
    .replace(/[<>:"/\\|?*\x00-\x1F]/g, '')
    .replace(/\s+/g, '-')
    .toLowerCase()
    .replace(/^-+|-+$/g, '')
    .slice(0, 255); // Max filename length
}
