module.exports = {
    ERROR_CODE : {
        NO_ERROR: 0,
  
        // Generic 1~99
        SERVER_TIMEOUT: 1,
        DATABASE_ERROR: 2, 
    
        // Authentication error 100~199
        AUTH_NO_USERNAME: 100,
        AUTH_USERNAME_TOO_SHORT: 101,
        AUTH_NO_FIRST_NAME: 102,
        AUTH_NO_LAST_NAME_: 103,
        AUTH_INVALID_FIRST_OR_LAST_NAME: 104,
        AUTH_NO_PASSWORD: 105,
        AUTH_NO_CONFIRM_PASSWORD: 106,
        AUTH_PASSWORDS_DO_NOT_MATCH: 107,
        AUTH_PASSWORD_TOO_SHORT: 108,
        AUTH_ACCOUNT_EXISTS: 109,
    
        // Form error 200~299
        FORM_INVALID_FIELDS: 200,
        FORM_EXISTED: 201
    }
  }
