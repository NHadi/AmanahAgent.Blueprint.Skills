#!/usr/bin/env node

/**
 * Postinstall — just prints a friendly message.
 * Does NOT auto-copy files (that would be surprising).
 * User runs `npx amanah-blueprint` explicitly to install.
 */

const BLUE = '\x1b[34m';
const NC = '\x1b[0m';

console.log('');
console.log(`${BLUE}[amanah]${NC} Amanah Blueprint installed.`);
console.log(`${BLUE}[amanah]${NC} Run \`npx amanah-blueprint\` in your project to set it up.`);
console.log('');
