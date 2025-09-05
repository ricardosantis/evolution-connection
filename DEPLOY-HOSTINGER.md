# 🚀 Guia de Deploy para Hostinger

## Método 1: Deploy Estático (Recomendado)

### Pré-requisitos
- Conta na Hostinger com hospedagem web
- Acesso ao cPanel
- Node.js instalado localmente (para gerar o build)

### Passo a Passo

#### 1. Preparar o Projeto Localmente

```bash
# Clone o repositório (se ainda não tiver)
git clone https://github.com/ricardosantis/evolution-connection.git
cd evolution-connection

# Instalar dependências
npm install
```

#### 2. Configurar Variáveis de Ambiente

Crie um arquivo `.env.production` na raiz do projeto:

```env
VITE_API_KEY=sua_api_key_aqui
VITE_API_URL=https://sua-api.com
VITE_SECRET_CODE=seu_codigo_secreto
VITE_DEFAULT_DDD=11
```

#### 3. Gerar Build de Produção

```bash
npm run build
```

Isso criará uma pasta `dist/` com todos os arquivos otimizados.

#### 4. Upload para Hostinger

**Opção A - Via cPanel File Manager:**
1. Acesse o cPanel da Hostinger
2. Clique em "File Manager"
3. Navegue até `public_html/` (ou subpasta do seu domínio)
4. Faça upload de TODOS os arquivos da pasta `dist/`
5. Extraia se necessário

**Opção B - Via FTP:**
1. Use um cliente FTP (FileZilla, WinSCP)
2. Conecte com as credenciais FTP da Hostinger
3. Navegue até `public_html/`
4. Faça upload de todos os arquivos da pasta `dist/`

#### 5. Configurar .htaccess (Importante!)

Crie um arquivo `.htaccess` na raiz do seu site (`public_html/`) com o conteúdo:

```apache
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
```

## Método 2: Deploy Automatizado (Script)

Execute o script de deploy incluído:

```bash
./deploy.sh
```

Este script irá:
- Instalar dependências
- Criar arquivo .env.production (se não existir)
- Gerar build de produção
- Criar .htaccess automaticamente
- Criar um ZIP para upload fácil

## Estrutura de Arquivos na Hostinger

Após o upload, sua estrutura deve ficar assim:

```
public_html/
├── .htaccess
├── index.html
├── assets/
│   ├── index-[hash].css
│   └── index-[hash].js
└── vite.svg
```

## Configurações Específicas da Hostinger

### 1. Domínio Principal
- Faça upload para `public_html/`
- Acesse via `https://seudominio.com`

### 2. Subdomínio
- Crie subdomínio no cPanel
- Faça upload para `public_html/subdominio/`
- Acesse via `https://subdominio.seudominio.com`

### 3. Pasta Específica
- Crie pasta em `public_html/meuapp/`
- Faça upload dos arquivos para essa pasta
- Acesse via `https://seudominio.com/meuapp`

## Troubleshooting

### Problema: Página em branco
**Solução:** Verifique se o arquivo `.htaccess` foi criado corretamente.

### Problema: Erro 404 em rotas
**Solução:** Confirme que o `.htaccess` está na raiz e com as regras de rewrite corretas.

### Problema: Variáveis de ambiente não funcionam
**Solução:** 
1. Verifique se o arquivo `.env.production` existe
2. Execute `npm run build` novamente após criar/editar o arquivo
3. Faça novo upload dos arquivos

### Problema: Arquivos CSS/JS não carregam
**Solução:** Verifique se todos os arquivos da pasta `assets/` foram enviados.

## Atualizações Futuras

Para atualizar o site:

1. Faça as alterações no código
2. Execute `npm run build`
3. Faça upload apenas dos arquivos alterados
4. Limpe o cache do navegador

## Monitoramento

- Use o Google Analytics para monitorar tráfego
- Configure o Google Search Console
- Monitore erros via console do navegador

## Backup

Sempre mantenha backup dos arquivos:
- Código fonte no GitHub
- Build de produção localmente
- Backup dos arquivos no servidor via cPanel