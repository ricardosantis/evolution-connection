import { ENV } from '@/config/env';

interface ApiOptions {
  method?: string;
  body?: any;
}

export async function api<T>(endpoint: string, options: ApiOptions = {}): Promise<T> {
  const response = await fetch(`${ENV.API_URL}${endpoint}`, {
    method: options.method || 'GET',
    headers: {
      'Content-Type': 'application/json',
      'apikey': ENV.API_KEY
    },
    body: options.body ? JSON.stringify(options.body) : undefined
  });

  if (!response.ok) {
    throw new Error(`API Error: ${response.status}`);
  }

  return response.json();
}