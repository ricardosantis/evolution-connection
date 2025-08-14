const getEnvVar = (key: string): string => {
  const value = import.meta.env[key];
  if (value === undefined) {
    throw new Error(`Variável de ambiente ${key} não está definida`);
  }
  return value;
};

export const ENV = {
  API_KEY: getEnvVar('VITE_API_KEY'),
  API_URL: getEnvVar('VITE_API_URL'),
  SECRET_CODE: getEnvVar('VITE_SECRET_CODE'),
  DEFAULT_DDD: getEnvVar('VITE_DEFAULT_DDD')
} as const;

// Tipos para as variáveis de ambiente
declare global {
  interface ImportMetaEnv {
    VITE_API_KEY: string;
    VITE_API_URL: string;
    VITE_SECRET_CODE: string;
    VITE_DEFAULT_DDD: string;
  }
}