export const VALIDATE_TYPES = {
  NUMBER_ONLY: "number_only",
  CHAR_ONLY: "char_only",
  ALPHANUMERIC_ONLY: "alphanumeric_only",

  MIN_LENGTH: "min_length",
  MAX_LENGTH: "min_length",

  THREE_DECIMAL: "three_decimal"
};

const submissionFormCharacterLimits = {
  submissionNum: 30,
  companyName: 25,
  submitter: 25,
  receiver: 50,
  clientPO: 15,
  clientCaseNum: 30,
  contactPhoneNum: 15,
  samplingLocation: 50,
  custodian: 5,
  PI: 5,
  BCCAHSProject: 30,
  initialStorage: 20,
  sampleNum: 32767,
  sampleSpecies: 25,
  sampleType: 100,
  sampleDetails: 255,
  comment: 255
};

const VALIDATE_ERROR_MESSAGE = {
  [VALIDATE_TYPES.NUMBER_ONLY]: "Please enter numbers only.",
  [VALIDATE_TYPES.CHAR_ONLY]: "Please enter characters only.",
  [VALIDATE_TYPES.ALPHANUMERIC_ONLY]: "Please enter alphanumeric characters only.",

  // For Chars/String
  [VALIDATE_TYPES.MIN_LENGTH]: "Please enter alphanumeric characters only.",
  [VALIDATE_TYPES.MAX_LENGTH]: "Please enter alphanumeric characters only.",

  // Time and Date
  timeRequired: "Time is required.",
  timeFormat: "Time must match hh:mm AM/PM format.",
  dateRequired: "Date is Required.",
  dateFormat: "Date must match mm/dd/yyyy format.",

  // Text
  textRequired: "Text field is required.",
  textLength: "Text max length - ",

  // Number
  integerLessThanZero: "Integer must be positive.",
  notAnInteger: "Must be an integer.",
  smallIntRequired: "Integer is required.",
  smallIntLimit: "Integer max length - "
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

export const validateDate = (name, field) => {
  if (field == null || field.length == 0) {
    return `${name}: ${VALIDATE_ERROR_MESSAGE.dateRequired}`;
  } else if (field.$d == "Invalid Date") {
    return `${name}: ${VALIDATE_ERROR_MESSAGE.dateFormat}`;
  } else {
    return "";
  }
};

export const validateTime = (name, field) => {
  if (field == null || field.length == 0) {
    return `${name}: ${VALIDATE_ERROR_MESSAGE.timeRequired}`;
  } else if (field.$d.toString() == "Invalid Date") {
    return `${name}: ${VALIDATE_ERROR_MESSAGE.timeFormat}`;
  } else {
    return "";
  }
};

export const validateText = (name, field) => {
  if (field == null || field.length == 0) {
    return `${name}: ${VALIDATE_ERROR_MESSAGE.textRequired}`;
  } else if (field.length > submissionFormCharacterLimits[name]) {
    return `${name}: ${VALIDATE_ERROR_MESSAGE.textLength} ${name} cannot exceed ${submissionFormCharacterLimits[name]} characters.`;
  } else {
    return "";
  }
};

export const validateTextNum = (name, field) => {
  if (field == null || field.length == 0) {
    return `${name}: ${VALIDATE_ERROR_MESSAGE.smallIntRequired}`;
  } else if (parseInt(field) > submissionFormCharacterLimits[name]) {
    return `${name}: ${VALIDATE_ERROR_MESSAGE.smallIntLimit} cannot exceed ${submissionFormCharacterLimits[name]}.`;
  } else if (parseInt(field) < 0) {
    return `${VALIDATE_ERROR_MESSAGE.integerLessThanZero}`;
  } else if (!Number.isInteger(parseInt(field))) {
    return `${VALIDATE_ERROR_MESSAGE.notAnInteger}`;
  } else {
    return "";
  }
};
