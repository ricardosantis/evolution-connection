import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { dddList } from '@/constants/ddd-list';

interface UserDetailsStepProps {
  firstName: string;
  lastName: string;
  ddd: string;
  phone: string;
  onFirstNameChange: (value: string) => void;
  onLastNameChange: (value: string) => void;
  onDddChange: (value: string) => void;
  onPhoneChange: (value: string) => void;
  onSubmit: () => void;
}

export function UserDetailsStep({
  firstName,
  lastName,
  ddd,
  phone,
  onFirstNameChange,
  onLastNameChange,
  onDddChange,
  onPhoneChange,
  onSubmit
}: UserDetailsStepProps) {
  return (
    <div className="space-y-4 w-full">
      <Input
        placeholder="Nome"
        value={firstName}
        onChange={(e) => onFirstNameChange(e.target.value)}
        className="bg-white/5 border-white/10 text-white placeholder:text-gray-500"
      />
      <Input
        placeholder="Sobrenome"
        value={lastName}
        onChange={(e) => onLastNameChange(e.target.value)}
        className="bg-white/5 border-white/10 text-white placeholder:text-gray-500"
      />
      <div className="flex gap-4">
        <div className="w-32">
          <Select value={ddd} onValueChange={onDddChange}>
            <SelectTrigger className="bg-white/5 border-white/10 text-white">
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
        <Input
          placeholder="Número do WhatsApp"
          value={phone}
          onChange={(e) => {
            const value = e.target.value.replace(/\D/g, '');
            if (value.length <= 8) onPhoneChange(value);
          }}
          className="flex-1 bg-white/5 border-white/10 text-white placeholder:text-gray-500"
          maxLength={8}
        />
      </div>
      <Button
        onClick={onSubmit}
        className="w-full bg-blue-500/80 hover:bg-blue-500 text-white border-0 transition-colors"
      >
        Conectar WhatsApp
      </Button>
    </div>
  );
}