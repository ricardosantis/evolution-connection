import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface SecretCodeStepProps {
  secretCode: string;
  onSecretCodeChange: (value: string) => void;
  onSubmit: () => void;
}

export function SecretCodeStep({ secretCode, onSecretCodeChange, onSubmit }: SecretCodeStepProps) {
  return (
    <div className="space-y-4">
      <div className="w-full">
        <Input
          type="password"
          placeholder="Digite o Código Secreto"
          value={secretCode}
          onChange={(e) => onSecretCodeChange(e.target.value)}
          className="text-center bg-white/5 border-white/10 text-white placeholder:text-gray-500"
        />
        <Button
          onClick={onSubmit}
          className="w-full mt-4 bg-blue-500/80 hover:bg-blue-500 text-white border-0 transition-colors"
        >
          Verificar Código
        </Button>
      </div>
    </div>
  );
}