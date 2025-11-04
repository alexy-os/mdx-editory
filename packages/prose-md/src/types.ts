// Configuration types
export interface ValidationPattern {
  tag: string;              // 'div'
  attribute: string;        // 'class'
  pattern: string | RegExp; // 'prose' or regex pattern
}

export interface ConversionConfig {
  // Source and output directories
  sourceDir: string;
  outputDir: string;
  
  // Validation
  validation: {
    enabled: boolean;
    patterns: ValidationPattern[];
    strict: boolean; // If true, all patterns must match
  };
  
  // Conversion options
  conversion: {
    preserveFrontmatter: boolean;
    includeMetadata: boolean;
    cleanHtml: boolean;
  };
  
  // File naming
  naming: {
    useTitle: boolean;
    useFallback: boolean;
    sanitize: boolean;
  };
}

// JSON source file type
export interface ProseJsonSource {
  title: string;
  content: string; // HTML content
  [key: string]: any; // Additional fields
}

// Conversion result
export interface ConversionResult {
  success: boolean;
  sourcePath: string;
  destinationPath?: string;
  title: string;
  error?: string;
  message?: string;
}

// Batch conversion report
export interface ConversionReport {
  totalFiles: number;
  successfulConversions: number;
  failedConversions: number;
  results: ConversionResult[];
  startTime: Date;
  endTime: Date;
  duration: number; // milliseconds
}

// Validation result
export interface ValidationResult {
  isValid: boolean;
  error?: string;
  matchedPatterns: string[];
}
