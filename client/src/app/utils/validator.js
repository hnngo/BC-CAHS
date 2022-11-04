export const VALIDATE_TYPES = {
  NUMBER_ONLY: "number_only",
  CHAR_ONLY: "char_only",
  ALPHANUMERIC_ONLY: "alphanumeric_only",

  MIN_LENGTH: "min_length",
  MAX_LENGTH: "min_length",

  THREE_DECIMAL: "three_decimal"
};

const VALIDATE_ERROR_MESSAGE = {
  [VALIDATE_TYPES.NUMBER_ONLY]: "Please enter numbers only.",
  [VALIDATE_TYPES.CHAR_ONLY]: "Please enter characters only.",
  [VALIDATE_TYPES.ALPHANUMERIC_ONLY]: "Please enter alphanumeric characters only.",

  // For Chars/String
  [VALIDATE_TYPES.MIN_LENGTH]: "Please enter alphanumeric characters only.",
  [VALIDATE_TYPES.MAX_LENGTH]: "Please enter alphanumeric characters only."
};

export const validate = (value, validateTypes = [], ...args) => {
  const error = [];

  validateTypes.forEach((type) => {
    switch (type) {
      case VALIDATE_TYPES.NUMBER_ONLY:
        if (isNaN(value)) {
          error.push(VALIDATE_ERROR_MESSAGE[VALIDATE_TYPES.NUMBER_ONLY]);
        }
        break;
      default:
        break;
    }
  });

  return error;
};
