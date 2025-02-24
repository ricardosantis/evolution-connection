import { useState, useEffect, useRef } from 'react';
import type { LogEntry } from '@/types';
import { ENV } from '@/config/env';

interface ConnectionState {
  instance: {
    instanceName: string;
    state: string;
  };
}

interface UseConnectionStatusProps {
  instanceName: string | null;
  addLog: (message: string, type: LogEntry['type'], replace?: boolean) => void;
  onConnected: () => void;
}

export function useConnectionStatus({ instanceName, addLog, onConnected }: UseConnectionStatusProps) {
  const [isConnected, setIsConnected] = useState(false);
  const dotsRef = useRef(0);
  const intervalRef = useRef<number>();
  const lastStateRef = useRef<string>('');

  useEffect(() => {
    if (!instanceName) return;

    const checkStatus = async () => {
      try {
        const response = await fetch(`${ENV.API_URL}/instance/connectionState/${instanceName}`);
        const data: ConnectionState = await response.json();

        dotsRef.current = (dotsRef.current + 1) % 4;
        const dots = '.'.repeat(dotsRef.current || 1);

        if (data.instance.state === 'open') {
          if (lastStateRef.current !== 'open') {
            setIsConnected(true);
            addLog('✅ WhatsApp conectado com sucesso!', 'success');
            onConnected();
            clearInterval(intervalRef.current);
          }
        } else {
          const statusMessage = `⏳ Verificando conexão: ${data.instance.state}${dots}`;
          addLog(statusMessage, 'info', true);
        }

        lastStateRef.current = data.instance.state;
      } catch (error) {
        console.error('Error checking connection status:', error);
        const dots = '.'.repeat(dotsRef.current || 1);
        const errorMessage = `❌ Erro ao verificar status da conexão${dots}`;
        addLog(errorMessage, 'error', true);
      }
    };

    // Initial check
    checkStatus();

    // Set up polling interval (every 3 seconds)
    intervalRef.current = window.setInterval(checkStatus, 3000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [instanceName, addLog, onConnected]);

  return { isConnected };
}