import { marked } from 'marked';
import TurndownService from 'turndown';

// Setup marked for parsing Markdown to HTML
marked.setOptions({
  breaks: true, // Support line breaks
  gfm: true,    // GitHub Flavored Markdown
});

// Setup Turndown for converting HTML to Markdown
const turndownService = new TurndownService({
  headingStyle: 'atx',
  codeBlockStyle: 'fenced',
  fence: '```',
  emDelimiter: '_',
  strongDelimiter: '**',
  linkStyle: 'inlined',
  linkReferenceStyle: 'full'
});

// Add rules for better conversion
turndownService.addRule('strikethrough', {
  filter: ['del', 's'],
  replacement: function (content) {
    return '~~' + content + '~~';
  }
});

turndownService.addRule('tables', {
  filter: 'table',
  replacement: function (content) {
    return '\n\n' + content + '\n\n';
  }
});

turndownService.addRule('tableSection', {
  filter: ['thead', 'tbody', 'tfoot'],
  replacement: function (content) {
    return content;
  }
});

turndownService.addRule('tableRow', {
  filter: 'tr',
  replacement: function (content, node) {
    const borderCells = Array.from(node.childNodes).map(() => '---').join(' | ');
    const isHeadingRow = node.parentNode?.nodeName === 'THEAD';
    
    return (
      '| ' + content + ' |\n' + 
      (isHeadingRow ? '| ' + borderCells + ' |\n' : '')
    );
  }
});

turndownService.addRule('tableCell', {
  filter: ['th', 'td'],
  replacement: function (content) {
    return content.trim() + ' |';
  }
});

/**
 * Convert Markdown to HTML
 */
export function markdownToHtml(markdown: string): string {
  if (!markdown || typeof markdown !== 'string') {
    return '';
  }
  
  try {
    const result = marked.parse(markdown);
    return typeof result === 'string' ? result : markdown;
  } catch (error) {
    console.error('Error converting markdown to HTML:', error);
    return markdown;
  }
}

/**
 * Convert HTML to Markdown
 */
export function htmlToMarkdown(html: string): string {
  if (!html || typeof html !== 'string') {
    return '';
  }
  
  try {
    return turndownService.turndown(html);
  } catch (error) {
    console.error('Error converting HTML to markdown:', error);
    return html;
  }
}

/**
 * Clean HTML of extra tags and attributes for better conversion
 */
export function sanitizeHtmlForMarkdown(html: string): string {
  if (!html || typeof html !== 'string') {
    return '';
  }
  
  // Remove classes and styles that TipTap adds
  return html
    .replace(/\sclass="[^"]*"/g, '')
    .replace(/\sstyle="[^"]*"/g, '')
    .replace(/\sdata-[^=]*="[^"]*"/g, '')
    .replace(/\scontenteditable="[^"]*"/g, '')
    .replace(/\sdraggable="[^"]*"/g, '')
    .replace(/\sspellcheck="[^"]*"/g, '')
    .replace(/<p><\/p>/g, '') // Remove empty paragraphs
    .replace(/\n\s*\n\s*\n/g, '\n\n') // Remove extra line breaks
    .trim();
}

/**
 * Prepare Markdown for display in the TipTap editor
 */
export function prepareMarkdownForEditor(markdown: string): string {
  if (!markdown || typeof markdown !== 'string') {
    return '';
  }
  
  // Convert markdown to HTML for TipTap
  const html = markdownToHtml(markdown);
  
  // Additional transformations for better compatibility with TipTap
  return html
    .replace(/<br\s*\/?>/gi, '<br>')
    .replace(/&nbsp;/g, ' ')
    .trim();
}

/**
 * Prepare HTML from TipTap for saving as Markdown
 */
export function prepareHtmlForMarkdown(html: string): string {
  if (!html || typeof html !== 'string') {
    return '';
  }
  
  const sanitized = sanitizeHtmlForMarkdown(html);
  return htmlToMarkdown(sanitized);
}

/**
 * Check if the content is valid HTML
 */
export function isValidHtml(content: string): boolean {
  if (!content || typeof content !== 'string') {
    return false;
  }
  
  try {
    const parser = new DOMParser();
    const doc = parser.parseFromString(content, 'text/html');
    return !doc.querySelector('parsererror');
  } catch {
    return false;
  }
}

/**
 * Check if the content is Markdown
 */
export function isMarkdownContent(content: string): boolean {
  if (!content || typeof content !== 'string') {
    return false;
  }
  
  // Simple heuristic for determining Markdown
  const markdownPatterns = [
    /^#{1,6}\s/, // headings
    /^\*\s/, // lists
    /^\d+\.\s/, // numbered lists
    /^\>\s/, // quotes
    /```/, // code blocks
    /\*\*.*\*\*/, // bold text
    /\*.*\*/, // italic
    /\[.*\]\(.*\)/, // links
  ];
  
  return markdownPatterns.some(pattern => pattern.test(content));
} 