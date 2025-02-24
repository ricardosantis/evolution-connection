import { Shield, User, QrCode } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StepIndicatorProps {
  currentStep: number;
}

export function StepIndicator({ currentStep }: StepIndicatorProps) {
  return (
    <div className="flex justify-center gap-6 mb-8">
      <div className={cn(
        "flex items-center transition-colors",
        currentStep >= 1 ? "text-blue-400" : "text-gray-600"
      )}>
        <Shield className="w-5 h-5" />
        <span className="ml-2 text-sm">Verificação</span>
      </div>
      <div className="text-gray-600">→</div>
      <div className={cn(
        "flex items-center transition-colors",
        currentStep >= 2 ? "text-blue-400" : "text-gray-600"
      )}>
        <User className="w-5 h-5" />
        <span className="ml-2 text-sm">Dados</span>
      </div>
      <div className="text-gray-600">→</div>
      <div className={cn(
        "flex items-center transition-colors",
        currentStep >= 3 ? "text-blue-400" : "text-gray-600"
      )}>
        <QrCode className="w-5 h-5" />
        <span className="ml-2 text-sm">Conexão</span>
      </div>
    </div>
  );
}