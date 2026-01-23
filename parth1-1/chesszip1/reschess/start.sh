#!/bin/bash

# 🚀 Indian Chess Academy - Quick Start Script

echo "╔══════════════════════════════════════════════════════════╗"
echo "║   Indian Chess Academy - Development Quick Start        ║"
echo "╚══════════════════════════════════════════════════════════╝"
echo ""

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
    echo ""
fi

# Check if .env.local exists
if [ ! -f ".env.local" ]; then
    echo "⚠️  Warning: .env.local not found!"
    echo "📝 Creating .env.local from template..."
    cp .env.example .env.local
    echo "✅ Created .env.local - Please update with your values"
    echo ""
fi

echo "🔧 Starting development server..."
echo "📍 Local: http://localhost:3000"
echo "📍 Network: Check terminal output below"
echo ""
echo "Press Ctrl+C to stop the server"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

npm run dev
