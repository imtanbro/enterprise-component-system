import React from "react";
import { FormData } from "../types/form";

interface ReviewStepProps {
  formData: FormData;
}

export const ReviewStep: React.FC<ReviewStepProps> = React.memo(({ formData }) => {
  const sections = [
    {
      title: "Personal Information",
      fields: [
        { label: "First Name", value: formData.firstName },
        { label: "Last Name", value: formData.lastName },
        { label: "Email", value: formData.email },
        { label: "Phone", value: formData.phone },
      ],
    },
    {
      title: "Professional Details",
      fields: [
        { label: "Occupation", value: formData.occupation },
        { label: "Years of Experience", value: formData.yearsOfExperience },
        { label: "Skills", value: formData.skills.join(", ") },
      ],
    },
    {
      title: "Address",
      fields: [
        { label: "Street", value: formData.street },
        { label: "City", value: formData.city },
        { label: "State", value: formData.state },
        { label: "ZIP Code", value: formData.zipCode },
      ],
    },
    {
      title: "Preferences",
      fields: [
        {
          label: "Communication Preference",
          value: formData.communicationPreference,
        },
        { label: "Newsletter", value: formData.newsletter ? "Yes" : "No" },
        {
          label: "Terms Accepted",
          value: formData.termsAccepted ? "Yes" : "No",
        },
      ],
    },
  ];

  return (
    <div className="review-container">
      <div>
        <h2 className="review-title">Review Your Information</h2>
        <p className="review-description">Please review your information before submitting.</p>
      </div>

      {sections.map((section) => (
        <div key={section.title} className="review-section">
          <h3 className="section-title">{section.title}</h3>
          <dl className="section-details">
            {section.fields.map((field) => (
              <div key={field.label} className="detail-item">
                <dt className="detail-label">{field.label}</dt>
                <dd className="detail-value">{field.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      ))}
    </div>
  );
});
