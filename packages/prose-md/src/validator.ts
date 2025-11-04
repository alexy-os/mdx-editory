import type { ValidationPattern, ValidationResult, ProseJsonSource } from './types';

/**
 * Validate if content contains prose div element
 */
export function validateProseContent(html: string, patterns: ValidationPattern[]): ValidationResult {
  if (!html || typeof html !== 'string') {
    return {
      isValid: false,
      error: 'Content is not a valid string',
      matchedPatterns: [],
    };
  }

  const matchedPatterns: string[] = [];
  
  try {
    // Check for basic HTML structure
    if (!/<[^>]+>/i.test(html)) {
      return {
        isValid: false,
        error: 'Content does not contain valid HTML',
        matchedPatterns: [],
      };
    }

    // Validate each pattern using regex
    for (const pattern of patterns) {
      if (validatePatternRegex(html, pattern)) {
        matchedPatterns.push(`${pattern.tag}[${pattern.attribute}*="${pattern.pattern}"]`);
      } else {
        return {
          isValid: false,
          error: `Pattern not found: ${pattern.tag}[${pattern.attribute}] containing "${pattern.pattern}"`,
          matchedPatterns,
        };
      }
    }

    return {
      isValid: true,
      matchedPatterns,
    };
  } catch (error) {
    return {
      isValid: false,
      error: `Validation error: ${error instanceof Error ? error.message : String(error)}`,
      matchedPatterns,
    };
  }
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
