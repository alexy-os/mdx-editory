#!/usr/bin/env node

import { runCli } from './dist/prose-md.mjs';

runCli(process.argv.slice(2)).catch((error) => {
  console.error('Fatal error:', error);
  process.exit(1);
});
