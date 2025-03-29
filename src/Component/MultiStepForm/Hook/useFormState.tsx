import { useState, useEffect } from "react";
import { FormData, FormErrors, FormStep } from "../types/form";
import { formSteps } from "../config/formConfig";

const STORAGE_KEY = "multiStepFormData";

const initialFormData: FormData = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  occupation: "",
  yearsOfExperience: 0,
  skills: [],
  street: "",
  city: "",
  state: "",
  zipCode: "",
  communicationPreference: "email",
  newsletter: false,
  termsAccepted: false,
};

export const useFormState = () => {
  const [formData, setFormData] = useState<FormData>(() => {
    const savedData = localStorage.getItem(STORAGE_KEY);
    return savedData ? JSON.parse(savedData) : initialFormData;
  });

  const [currentStep, setCurrentStep] = useState<FormStep>("personal");
  const [errors, setErrors] = useState<FormErrors>({});

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
  }, [formData]);

  const validateStep = (step: FormStep): boolean => {
    const stepConfig = formSteps[step];
    const newErrors: FormErrors = {};

    stepConfig.fields.forEach((field) => {
      const validationRule = stepConfig.validationRules[field];
      if (validationRule) {
        const error = validationRule(formData[field]);
        if (error) newErrors[field] = error;
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const updateField = (field: keyof FormData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error when field is updated
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const nextStep = () => {
    if (!validateStep(currentStep)) return false;

    const steps: FormStep[] = ["personal", "professional", "address", "preferences", "review"];
    const currentIndex = steps.indexOf(currentStep);
    if (currentIndex < steps.length - 1) {
      setCurrentStep(steps[currentIndex + 1]);
      return true;
    }
    return false;
  };

  const previousStep = () => {
    const steps: FormStep[] = ["personal", "professional", "address", "preferences", "review"];
    const currentIndex = steps.indexOf(currentStep);
    if (currentIndex > 0) {
      setCurrentStep(steps[currentIndex - 1]);
      return true;
    }
    return false;
  };

  return {
    formData,
    currentStep,
    errors,
    updateField,
    nextStep,
    previousStep,
    validateStep,
  };
};
