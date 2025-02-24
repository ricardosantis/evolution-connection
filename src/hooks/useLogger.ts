import { useState } from 'react';
import type { LogEntry } from '@/types';

export function useLogger() {
  const [logs, setLogs] = useState<LogEntry[]>([]);

  const addLog = (message: string, type: LogEntry['type'] = 'info', replace = false) => {
    setLogs(prev => {
      if (replace && prev.length > 0) {
        return [...prev.slice(0, -1), { timestamp: new Date(), message, type }];
      }
      return [...prev, { timestamp: new Date(), message, type }];
    });
  };

  return { logs, addLog };
}