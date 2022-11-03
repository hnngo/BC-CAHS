const ERROR_CODE = require("../utils/errorCodes");

module.exports = function (signupData) {
    let msg = [];
    if (!signupData.first_name) {
        msg.push(
            {
                error: ERROR_CODE.AUTH_NO_FIRST_NAME,
                msg: "First name must be provided",
                data: {
                    first_name: signupData.first_name
                }
            }

        );
    } else if (!signupData.last_name) {
        msg.push(
            {
                error: ERROR_CODE.AUTH_NO_LAST_NAME,
                msg: "Last name must be provided",
                data: {
                    last_name: signupData.last_name
                }
            }

        );
    } else if (!/[\w'-]+/.test(signupData.first_name) || !/[\w'-]+/.test(signupData.last_name)) {
        msg.push(
            {
                error: ERROR_CODE.AUTH_INVALID_FIRST_OR_LAST_NAME,
                msg: "Name must contain only alphabet characters",
                data: {
                    last_name: signupData.last_name
                }
            }

        );
    } else if (!signupData.username) {
        msg.push(
            {
                error: ERROR_CODE.AUTH_NO_USERNAME,
                msg: "Username is required",
                data: {
                    username: signupData.username
                }
            }
        );
    } else if (!signupData.password) {
        msg.push(
            {
                error: ERROR_CODE.AUTH_NO_PASSWORD,
                msg: "Password is required",
                data: {
                    password: signupData.password
                }
            }
        );
    } else if (!signupData.confirmPassword) {
        msg.push(
            {
                error: ERROR_CODE.AUTH_NO_CONFIRM_PASSWORD,
                msg: "Confirm password is required",
                data: {
                    confirmPassword: signupData.confirmPassword
                }
            }
        );
    } else if (signupData.username.length < 4) {
        msg.push(
            {
                error: ERROR_CODE.AUTH_USERNAME_TOO_SHORT,
                msg: "Username must be longer than 4 characters",
                data: {
                    username: signupData.username
                }
            }
        );
    }else if (signupData.password.length < 8 || signupData.confirmPassword.length < 8) {
        msg.push(
            {
                error: ERROR_CODE.AUTH_PASSWORD_TOO_SHORT,
                msg: "Password must be longer than 8 characters long",
                data: {
                    password: signupData.password,
                    confirmPassword: signupData.confirmPassword
                }
            }
        );
    } else if (signupData.password != signupData.confirmPassword) {
        msg.push(
            {
                error: ERROR_CODE.AUTH_PASSWORD_DO_NOT_MATCH,
                msg: "Password does not match",
                data: {
                    password: signupData.password,
                    confirmPassword: signupData.confirmPassword
                }
            }
        );
    }
    return new Promise((res, err) => res(msg));
}