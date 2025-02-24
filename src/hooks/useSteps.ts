import { useState } from 'react';

export function useSteps() {
  const [step, setStep] = useState(1);
  return { step, setStep };
}