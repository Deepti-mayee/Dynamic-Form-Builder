// validators.js
export const validateRequired = (value) => {
    return value !== '';
  };
  
  export const validateNumberRange = (value, min, max) => {
    return value >= min && value <= max;
  };
  