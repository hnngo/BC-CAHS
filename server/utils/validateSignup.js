const { ERROR_CODE } = require("../utils/errorCodes");

/**
 * Validates the signup data sent from frontend.
 * @param {*} signupData json including signup data
 * @returns json containing errorcode, msg and related data if any errors, else a valid response
 */
module.exports = function (signupData) {
    let msg = [];
    if (!signupData.first_name) { // check if first_name was provided
        msg.push(
            {
                error: ERROR_CODE.AUTH_NO_FIRST_NAME,
                msg: "First name must be provided",
                data: {
                    first_name: signupData.first_name
                }
            }

        );
    } else if (!signupData.last_name) { // check if last_name was provided
        msg.push(
            {
                error: ERROR_CODE.AUTH_NO_LAST_NAME,
                msg: "Last name must be provided",
                data: {
                    last_name: signupData.last_name
                }
            }

        );
    } else if (!/[\w'-]+/.test(signupData.first_name) || !/[\w'-]+/.test(signupData.last_name)) { // check if names include just alphabet chars
        msg.push(
            {
                error: ERROR_CODE.AUTH_INVALID_FIRST_OR_LAST_NAME,
                msg: "Name must contain only alphabet characters",
                data: {
                    last_name: signupData.last_name
                }
            }

        );
    } else if (!signupData.username) { // check if username was provided
        msg.push(
            {
                error: ERROR_CODE.AUTH_NO_USERNAME,
                msg: "Username is required",
                data: {
                    username: signupData.username
                }
            }
        );
    } else if (!signupData.password) { // check if password was provided
        msg.push(
            {
                error: ERROR_CODE.AUTH_NO_PASSWORD,
                msg: "Password is required",
                data: {
                    password: signupData.password
                }
            }
        );
    } else if (!signupData.confirmPassword) { // check if password confirmation was provided
        msg.push(
            {
                error: ERROR_CODE.AUTH_NO_CONFIRM_PASSWORD,
                msg: "Confirm password is required",
                data: {
                    confirmPassword: signupData.confirmPassword
                }
            }
        );
    } else if (signupData.username.length < 4) { // check if username is longer than 4 chars
        msg.push(
            {
                error: ERROR_CODE.AUTH_USERNAME_TOO_SHORT,
                msg: "Username must be longer than 4 characters",
                data: {
                    username: signupData.username
                }
            }
        );
    }else if (signupData.password.length < 8 || signupData.confirmPassword.length < 8) { // check if password is longer than 8
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
    } else if (signupData.password != signupData.confirmPassword) { // check if password and confirmation password matches
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