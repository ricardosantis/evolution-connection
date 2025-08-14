import { MessageSquare } from 'lucide-react';
import { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';
import type { LogEntry } from '@/types';

interface ConnectionLogProps {
  logs: LogEntry[];
}

export function ConnectionLog({ logs }: ConnectionLogProps) {
  const logContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (logContainerRef.current) {
      logContainerRef.current.scrollTop = logContainerRef.current.scrollHeight;
    }
  }, [logs]);

  return (
    <div className="h-full flex flex-col">
      <h3 className="text-lg font-semibold mb-4 flex items-center gap-2 text-gray-200">
        <MessageSquare className="w-5 h-5" />
        Log de Conexão
      </h3>
      <div 
        ref={logContainerRef}
        className="flex-1 bg-black backdrop-blur-sm rounded-lg p-4 overflow-y-auto font-mono text-sm border border-white/10 min-h-[300px] max-h-[calc(100vh-200px)]"
      >
        {logs.map((log, index) => (
          <div
            key={`${index}-${log.timestamp.getTime()}`}
            className={cn(
              "text-sm mb-1 transition-opacity duration-200",
              log.type === 'success' && "text-emerald-400",
              log.type === 'error' && "text-rose-400",
              log.type === 'info' && "text-sky-400"
            )}
          >
            [{log.timestamp.toLocaleTimeString()}] {log.message}
          </div>
        ))}
      </div>
    </div>
  );
}