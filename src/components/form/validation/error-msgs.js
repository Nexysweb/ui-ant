export const locationIsRequired = fieldName => `${fieldName} is required. (Please set a marker at the desired location)`;
// `${fieldName} is required. (Please set a marker at the desired location)`;

export const isRequired = fieldName => `${fieldName} is required`;

export const phone = fieldName => `${fieldName} must contain a phone number`;

export const isEmail = fieldName => `${fieldName} must contain a valid email address`;

export const mustMatch = otherFieldName => {
  return fieldName => `${fieldName} must match ${otherFieldName}`;
};

export const mustMatchLength = (length, digits) => {
  return fieldName => {
    if (digits) return `${fieldName} must contain ${length} digits`;
    return `${fieldName} must contain ${length} characters`;
  }
}

export const mustBeInSeq = values => {
  return fieldName => `${fieldName} must appear in ${values}`;
}

export const mustBeInInterval = (min, max) => {
  return fieldName => `${fieldName} must appear in between ${min} - ${max}`;
}

export const mustBeGreaterThan = min => {
  return fieldName => `${fieldName} must be larger than ${min}`;
}

export const minLength = (length, digits) => {
  return fieldName => {
    if (digits) return `${fieldName} must be at least ${length} digits`;
    return `${fieldName} must be at least ${length} characters`;
  }
};
