import path from 'path';
import react from '@vitejs/plugin-react';
import { defineConfig, loadEnv } from 'vite';

export default defineConfig(({ mode }) => {
  // Carrega as variáveis de ambiente baseado no modo (development/production)
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [react()],
    server: {
      host: '0.0.0.0',
      port: 12000,
      strictPort: true,
      cors: true,
      allowedHosts: ['work-1-jugatdbepogoeehb.prod-runtime.all-hands.dev', 'localhost'],
      headers: {
        'X-Frame-Options': 'ALLOWALL',
      },
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    optimizeDeps: {
      exclude: ['lucide-react'],
    },
    // Define as variáveis de ambiente que queremos expor
    define: {
      'import.meta.env.API_KEY': JSON.stringify(env.API_KEY),
      'import.meta.env.API_URL': JSON.stringify(env.API_URL),
      'import.meta.env.SECRET_CODE': JSON.stringify(env.SECRET_CODE),
      'import.meta.env.DEFAULT_DDD': JSON.stringify(env.DEFAULT_DDD),
    },
  };
});
