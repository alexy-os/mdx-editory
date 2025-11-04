import path from 'path';
import { ProseMarkdownConverter, printReport } from './converter';
import { loadConfig, loadConfigFromEnv, validateConfig, createDefaultConfig, DEFAULT_CONFIG } from './config';

interface CliArgs {
  config?: string;
  source?: string;
  output?: string;
  help?: boolean;
  version?: boolean;
  init?: boolean;
  verbose?: boolean;
}

/**
 * Parse command line arguments
 */
function parseArgs(argv: string[]): CliArgs {
  const args: CliArgs = {};

  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i];

    switch (arg) {
      case '--config':
      case '-c':
        args.config = argv[++i];
        break;
      case '--source':
      case '-s':
        args.source = argv[++i];
        break;
      case '--output':
      case '-o':
        args.output = argv[++i];
        break;
      case '--help':
      case '-h':
        args.help = true;
        break;
      case '--version':
      case '-v':
        args.version = true;
        break;
      case '--init':
        args.init = true;
        break;
      case '--verbose':
        args.verbose = true;
        break;
    }
  }

  return args;
}

/**
 * Print help message
 */
function printHelp(): void {
  console.log(`
@editory/prose-md - Convert HTML prose content from JSON to Markdown (GFM)

Usage:
  prose-md [options]

Options:
  -c, --config <path>    Path to configuration file (default: prose-md.config.json)
  -s, --source <dir>     Source directory with JSON files
  -o, --output <dir>     Output directory for Markdown files
  --init                 Initialize default configuration file
  -v, --version          Show version
  -h, --help             Show this help message
  --verbose              Enable verbose logging

Notes:
  - Recursively processes all .json files under the source directory
  - Uses unified/rehype/remark with GFM for robust HTML→Markdown

Examples:
  # Use default config
  prose-md

  # Use custom config file
  prose-md --config my-config.json

  # Override source and output
  prose-md --source ./data --output ./markdown

  # Initialize default config
  prose-md --init

  # Combine options
  prose-md --config config.json --source ./json --output ./md --verbose

Configuration File Format:
  {
    "sourceDir": "./src/source",
    "outputDir": "./docs",
    "validation": {
      "enabled": true,
      "patterns": [
        {
          "tag": "div",
          "attribute": "class",
          "pattern": "prose"
        }
      ],
      "strict": true,
      "skipTags": ["svg"]
    },
    "conversion": {
      "preserveFrontmatter": true,
      "includeMetadata": true,
      "cleanHtml": true
    },
    "naming": {
      "useTitle": true,
      "useFallback": true,
      "sanitize": true
    }
  }

For more information, visit: https://github.com/buildy-ui/editory
  `);
}

/**
 * Print version
 */
function printVersion(): void {
  console.log('@editory/prose-md v1.0.0');
}

/**
 * Main CLI function
 */
export async function runCli(argv: string[] = process.argv.slice(2)): Promise<void> {
  try {
    const args = parseArgs(argv);

    // Handle help
    if (args.help) {
      printHelp();
      process.exit(0);
    }

    // Handle version
    if (args.version) {
      printVersion();
      process.exit(0);
    }

    // Handle init
    if (args.init) {
      const configPath = args.config || 'prose-md.config.json';
      await createDefaultConfig(configPath);
      console.log('✓ Default configuration created');
      process.exit(0);
    }

    // Load configuration
    let config = loadConfigFromEnv();

    if (args.config) {
      config = await loadConfig(path.resolve(args.config));
    } else if (!args.source && !args.output) {
      // Try to load default config if it exists
      try {
        config = await loadConfig('prose-md.config.json');
      } catch {
        // Use defaults
      }
    }

    // Override with command line arguments
    if (args.source) {
      config.sourceDir = path.resolve(args.source);
    }
    if (args.output) {
      config.outputDir = path.resolve(args.output);
    }

    // Validate configuration
    const validation = validateConfig(config);
    if (!validation.isValid) {
      console.error('Configuration validation errors:');
      validation.errors.forEach(error => console.error(`  - ${error}`));
      process.exit(1);
    }

    if (args.verbose) {
      console.log('Configuration:');
      console.log(JSON.stringify(config, null, 2));
      console.log();
    }

    // Create converter and run
    console.log(`Converting files from ${config.sourceDir} to ${config.outputDir}...\n`);

    const converter = new ProseMarkdownConverter(config);
    const report = await converter.convertDirectory();

    printReport(report);

    // Exit with appropriate code
    process.exit(report.failedConversions > 0 ? 1 : 0);
  } catch (error) {
    console.error('CLI Error:', error instanceof Error ? error.message : String(error));
    process.exit(1);
  }
}
