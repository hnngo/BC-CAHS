const ERROR_CODE = {
  NO_ERROR: 0,

  // Generic 1~99
  SERVER_TIMEOUT: 1,
  DATABASE_ERROR: 2,
  MISSING_INFO: 3,
  SERVER_ERROR: 99,

  // Authentication error 100~199
  AUTH_USERNAME_NOT_EXISTED: 100,
  AUTH_WRONG_PASSWORD: 101,
  AUTH_WEAK_PASSWORD: 102,
  AUTH_LOGIN_FAILED_MULTIPLE_TIMES: 103,
  AUTH_ACCOUNT_EXISTED: 104,

  // Form error 200~299
  FORM_INVALID_FIELDS: 200,
  FORM_EXISTED: 201,
  FORM_NOT_FOUND: 202,
};

const ERROR_MSG = {
  // Generic 1~99
  [ERROR_CODE.SERVER_TIMEOUT]: "Server timeout",
  [ERROR_CODE.DATABASE_ERROR]: "Database error",
  [ERROR_CODE.MISSING_INFO]: "Missing information",

  // Authentication error 100~199
  [ERROR_CODE.AUTH_USERNAME_NOT_EXISTED]: "Username not existed",
  [ERROR_CODE.AUTH_WRONG_PASSWORD]: "Password incorrect",
  [ERROR_CODE.AUTH_WEAK_PASSWORD]: "Weak password",
  [ERROR_CODE.AUTH_ACCOUNT_EXISTED]: "Account existed",

  // Form error 200~299
  [ERROR_CODE.FORM_INVALID_FIELDS]: "There are invalid fields",
  [ERROR_CODE.FORM_EXISTED]: "Submission form existed",
  [ERROR_CODE.FORM_NOT_FOUND]: "Submission form not found",
};

const getErrorMessage = (code) => {
  if (ERROR_MSG[code]) {
    return ERROR_MSG[code];
  } else {
    return "Server error, please try again!";
  }
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
};

module.exports = { ERROR_CODE, getErrorMessage };
