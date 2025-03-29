export const validateEmail = (email: string): string | null => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email) return "Email is required";
  if (!emailRegex.test(email)) return "Invalid email format";
  return null;
};

export const validatePhone = (phone: string): string | null => {
  const phoneRegex = /^\+?[\d\s-]{10,}$/;
  if (!phone) return "Phone number is required";
  if (!phoneRegex.test(phone)) return "Invalid phone number format";
  if (phone.length > 10) {
    if (phone[0] !== "0") return "Invalid phone number format";
  }
  return null;
};

export const validateRequired = (value: any, fieldName: string): string | null => {
  if (!value || (Array.isArray(value) && value.length === 0)) {
    return `${fieldName} is required`;
  }
  return null;
};

export const validateZipCode = (zipCode: string): string | null => {
  const zipRegex = /^\d{6}(-\d{4})?$/;
  if (!zipCode) return "ZIP code is required";
  if (!zipRegex.test(zipCode)) return "Invalid ZIP code format";
  return null;
};
