import { useState } from 'react';
import { ENV } from '@/config/env';
import type { LogEntry } from '@/types';
import type { FormState } from '../types';

interface UseEvolutionApiProps {
  addLog: (message: string, type?: LogEntry['type']) => void;
  setStep: (step: number) => void;
  onInstanceCreated: (name: string) => void;
}

export function useEvolutionApi({ addLog, setStep, onInstanceCreated }: UseEvolutionApiProps) {
  const [qrCode, setQrCode] = useState<string | null>(null);

  const handleSecretCode = (code: string) => {
    if (code === ENV.SECRET_CODE) {
      setStep(2);
      addLog('Código secreto verificado com sucesso', 'success');
    } else {
      addLog('Código secreto inválido', 'error');
    }
  };

  const handleSubmit = async (formState: FormState) => {
    if (!formState.firstName || !formState.lastName || !formState.phone || formState.phone.length !== 9) {
      addLog('Por favor, preencha todos os campos corretamente', 'error');
      return;
    }

    const instanceName = `${formState.firstName.toLowerCase()}-${formState.lastName.toLowerCase()}`
      .replace(/\s+/g, '')
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');

    const payload = {
      instanceName,
      qrcode: true,
      number: `55${formState.ddd}${formState.phone}`,
      integration: 'WHATSAPP-BAILEYS',
      webhook: {
        url: `https://n8n.hipno.se/${instanceName}`,
        byEvents: false,
        base64: true,
        headers: {
          autorization: 'Bearer TOKEN',
          'Content-Type': 'application/json'
        },
        events: [
          'APPLICATION_STARTUP',
          'QRCODE_UPDATED',
          'MESSAGES_SET',
          'MESSAGES_UPSERT',
          'MESSAGES_UPDATE',
          'MESSAGES_DELETE',
          'SEND_MESSAGE',
          'CONNECTION_UPDATE'
        ]
      }
    };

    addLog('Enviando solicitação de conexão...', 'info');

    try {
      const response = await fetch(`${ENV.API_URL}/instance/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'apikey': ENV.API_KEY
        },
        body: JSON.stringify(payload)
      });

      const data = await response.json();

      if (response.ok) {
        addLog(`Instância "${instanceName}" criada com sucesso`, 'success');
        addLog(`Status: ${data.instance.status}`, 'info');
        onInstanceCreated(instanceName);
        
        if (data.qrcode?.base64) {
          setQrCode(data.qrcode.base64);
          addLog('QR Code recebido com sucesso', 'success');
          setStep(3);
        } else {
          addLog('Resposta recebida sem QR Code', 'error');
        }
      } else {
        addLog(`Erro na API: ${data.error || 'Erro desconhecido'}`, 'error');
      }
    } catch (error) {
      addLog(`Erro de conexão: ${error}`, 'error');
    }
  };

  return {
    qrCode,
    handleSecretCode,
    handleSubmit
  };
}