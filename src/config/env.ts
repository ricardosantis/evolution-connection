const getEnvVar = (key: string): string => {
  const value = import.meta.env[key];
  if (value === undefined) {
    throw new Error(`Variável de ambiente ${key} não está definida`);
  }
  return value;
};

export const ENV = {
  API_KEY: getEnvVar('API_KEY'),
  API_URL: getEnvVar('API_URL'),
  SECRET_CODE: getEnvVar('SECRET_CODE'),
  DEFAULT_DDD: getEnvVar('DEFAULT_DDD')
} as const;

// Tipos para as variáveis de ambiente
declare global {
  interface ImportMetaEnv {
    API_KEY: string;
    API_URL: string;
    SECRET_CODE: string;
    DEFAULT_DDD: string;
  }
}