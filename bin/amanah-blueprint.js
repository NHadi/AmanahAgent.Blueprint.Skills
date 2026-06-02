#!/usr/bin/env node

/**
 * Amanah Blueprint CLI
 *
 * Usage:
 *   npx amanah-blueprint          Copy .amanah/ + bootstrap commands
 *   npx amanah-blueprint setup    Same as above (alias)
 *   npx amanah-blueprint help     Show help
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const COMMANDS = ['setup', 'help', 'init'];
const args = process.argv.slice(2);
const command = args[0] || 'setup';

const GREEN = '\x1b[32m';
const BLUE = '\x1b[34m';
const YELLOW = '\x1b[33m';
const NC = '\x1b[0m';

function log(msg) { console.log(`${GREEN}[amanah]${NC} ${msg}`); }
function info(msg) { console.log(`${BLUE}[amanah]${NC} ${msg}`); }
function warn(msg) { console.log(`${YELLOW}[amanah]${NC} ${msg}`); }

function showHelp() {
  console.log(`
Amanah Blueprint v5.1.0

Usage:
  npx amanah-blueprint          Install .amanah/ and bootstrap slash commands
  npx amanah-blueprint setup    Same as above (alias)
  npx amanah-blueprint help     Show this help

After install, open Claude Code and type:
  /setup                        Generate atlas + install skills + update CLAUDE.md

Slash Commands:
  /blueprint <name>             Generate full feature blueprint
  /fix <name>                   Generate bug fix plan
  /spec <name>                  Read existing blueprint
  /atlas                        Regenerate atlas from codebase

Documentation: https://github.com/nurulhadi/amanah-blueprint
`);
}

function copyDir(src, dest) {
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }
  const entries = fs.readdirSync(src, { withFileTypes: true });
  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    if (entry.isDirectory()) {
      copyDir(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

function install() {
  const cwd = process.cwd();
  const sourceDir = path.join(__dirname, '..', '.amanah');

  // Check if .amanah/ already exists
  const targetDir = path.join(cwd, '.amanah');
  if (fs.existsSync(targetDir)) {
    warn('.amanah/ already exists in this directory.');
    const readline = require('readline').createInterface({
      input: process.stdin,
      output: process.stdout,
    });
    readline.question('Overwrite? (y/N) ', (answer) => {
      readline.close();
      if (answer.toLowerCase() === 'y') {
        fs.rmSync(targetDir, { recursive: true, force: true });
        doInstall(sourceDir, cwd);
      } else {
        console.log('Cancelled.');
        process.exit(0);
      }
    });
  } else {
    doInstall(sourceDir, cwd);
  }
}

function doInstall(sourceDir, cwd) {
  // Copy .amanah/
  log('Copying .amanah/ to project...');
  copyDir(sourceDir, path.join(cwd, '.amanah'));

  // Bootstrap slash commands
  info('Bootstrapping slash commands...');
  const commandsDir = path.join(cwd, '.claude', 'commands');
  if (!fs.existsSync(commandsDir)) {
    fs.mkdirSync(commandsDir, { recursive: true });
  }
  const sourceCommands = path.join(cwd, '.amanah', 'commands');
  if (fs.existsSync(sourceCommands)) {
    const files = fs.readdirSync(sourceCommands);
    files.forEach(f => {
      if (f.endsWith('.md')) {
        fs.copyFileSync(path.join(sourceCommands, f), path.join(commandsDir, f));
      }
    });
    log(`Installed ${files.length} slash commands to .claude/commands/`);
  }

  // Done
  console.log('');
  info('=========================================');
  info('  Install complete!');
  info('=========================================');
  console.log('');
  console.log('  Next steps:');
  console.log('  1. Open Claude Code in this project');
  console.log('  2. Type:  /setup');
  console.log('');
  console.log('  /setup will generate atlas, install skills, and update CLAUDE.md');
  console.log('');
}

// Main
if (command === 'help' || command === '--help' || command === '-h') {
  showHelp();
} else if (command === 'setup' || command === 'init') {
  install();
} else {
  console.log(`Unknown command: ${command}`);
  showHelp();
  process.exit(1);
}
