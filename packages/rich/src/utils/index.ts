import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function parseMarkdownFile(content: string) {
  // Simple frontmatter parser without gray-matter
  const frontmatterRegex = /^---\n([\s\S]*?)\n---\n([\s\S]*)$/;
  const match = content.match(frontmatterRegex);
  
  if (match) {
    const [, frontmatterString, body] = match;
    try {
      // Simple YAML parser for basic cases
      const frontmatter = parseFrontmatter(frontmatterString);
      return { frontmatter, body: body.trim() };
    } catch (error) {
      console.warn('Failed to parse frontmatter:', error);
      return { frontmatter: {}, body: content };
    }
  }
  
  return { frontmatter: {}, body: content };
}

export function stringifyMarkdownFile(frontmatter: Record<string, any>, content: string) {
  if (Object.keys(frontmatter).length === 0) {
    return content;
  }
  
  const frontmatterString = Object.entries(frontmatter)
    .map(([key, value]) => {
      if (typeof value === 'string') {
        return `${key}: "${value}"`;
      } else if (Array.isArray(value)) {
        return `${key}: [${value.map(v => typeof v === 'string' ? `"${v}"` : JSON.stringify(v)).join(', ')}]`;
      } else if (typeof value === 'object' && value !== null) {
        return `${key}: ${JSON.stringify(value)}`;
      }
      return `${key}: ${value}`;
    })
    .join('\n');
  
  return `---\n${frontmatterString}\n---\n\n${content}`;
}

function parseFrontmatter(frontmatterString: string): Record<string, any> {
  const result: Record<string, any> = {};
  const lines = frontmatterString.split('\n');
  
  for (const line of lines) {
    const colonIndex = line.indexOf(':');
    if (colonIndex === -1) continue;
    
    const key = line.slice(0, colonIndex).trim();
    const valueStr = line.slice(colonIndex + 1).trim();
    
    if (!key) continue;
    
    // Parsing values
    if (valueStr.startsWith('"') && valueStr.endsWith('"')) {
      // String in quotes
      result[key] = valueStr.slice(1, -1);
    } else if (valueStr.startsWith('[') && valueStr.endsWith(']')) {
      // Array
      try {
        result[key] = JSON.parse(valueStr);
      } catch {
        result[key] = valueStr;
      }
    } else if (valueStr.startsWith('{') && valueStr.endsWith('}')) {
      // Object
      try {
        result[key] = JSON.parse(valueStr);
      } catch {
        result[key] = valueStr;
      }
    } else if (valueStr === 'true' || valueStr === 'false') {
      // Boolean value
      result[key] = valueStr === 'true';
    } else if (!isNaN(Number(valueStr))) {
      // Number
      result[key] = Number(valueStr);
    } else {
      // Regular string
      result[key] = valueStr;
    }
  }
  
  return result;
}

export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

export function generateExcerpt(content: string, maxLength: number = 160): string {
  const cleanContent = content.replace(/[#*`]/g, '').trim();
  if (cleanContent.length <= maxLength) return cleanContent;
  return cleanContent.substring(0, maxLength).trim() + '...';
}

export function generateId(): number {
  return Date.now() + Math.floor(Math.random() * 1000);
}

export function formatDate(date: Date): {
  formatted: string;
  display: string;
  timestamp: number;
  year: string;
  month: string;
  day: string;
} {
  const timestamp = date.getTime();
  const year = date.getFullYear().toString();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  
  return {
    formatted: `${year}-${month}-${day}`,
    display: date.toLocaleDateString('ru-RU', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }),
    timestamp,
    year,
    month,
    day
  };
} 