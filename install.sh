#!/usr/bin/env bash
# Amanah Blueprint — One-line installer
#
# Copies .amanah/ to current directory and bootstraps slash commands.

set -euo pipefail

# Colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m'

print() { echo -e "${GREEN}[amanah]${NC} $1"; }
info() { echo -e "${BLUE}[amanah]${NC} $1"; }
warn() { echo -e "${YELLOW}[amanah]${NC} $1"; }

# Determine install method
SCRIPT_DIR=""
REPO_URL="https://github.com/NHadi/AmanahAgent.Blueprint.Skills.git"
TMP_DIR="/tmp/amanah-blueprint-$$"

# Check if .amanah/ already exists in current directory
if [ -d ".amanah" ]; then
    warn ".amanah/ already exists in this directory."
    read -p "Overwrite? (y/N) " -n 1 -r
    echo
    [[ ! $REPLY =~ ^[Yy]$ ]] && exit 0
    rm -rf .amanah
fi

print "Downloading Amanah Blueprint..."

# Method 1: git clone (preferred)
if command -v git &>/dev/null; then
    git clone "$REPO_URL" "$TMP_DIR" 2>/dev/null
    (cd "$TMP_DIR" && git checkout 14305c7bebd257c9c7c9b7aff6c57d1cd74eed90)
    cp -r "$TMP_DIR/.amanah" .
    rm -rf "$TMP_DIR"

# Method 2: curl + tar (fallback)
elif command -v curl &>/dev/null; then
    curl -sSL "https://github.com/NHadi/AmanahAgent.Blueprint.Skills/archive/14305c7bebd257c9c7c9b7aff6c57d1cd74eed90.tar.gz" -o "$TMP_DIR.tar.gz"
    mkdir -p "$TMP_DIR"
    tar -xzf "$TMP_DIR.tar.gz" -C "$TMP_DIR" --strip-components=1 2>/dev/null
    cp -r "$TMP_DIR/.amanah" .
    rm -rf "$TMP_DIR" "$TMP_DIR.tar.gz"

else
    echo "Error: git or curl is required."
    exit 1
fi

print "Framework copied to .amanah/"

# Bootstrap slash commands so /setup is available
info "Bootstrapping slash commands..."
mkdir -p .claude/commands
cp .amanah/commands/*.md .claude/commands/

print "Slash commands installed to .claude/commands/"

echo ""
info "========================================="
info "  Setup complete!"
info "========================================="
echo ""
echo "  Next steps:"
echo "  1. Open your agent (Claude Code or Gemini CLI)"
echo "  2. Type:  /setup"
echo ""
echo "  /setup will:"
echo "    - Generate atlas (5 project context maps)"
echo "    - Install skills + agents"
echo "    - Update project instructions (CLAUDE.md / GEMINI.md)"
echo ""
echo "  Available commands:"
echo "    /setup              One-time project initialization"
echo "    /blueprint <name>   Generate feature blueprint (what/how/now)"
echo "    /fix <name>         Generate bug fix plan (fix.md)"
echo "    /build <name>       Autonomous implementation (Task & Mark)"
echo "    /spec <name>        Read progress of existing blueprint"
echo "    /review <file>      Review code against conventions"
echo "    /test <feature>     Scaffold Vitest tests from spec"
echo "    /audit <file>       Run 29 Quality Gates audit"
echo "    /bridge <path>      Sync external API/Backend context"
echo "    /history <topic>    Search past blueprints for patterns"
echo "    /atlas              Regenerate project context maps"
echo ""
