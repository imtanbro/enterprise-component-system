export interface FormData {
  // Personal Information
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  
  // Professional Details
  occupation: string;
  yearsOfExperience: number;
  skills: string[];
  
  // Address Information
  street: string;
  city: string;
  state: string;
  zipCode: string;
  
  // Preferences
  communicationPreference: 'email' | 'phone' | 'both';
  newsletter: boolean;
  termsAccepted: boolean;
}

export type FormStep = 'personal' | 'professional' | 'address' | 'preferences' | 'review';

export interface FormErrors {
  [key: string]: string;
}

export interface StepConfig {
  title: string;
  description: string;
  fields: (keyof FormData)[];
  validationRules: {
    [key: string]: (value: any) => string | null;
  };
}