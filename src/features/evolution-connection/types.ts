export interface FormState {
  secretCode: string;
  firstName: string;
  lastName: string;
  ddd: string;
  phone: string;
}

export interface FormHandlers {
  onSecretCodeChange: (value: string) => void;
  onSecretCodeSubmit: () => void;
  onFormChange: (field: keyof FormState, value: string) => void;
  onFormSubmit: () => void;
}