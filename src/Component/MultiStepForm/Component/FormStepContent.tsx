import React from "react";
import { FormData, FormErrors } from "../types/form";
import { formSteps } from "../config/formConfig";

interface FormStepContentProps {
  step: keyof typeof formSteps;
  formData: FormData;
  errors: FormErrors;
  updateField: (field: keyof FormData, value: any) => void;
}

export const FormStepContent: React.FC<FormStepContentProps> = React.memo(({ step, formData, errors, updateField }) => {
  const stepConfig = formSteps[step];

  const renderField = (field: keyof FormData) => {
    const value = formData[field];
    const error = errors[field];

    switch (field) {
      case "skills":
        return (
          <div className="form-group">
            <label className="form-label">Skills</label>
            <input
              type="text"
              value={value as string[]}
              onChange={(e) => updateField(field, e.target.value.split(","))}
              placeholder="Enter skills separated by commas"
              className={`form-input ${error ? "input-error" : ""}`}
            />
            {error && <p className="error-text">{error}</p>}
          </div>
        );

      case "yearsOfExperience":
        return (
          <div className="form-group">
            <label className="form-label">Years of Experience</label>
            <input
              type="number"
              value={value as number}
              onChange={(e) => updateField(field, parseInt(e.target.value, 10))}
              min="0"
              className={`form-input ${error ? "input-error" : ""}`}
            />
            {error && <p className="error-text">{error}</p>}
          </div>
        );

      case "communicationPreference":
        return (
          <div className="form-group">
            <label className="form-label">Communication Preference</label>
            <select
              value={value as string}
              onChange={(e) => updateField(field, e.target.value)}
              className={`form-input ${error ? "input-error" : ""}`}
            >
              <option value="email">Email</option>
              <option value="phone">Phone</option>
              <option value="both">Both</option>
            </select>
            {error && <p className="error-text">{error}</p>}
          </div>
        );

      case "newsletter":
      case "termsAccepted":
        return (
          <div className="form-group">
            <label className="form-checkbox-label">
              <input type="checkbox" checked={value as boolean} onChange={(e) => updateField(field, e.target.checked)} className="form-checkbox" />
              <span className="checkbox-text">{field === "newsletter" ? "Subscribe to newsletter" : "I accept the terms and conditions"}</span>
            </label>
            {error && <p className="error-text">{error}</p>}
          </div>
        );

      default:
        return (
          <div className="form-group">
            <label className="form-label">{field.charAt(0).toUpperCase() + field.slice(1).replace(/([A-Z])/g, " $1")}</label>
            <input
              type={field === "email" ? "email" : "text"}
              value={value as string}
              onChange={(e) => updateField(field, e.target.value)}
              className={`form-input ${error ? "input-error" : ""}`}
            />
            {error && <p className="error-text">{error}</p>}
          </div>
        );
    }
  };

  return (
    <div className="step-container">
      <div>
        <h2 className="step-title">{stepConfig.title}</h2>
        <p className="step-description">{stepConfig.description}</p>
      </div>
      <div className="field-container">
        {stepConfig.fields.map((field) => (
          <React.Fragment key={field}>{renderField(field)}</React.Fragment>
        ))}
      </div>
    </div>
  );
});
