import { useState } from 'react';
import { useLogger } from '@/hooks/useLogger';
import { useSteps } from '@/hooks/useSteps';
import { useEvolutionApi } from './useEvolutionApi';
import { useConnectionStatus } from './useConnectionStatus';
import { ENV } from '@/config/env';
import type { FormState } from '../types';

const initialFormState: FormState = {
  secretCode: '',
  firstName: '',
  lastName: '',
  ddd: ENV.DEFAULT_DDD,
  phone: '9'
};

export function useEvolutionConnection() {
  const [formState, setFormState] = useState<FormState>(initialFormState);
  const [instanceName, setInstanceName] = useState<string | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const { step, setStep } = useSteps();
  const { logs, addLog } = useLogger();
  
  const { qrCode, handleSecretCode, handleSubmit } = useEvolutionApi({ 
    addLog, 
    setStep,
    onInstanceCreated: (name: string) => {
      setInstanceName(name);
      addLog('Iniciando monitoramento da conexão...', 'info');
    }
  });

  useConnectionStatus({
    instanceName,
    addLog,
    onConnected: () => {
      setIsConnected(true);
      setStep(4);
    }
  });

  const handlers = {
    onSecretCodeChange: (value: string) => {
      setFormState(prev => ({ ...prev, secretCode: value }));
    },
    onSecretCodeSubmit: () => {
      handleSecretCode(formState.secretCode);
    },
    onFormChange: (field: keyof FormState, value: string) => {
      setFormState(prev => ({ ...prev, [field]: value }));
    },
    onFormSubmit: () => {
      handleSubmit(formState);
    }
  };

  return {
    step,
    formState,
    handlers,
    logs,
    qrCode,
    isConnected,
    instanceName,
    addLog
  };
}