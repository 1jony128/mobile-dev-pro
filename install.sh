#!/bin/bash

echo "📦 Installing dependencies..."
npm install

echo "🔨 Building project..."
npm run build

echo "✅ Installation complete!"
echo "🚀 Run 'npm start' to start the server"
