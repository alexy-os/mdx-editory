# @editory/prose-md

🚀 Convert HTML prose content from JSON to Markdown files using **Editory Rich** converters.

**Key Features:**
- ✅ Validates HTML against customizable prose patterns
- ✅ Uses `@editory/rich` for consistent HTML↔Markdown conversion
- ✅ Batch process JSON files with configurable patterns
- ✅ CLI tool for command-line integration
- ✅ Programmable API for custom workflows
- ✅ TypeScript support
- ✅ Generate frontmatter with metadata

## Installation

### As NPM Package

```bash
npm install @editory/prose-md

# or with yarn
yarn add @editory/prose-md

# or with bun
bun add @editory/prose-md
```

### As CLI Tool

```bash
npm install -g @editory/prose-md

# Then use
prose-md --help
```

## Quick Start

### CLI Usage

```bash
# Initialize default config
prose-md --init

# Convert using config file
prose-md --config prose-md.config.json

# Override source and output
prose-md --source ./json --output ./markdown

# Verbose mode
prose-md --verbose
```

### Programmatic Usage

```typescript
import { ProseMarkdownConverter, loadConfig } from '@editory/prose-md';

// Load configuration
const config = await loadConfig('./prose-md.config.json');

// Create converter
const converter = new ProseMarkdownConverter(config);

// Convert directory
const report = await converter.convertDirectory();

console.log(`Converted ${report.successfulConversions} files`);
```

## Configuration

### Default Configuration

```json
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
    "strict": true
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
```

### Configuration Options

#### `sourceDir`
- **Type:** `string`
- **Description:** Path to directory containing JSON source files
- **Default:** `./src/source`

#### `outputDir`
- **Type:** `string`
- **Description:** Path where Markdown files will be saved
- **Default:** `./docs`

#### `validation`
Validate HTML content structure

- **enabled:** Enable/disable validation (default: `true`)
- **patterns:** Array of validation patterns to match
  - `tag`: HTML tag name (e.g., `div`)
  - `attribute`: Attribute name (e.g., `class`)
  - `pattern`: Pattern to match in attribute value (e.g., `prose`)
- **strict:** Require all patterns to match (default: `true`)

#### `conversion`
Control HTML→Markdown conversion

- **preserveFrontmatter:** Keep frontmatter data (default: `true`)
- **includeMetadata:** Add metadata as frontmatter (default: `true`)
- **cleanHtml:** Remove wrapper tags like prose div (default: `true`)

#### `naming`
Control output file naming

- **useTitle:** Use title field for filename (default: `true`)
- **useFallback:** Use fallback naming if title missing (default: `true`)
- **sanitize:** Sanitize filenames (default: `true`)

## JSON Source Format

Your JSON files should have this structure:

```json
{
  "title": "My Document Title",
  "content": "<div class=\"prose prose-invert max-w-2xl\">...HTML content...</div>",
  "excerpt": "Optional excerpt",
  "categories": ["Category 1", "Category 2"],
  "tags": ["tag1", "tag2"],
  "author": "Author Name"
}
```

### Required Fields

- **title** - Used for filename and frontmatter
- **content** - HTML content to convert to Markdown

### Optional Fields

- **excerpt** - Will be added to frontmatter
- **categories** - Will be added to frontmatter
- **tags** - Will be added to frontmatter
- **author** - Will be added to frontmatter
- Any other fields in the JSON object

## Output

### Generated Markdown File

```markdown
---
{
  "title": "My Document Title",
  "excerpt": "Optional excerpt",
  "categories": ["Category 1", "Category 2"],
  "tags": ["tag1", "tag2"],
  "author": "Author Name",
  "generatedAt": "2025-11-04T12:00:00.000Z"
}
---

# My Document Title

Your converted markdown content here...
```

## CLI Reference

### Help

```bash
prose-md --help
prose-md -h
```

### Initialize Config

```bash
prose-md --init
prose-md --init --config my-config.json
```

### Run Conversion

```bash
# Use default config
prose-md

# Custom config file
prose-md --config config.json
prose-md -c config.json

# Override paths
prose-md --source ./data --output ./md
prose-md -s ./data -o ./md

# Combine options
prose-md -c config.json -s ./json -o ./markdown --verbose

# Show version
prose-md --version
prose-md -v
```

### Environment Variables

```bash
export PROSE_SOURCE_DIR="./json"
export PROSE_OUTPUT_DIR="./markdown"
export PROSE_VALIDATION_ENABLED="true"
export PROSE_CLEAN_HTML="true"
export PROSE_INCLUDE_METADATA="true"

prose-md
```

## API Reference

### ProseMarkdownConverter

Main converter class

```typescript
import { ProseMarkdownConverter } from '@editory/prose-md';

const converter = new ProseMarkdownConverter(config);

// Convert single file
const result = await converter.convertFile(jsonData, 'source.json');

// Convert entire directory
const report = await converter.convertDirectory();
```

### Config Functions

```typescript
import { 
  loadConfig, 
  loadConfigFromEnv, 
  createDefaultConfig,
  validateConfig 
} from '@editory/prose-md';

// Load from file
const config = await loadConfig('./prose-md.config.json');

// Load from environment
const envConfig = loadConfigFromEnv();

// Create default config file
await createDefaultConfig('./config.json');

// Validate configuration
const validation = validateConfig(config);
```

### Validator Functions

```typescript
import { 
  validateProseContent, 
  validateJsonSource,
  sanitizeFileName 
} from '@editory/prose-md';

// Validate HTML against patterns
const result = validateProseContent(html, patterns);

// Validate JSON source structure
const validation = validateJsonSource(data);

// Sanitize filenames
const safe = sanitizeFileName('My File Name');
```

## Examples

### Example: Basic Usage

```typescript
import { ProseMarkdownConverter, DEFAULT_CONFIG } from '@editory/prose-md';

const converter = new ProseMarkdownConverter(DEFAULT_CONFIG);
const report = await converter.convertDirectory();

console.log(`Converted ${report.successfulConversions} files`);
```

### Example: Custom Config

```typescript
import { ProseMarkdownConverter } from '@editory/prose-md';

const config = {
  sourceDir: './api-responses',
  outputDir: './docs/converted',
  validation: {
    enabled: true,
    patterns: [
      {
        tag: 'div',
        attribute: 'class',
        pattern: 'prose'
      },
      {
        tag: 'div',
        attribute: 'data-type',
        pattern: 'article'
      }
    ],
    strict: false
  },
  conversion: {
    cleanHtml: true,
    includeMetadata: true
  },
  naming: {
    useTitle: true,
    sanitize: true
  }
};

const converter = new ProseMarkdownConverter(config);
await converter.convertDirectory();
```

### Example: CLI with Config File

```bash
# Create config
prose-md --init --config articles.config.json

# Edit config file...

# Run conversion
prose-md --config articles.config.json --verbose
```

## Integration with @editory/rich

This package uses converters from `@editory/rich`:

- **htmlToMarkdown** - Convert HTML to Markdown
- **prepareHtmlForMarkdown** - Prepare and clean HTML before conversion
- **sanitizeHtmlForMarkdown** - Remove TipTap-specific attributes

This ensures **consistency** between:
- Editory Rich editor conversions
- Document exports
- Format conversions
- Various converter tools

## Advanced Features

### Custom Validation Patterns

```json
{
  "validation": {
    "patterns": [
      {
        "tag": "article",
        "attribute": "data-content-type",
        "pattern": "prose-content"
      },
      {
        "tag": "div",
        "attribute": "id",
        "pattern": "^main-"
      }
    ]
  }
}
```

### Batch Processing with Metadata

Files automatically include conversion metadata:

```json
{
  "title": "...",
  "generatedAt": "2025-11-04T12:00:00Z",
  "...": "other metadata"
}
```

### Error Handling

```typescript
const report = await converter.convertDirectory();

report.results.forEach(result => {
  if (!result.success) {
    console.error(`Failed: ${result.title}`);
    console.error(`Reason: ${result.error}`);
  }
});
```

## Use Cases

- 📚 **Documentation Migration** - Convert API response HTML to Markdown docs
- 📰 **Blog Content** - Transform CMS content to static Markdown
- 📝 **Content Management** - Batch convert stored HTML to Markdown
- 🔄 **Data Pipeline** - Integrate prose-md into build systems
- 🌐 **Web Scraping** - Convert scraped HTML content to Markdown

## Contributing

Contributions are welcome! Please:

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

MIT - See LICENSE file for details

## Support

- 📖 [Documentation](https://github.com/buildy-ui/editory)
- 🐛 [Issues](https://github.com/buildy-ui/editory/issues)
- 💬 [Discussions](https://github.com/buildy-ui/editory/discussions)

---

Made with ❤️ by the Buildy UI team
