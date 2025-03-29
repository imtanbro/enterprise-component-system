import { StepConfig } from '../types/form';
import { validateEmail, validatePhone, validateRequired, validateZipCode } from '../utils/validation';

export const formSteps: Record<string, StepConfig> = {
  personal: {
    title: 'Personal Information',
    description: 'Please provide your basic contact information.',
    fields: ['firstName', 'lastName', 'email', 'phone'],
    validationRules: {
      firstName: (value) => validateRequired(value, 'First name'),
      lastName: (value) => validateRequired(value, 'Last name'),
      email: validateEmail,
      phone: validatePhone,
    },
  },
  professional: {
    title: 'Professional Details',
    description: 'Tell us about your professional background.',
    fields: ['occupation', 'yearsOfExperience', 'skills'],
    validationRules: {
      occupation: (value) => validateRequired(value, 'Occupation'),
      yearsOfExperience: (value) => value < 0 ? 'Years of experience cannot be negative' : null,
      skills: (value) => validateRequired(value, 'Skills'),
    },
  },
  address: {
    title: 'Address Information',
    description: 'Where can we reach you?',
    fields: ['street', 'city', 'state', 'zipCode'],
    validationRules: {
      street: (value) => validateRequired(value, 'Street address'),
      city: (value) => validateRequired(value, 'City'),
      state: (value) => validateRequired(value, 'State'),
      zipCode: validateZipCode,
    },
  },
  preferences: {
    title: 'Communication Preferences',
    description: 'Help us understand how you like to be contacted.',
    fields: ['communicationPreference', 'newsletter', 'termsAccepted'],
    validationRules: {
      communicationPreference: (value) => validateRequired(value, 'Communication preference'),
      termsAccepted: (value) => !value ? 'You must accept the terms and conditions' : null,
      }
  },
};