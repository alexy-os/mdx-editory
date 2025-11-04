#!/usr/bin/env node

import { runCli } from '../src/cli';

runCli().catch(error => {
  console.error('Fatal error:', error);
  process.exit(1);
});
