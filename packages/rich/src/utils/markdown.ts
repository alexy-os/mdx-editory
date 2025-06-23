import { marked } from 'marked';
import TurndownService from 'turndown';

// Настройка marked для парсинга Markdown в HTML
marked.setOptions({
  breaks: true, // Поддержка переносов строк
  gfm: true,    // GitHub Flavored Markdown
});

// Настройка Turndown для конвертации HTML в Markdown
const turndownService = new TurndownService({
  headingStyle: 'atx',
  codeBlockStyle: 'fenced',
  fence: '```',
  emDelimiter: '_',
  strongDelimiter: '**',
  linkStyle: 'inlined',
  linkReferenceStyle: 'full'
});

// Добавляем правила для лучшей конвертации
turndownService.addRule('strikethrough', {
  filter: ['del', 's', 'strike'],
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
 * Конвертирует Markdown в HTML
 */
export function markdownToHtml(markdown: string): string {
  try {
    const result = marked.parse(markdown);
    return typeof result === 'string' ? result : markdown;
  } catch (error) {
    console.error('Error converting markdown to HTML:', error);
    return markdown;
  }
}

/**
 * Конвертирует HTML в Markdown
 */
export function htmlToMarkdown(html: string): string {
  try {
    return turndownService.turndown(html);
  } catch (error) {
    console.error('Error converting HTML to markdown:', error);
    return html;
  }
}

/**
 * Очищает HTML от лишних тегов и атрибутов для лучшей конвертации
 */
export function sanitizeHtmlForMarkdown(html: string): string {
  // Удаляем классы и стили, которые добавляет TipTap
  return html
    .replace(/\sclass="[^"]*"/g, '')
    .replace(/\sstyle="[^"]*"/g, '')
    .replace(/\sdata-[^=]*="[^"]*"/g, '')
    .replace(/\scontenteditable="[^"]*"/g, '')
    .replace(/\sdraggable="[^"]*"/g, '')
    .replace(/\sspellcheck="[^"]*"/g, '')
    .replace(/<p><\/p>/g, '') // Удаляем пустые параграфы
    .replace(/\n\s*\n\s*\n/g, '\n\n') // Убираем лишние переносы
    .trim();
}

/**
 * Подготавливает Markdown для отображения в TipTap редакторе
 */
export function prepareMarkdownForEditor(markdown: string): string {
  // Конвертируем markdown в HTML для TipTap
  const html = markdownToHtml(markdown);
  
  // Дополнительные преобразования для лучшей совместимости с TipTap
  return html
    .replace(/<br\s*\/?>/gi, '<br>')
    .replace(/&nbsp;/g, ' ')
    .trim();
}

/**
 * Подготавливает HTML из TipTap для сохранения как Markdown
 */
export function prepareHtmlForMarkdown(html: string): string {
  const sanitized = sanitizeHtmlForMarkdown(html);
  return htmlToMarkdown(sanitized);
}

/**
 * Проверяет, является ли контент валидным HTML
 */
export function isValidHtml(content: string): boolean {
  try {
    const parser = new DOMParser();
    const doc = parser.parseFromString(content, 'text/html');
    return !doc.querySelector('parsererror');
  } catch {
    return false;
  }
}

/**
 * Проверяет, является ли контент Markdown
 */
export function isMarkdownContent(content: string): boolean {
  // Простая эвристика для определения Markdown
  const markdownPatterns = [
    /^#{1,6}\s/, // заголовки
    /^\*\s/, // списки
    /^\d+\.\s/, // нумерованные списки
    /^\>\s/, // цитаты
    /```/, // блоки кода
    /\*\*.*\*\*/, // жирный текст
    /\*.*\*/, // курсив
    /\[.*\]\(.*\)/, // ссылки
  ];
  
  return markdownPatterns.some(pattern => pattern.test(content));
} 