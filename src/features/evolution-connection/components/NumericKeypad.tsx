import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Key, Delete } from 'lucide-react';
import { cn } from '@/lib/utils';

interface NumericKeypadProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
}

export function NumericKeypad({ value, onChange, onSubmit }: NumericKeypadProps) {
  const [focused, setFocused] = useState(false);

  const handleKeyPress = (digit: string) => {
    if (value.length < 4) {
      onChange(value + digit);
    }
  };

  const handleBackspace = () => {
    onChange(value.slice(0, -1));
  };

  const handleClear = () => {
    onChange('');
  };

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold flex items-center gap-2 text-gray-200">
        <Key className="w-5 h-5" />
        Digite o Código Secreto
      </h3>

      {/* Display do código */}
      <div className="relative">
        <div className="flex justify-center gap-3 mb-6">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className={cn(
                "w-12 h-12 rounded-lg border-2 flex items-center justify-center text-xl font-bold transition-all",
                focused ? "border-blue-400" : "border-white/10",
                value[i] ? "bg-white/10" : "bg-black"
              )}
            >
              {value[i] ? '•' : ''}
            </div>
          ))}
        </div>

        {/* Input oculto para permitir digitação via teclado */}
        <input
          type="password"
          value={value}
          onChange={(e) => {
            const newValue = e.target.value.replace(/\D/g, '').slice(0, 4);
            onChange(newValue);
          }}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className="absolute inset-0 opacity-0 cursor-default"
          maxLength={4}
        />
      </div>

      {/* Teclado numérico */}
      <div className="grid grid-cols-3 gap-3">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
          <Button
            key={num}
            onClick={() => handleKeyPress(num.toString())}
            className="h-14 text-xl font-semibold bg-white/5 hover:bg-white/10 border-white/10"
          >
            {num}
          </Button>
        ))}
        <Button
          onClick={handleClear}
          className="h-14 font-medium bg-white/5 hover:bg-white/10 border-white/10 text-yellow-500"
        >
          Limpar
        </Button>
        <Button
          onClick={() => handleKeyPress('0')}
          className="h-14 text-xl font-semibold bg-white/5 hover:bg-white/10 border-white/10"
        >
          0
        </Button>
        <Button
          onClick={handleBackspace}
          className="h-14 bg-white/5 hover:bg-white/10 border-white/10 text-rose-500"
        >
          <Delete className="w-5 h-5" />
        </Button>
      </div>

      <Button
        onClick={onSubmit}
        disabled={value.length !== 4}
        className="w-full h-12 mt-4 bg-blue-500/80 hover:bg-blue-500 text-white border-0 transition-colors disabled:opacity-50"
      >
        Verificar Código
      </Button>
    </div>
  );
}