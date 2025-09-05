#!/bin/bash

echo "🚀 Preparando deploy para Hostinger..."

# 1. Instalar dependências
echo "📦 Instalando dependências..."
npm install

# 2. Criar arquivo .env.production se não existir
if [ ! -f .env.production ]; then
    echo "📝 Criando arquivo .env.production..."
    cat > .env.production << EOF
VITE_API_KEY=your_api_key_here
VITE_API_URL=https://your-api-url.com
VITE_SECRET_CODE=your_secret_code
VITE_DEFAULT_DDD=11
EOF
    echo "⚠️  IMPORTANTE: Edite o arquivo .env.production com suas variáveis reais!"
fi

# 3. Gerar build de produção
echo "🔨 Gerando build de produção..."
npm run build

# 4. Criar arquivo .htaccess para SPA
echo "📄 Criando arquivo .htaccess..."
cat > dist/.htaccess << 'EOF'
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>

# Cache para arquivos estáticos
<IfModule mod_expires.c>
  ExpiresActive on
  ExpiresByType text/css "access plus 1 year"
  ExpiresByType application/javascript "access plus 1 year"
  ExpiresByType image/png "access plus 1 year"
  ExpiresByType image/jpg "access plus 1 year"
  ExpiresByType image/jpeg "access plus 1 year"
  ExpiresByType image/gif "access plus 1 year"
  ExpiresByType image/svg+xml "access plus 1 year"
</IfModule>
EOF

# 5. Criar arquivo ZIP para upload
echo "📦 Criando arquivo ZIP para upload..."
cd dist
zip -r ../hostinger-deploy.zip .
cd ..

echo "✅ Deploy preparado com sucesso!"
echo ""
echo "📋 Próximos passos:"
echo "1. Edite o arquivo .env.production com suas variáveis reais"
echo "2. Execute novamente 'npm run build' após editar as variáveis"
echo "3. Faça upload dos arquivos da pasta 'dist/' para public_html/ na Hostinger"
echo "4. Ou use o arquivo 'hostinger-deploy.zip' criado para upload via cPanel"
echo ""
echo "🌐 Arquivos prontos na pasta: dist/"