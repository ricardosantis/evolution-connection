import { Button } from '@/components/ui/button';
import { Bug } from 'lucide-react';
import { ENV } from '@/config/env';

interface DebugButtonProps {
  instanceName: string | null;
  addLog: (message: string, type: 'info' | 'success' | 'error') => void;
}

export function DebugButton({ instanceName, addLog }: DebugButtonProps) {
  const checkConnection = async () => {
    if (!instanceName) {
      addLog('❌ Nenhuma instância disponível para debug', 'error');
      return;
    }

    addLog('🔍 Iniciando debug da conexão...', 'info');
    
    try {
      const response = await fetch(
        `${ENV.API_URL}/instance/connectionState/${instanceName}`,
        {
          headers: {
            'Content-Type': 'application/json',
            'apikey': ENV.API_KEY
          }
        }
      );

      const data = await response.json();
      
      addLog('📡 Debug - Request URL:', 'info');
      addLog(`${ENV.API_URL}/instance/connectionState/${instanceName}`, 'info');
      
      addLog('🔑 Debug - Headers:', 'info');
      addLog(`apikey: ${ENV.API_KEY}`, 'info');
      
      addLog('📥 Debug - Response:', 'info');
      addLog(JSON.stringify(data, null, 2), 'info');
      
      if (response.ok) {
        addLog(`✅ Status da conexão: ${data.instance.state}`, 'success');
      } else {
        addLog(`❌ Erro na requisição: ${response.status}`, 'error');
      }
    } catch (error) {
      addLog(`❌ Erro ao verificar conexão: ${error}`, 'error');
    }
  };

  return (
    <Button
      onClick={checkConnection}
      variant="outline"
      size="sm"
      className="w-full mt-2 bg-gray-800 border-gray-700 hover:bg-gray-700 text-gray-300"
    >
      <Bug className="w-4 h-4 mr-2" />
      Debug Conexão
    </Button>
  );
}