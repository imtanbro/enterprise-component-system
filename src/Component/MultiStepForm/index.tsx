import React, { memo } from "react";
import { FormProgress } from "./Component/FormProgress";
import { useFormState } from "./Hook/useFormState";
import { ReviewStep } from "./Component/ReviewStep";
import { FormStepContent } from "./Component/FormStepContent";
import { ArrowLeft, ArrowRight, Send } from "lucide-react";

const MultiStepForm = () => {
  const { formData, currentStep, errors, updateField, nextStep, previousStep } = useFormState();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    alert("Form submitted successfully!");
  };
  return (
    <div className="form-wrapper">
      <div className="form-card">
        <div className="form-card-body">
          <FormProgress currentStep={currentStep} />

          <form onSubmit={handleSubmit} className="form">
            {currentStep === "review" ? (
              <ReviewStep formData={formData} />
            ) : (
              <FormStepContent step={currentStep} formData={formData} errors={errors} updateField={updateField} />
            )}

            <div className="form-footer">
              <button type="button" onClick={previousStep} className="btn btn-secondary">
                <ArrowLeft className="icon-left" />
                Previous
              </button>

              {currentStep === "review" ? (
                <button type="submit" className="btn btn-primary">
                  <Send className="icon-left" />
                  Submit
                </button>
              ) : (
                <button type="button" onClick={nextStep} className="btn btn-primary">
                  Next
                  <ArrowRight className="icon-right" />
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default memo(MultiStepForm);
