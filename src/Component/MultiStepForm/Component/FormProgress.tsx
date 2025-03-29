import React from "react";
import { FormStep } from "../types/form";
import { Check, Circle } from "lucide-react";

interface FormProgressProps {
  currentStep: FormStep;
}

const steps: { key: FormStep; label: string }[] = [
  { key: "personal", label: "Personal" },
  { key: "professional", label: "Professional" },
  { key: "address", label: "Address" },
  { key: "preferences", label: "Preferences" },
  { key: "review", label: "Review" },
];

export const FormProgress: React.FC<FormProgressProps> = ({ currentStep }) => {
  const currentIndex = steps.findIndex((step) => step.key === currentStep);

  return (
    <div className="progress-container">
      <div className="progress-steps">
        {steps.map((step, index) => (
          <React.Fragment key={step.key}>
            <div className="progress-step">
              <div className={`progress-circle ${index < currentIndex ? "completed" : index === currentIndex ? "current" : "pending"}`}>
                {index < currentIndex ? <Check className="progress-icon" /> : <Circle className="progress-icon" />}
              </div>
              <span className="progress-label">{step.label}</span>
            </div>
            {index < steps.length - 1 && <div className={`progress-line ${index < currentIndex ? "completed-line" : "pending-line"}`} />}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};
