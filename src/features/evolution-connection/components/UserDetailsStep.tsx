import { User } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { dddList } from '@/constants/ddd-list';
import type { FormState } from '../types';

interface UserDetailsStepProps {
  values: FormState;
  onChange: (field: keyof FormState, value: string) => void;
  onSubmit: () => void;
}

export function UserDetailsStep({ values, onChange, onSubmit }: UserDetailsStepProps) {
  return (
    <div className="space-y-4 w-full">
      <h3 className="text-lg font-semibold mb-4 flex items-center gap-2 text-gray-200">
        <User className="w-5 h-5" />
        Dados da Conexão
      </h3>
      <Input
        placeholder="Nome"
        value={values.firstName}
        onChange={(e) => onChange('firstName', e.target.value)}
        className="bg-black border-white/10 text-white placeholder:text-gray-500"
      />
      <Input
        placeholder="Sobrenome"
        value={values.lastName}
        onChange={(e) => onChange('lastName', e.target.value)}
        className="bg-black border-white/10 text-white placeholder:text-gray-500"
      />
      <div className="flex gap-4">
        <div className="w-32">
          <Select value={values.ddd} onValueChange={(value) => onChange('ddd', value)}>
            <SelectTrigger className="bg-black border-white/10 text-white">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-gray-900 border-white/10">
              {dddList.map((code) => (
                <SelectItem key={code} value={code} className="text-white hover:bg-white/5">
                  ({code})
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex-1 relative">
          <Input
            placeholder="Número do WhatsApp"
            value={values.phone.substring(1)} // Remove the first '9'
            onChange={(e) => {
              const value = e.target.value.replace(/\D/g, '');
              if (value.length <= 8) onChange('phone', '9' + value);
            }}
            className="pl-8 bg-black border-white/10 text-white placeholder:text-gray-500"
            maxLength={8}
          />
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">9</span>
        </div>
      </div>
      <Button
        onClick={onSubmit}
        disabled={!values.firstName || !values.lastName || values.phone.length !== 9}
        className="w-full bg-blue-500/80 hover:bg-blue-500 text-white border-0 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Conectar WhatsApp
      </Button>
    </div>
  );
}