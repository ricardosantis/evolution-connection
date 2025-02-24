import { NumericKeypad } from './NumericKeypad';

interface SecretCodeStepProps {
  secretCode: string;
  onSecretCodeChange: (value: string) => void;
  onSubmit: () => void;
}

export function SecretCodeStep({ secretCode, onSecretCodeChange, onSubmit }: SecretCodeStepProps) {
  return (
    <div className="w-full max-w-md mx-auto">
      <NumericKeypad
        value={secretCode}
        onChange={onSecretCodeChange}
        onSubmit={onSubmit}
      />
    </div>
  );
}