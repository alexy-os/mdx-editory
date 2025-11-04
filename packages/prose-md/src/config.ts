import { promises as fs } from 'fs';
import path from 'path';
import type { ConversionConfig, ValidationPattern } from './types';

/**
 * Default configuration
 */
export const DEFAULT_CONFIG: ConversionConfig = {
  sourceDir: './src/source',
  outputDir: './src/docs',
  validation: {
    enabled: true,
    patterns: [
      {
        tag: 'div',
        attribute: 'class',
        pattern: 'prose',
      },
    ],
    strict: true,
  },
  conversion: {
    preserveFrontmatter: true,
    includeMetadata: true,
    cleanHtml: true,
  },
  naming: {
    useTitle: true,
    useFallback: true,
    sanitize: true,
  },
};

/**
 * Load configuration from file
 */
export async function loadConfig(configPath: string): Promise<ConversionConfig> {
  try {
    const content = await fs.readFile(configPath, 'utf-8');
    const userConfig = JSON.parse(content) as Partial<ConversionConfig>;
    
    // Deep merge with defaults
    return mergeConfigs(DEFAULT_CONFIG, userConfig);
  } catch (error) {
    console.warn(`Failed to load config from ${configPath}, using defaults`);
    console.warn(error instanceof Error ? error.message : String(error));
    return DEFAULT_CONFIG;
  }
}

/**
 * Load configuration from environment variables
 */
export function loadConfigFromEnv(): ConversionConfig {
  const config = { ...DEFAULT_CONFIG };

  if (process.env.PROSE_SOURCE_DIR) {
    config.sourceDir = process.env.PROSE_SOURCE_DIR;
  }

  if (process.env.PROSE_OUTPUT_DIR) {
    config.outputDir = process.env.PROSE_OUTPUT_DIR;
  }

  if (process.env.PROSE_VALIDATION_ENABLED !== undefined) {
    config.validation.enabled = process.env.PROSE_VALIDATION_ENABLED === 'true';
  }

  if (process.env.PROSE_CLEAN_HTML !== undefined) {
    config.conversion.cleanHtml = process.env.PROSE_CLEAN_HTML === 'true';
  }

  if (process.env.PROSE_INCLUDE_METADATA !== undefined) {
    config.conversion.includeMetadata = process.env.PROSE_INCLUDE_METADATA === 'true';
  }

  return config;
}

/**
 * Merge user config with defaults
 */
function mergeConfigs(defaults: ConversionConfig, userConfig: Partial<ConversionConfig>): ConversionConfig {
  return {
    sourceDir: userConfig.sourceDir ?? defaults.sourceDir,
    outputDir: userConfig.outputDir ?? defaults.outputDir,
    validation: {
      enabled: userConfig.validation?.enabled ?? defaults.validation.enabled,
      patterns: userConfig.validation?.patterns ?? defaults.validation.patterns,
      strict: userConfig.validation?.strict ?? defaults.validation.strict,
    },
    conversion: {
      preserveFrontmatter: userConfig.conversion?.preserveFrontmatter ?? defaults.conversion.preserveFrontmatter,
      includeMetadata: userConfig.conversion?.includeMetadata ?? defaults.conversion.includeMetadata,
      cleanHtml: userConfig.conversion?.cleanHtml ?? defaults.conversion.cleanHtml,
    },
    naming: {
      useTitle: userConfig.naming?.useTitle ?? defaults.naming.useTitle,
      useFallback: userConfig.naming?.useFallback ?? defaults.naming.useFallback,
      sanitize: userConfig.naming?.sanitize ?? defaults.naming.sanitize,
    },
  };
}

/**
 * Create a default config file
 */
export async function createDefaultConfig(filePath: string): Promise<void> {
  try {
    const dir = path.dirname(filePath);
    await fs.mkdir(dir, { recursive: true });
    
    const content = JSON.stringify(DEFAULT_CONFIG, null, 2);
    await fs.writeFile(filePath, content, 'utf-8');
    console.log(`Created default config at ${filePath}`);
  } catch (error) {
    console.error(`Failed to create config file: ${error}`);
    throw error;
  }
}

/**
 * Validate configuration
 */
export function validateConfig(config: ConversionConfig): { isValid: boolean; errors: string[] } {
  const errors: string[] = [];

  if (!config.sourceDir) {
    errors.push('sourceDir is required');
  }

  if (!config.outputDir) {
    errors.push('outputDir is required');
  }

  if (!Array.isArray(config.validation.patterns) || config.validation.patterns.length === 0) {
    errors.push('At least one validation pattern is required');
  }

  for (const pattern of config.validation.patterns) {
    if (!pattern.tag) {
      errors.push('Validation pattern: tag is required');
    }
    if (!pattern.attribute) {
      errors.push('Validation pattern: attribute is required');
    }
    if (!pattern.pattern) {
      errors.push('Validation pattern: pattern is required');
    }
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}
