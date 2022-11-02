import ERROR_CODE from "../utils/errorCodes"

export const validateSignup = (signupData) => {
    if (!signupData.first_name) {
        res.send(
            {
                error: ERROR_CODE.AUTH_NO_FIRST_NAME,
                msg: "First name must be provided",
                data: {
                    first_name: signupData.first_name
                }
            }

        );
    }
    if (!signupData.last_name) {
        res.send(
            {
                error: ERROR_CODE.AUTH_NO_LAST_NAME,
                msg: "Last name must be provided",
                data: {
                    last_name: signupData.last_name
                }
            }

        );
    }
    if (!/[\w'-]+/.test(signupData.first_name) || !/[\w'-]+/.test(signupData.last_name)) {
        res.send(
            {
                error: ERROR_CODE.AUTH_INVALID_FIRST_OR_LAST_NAME,
                msg: "Name must contain only alphabet characters",
                data: {
                    last_name: signupData.last_name
                }
            }

        );
    }
    if (!signupData.username) {
        res.send(
            {
                error: ERROR_CODE.AUTH_NO_USERNAME,
                msg: "Username is required",
                data: {
                    username: signupData.username
                }
            }
        );
    }
    if (!signupData.password) {
        res.send(
            {
                error: ERROR_CODE.AUTH_NO_PASSWORD,
                msg: "Password is required",
                data: {
                    password: signupData.password
                }
            }
        );
    }
    if (!signupData.confirmPassword) {
        res.send(
            {
                error: ERROR_CODE.AUTH_NO_CONFIRM_PASSWORD,
                msg: "Confirm password is required",
                data: {
                    confirmPassword: signupData.confirmPassword
                }
            }
        );
    }
    if (signupData.username.length < 4) {
        res.send(
            {
                error: ERROR_CODE.AUTH_USERNAME_TOO_SHORT,
                msg: "Username must be longer than 4 characters",
                data: {
                    username: signupData.username
                }
            }
        );
    }
    if (signupData.password.length < 8 || signupData.confirmPassword.length < 8) {
        res.send(
            {
                error: ERROR_CODE.AUTH_PASSWORD_TOO_SHORT,
                msg: "Password must be longer than 8 characters long",
                data: {
                    password: signupData.password,
                    confirmPassword: signupData.confirmPassword
                }
            }
        );
    }
    if (signupData.password != signupData.confirmPassword) {
        res.send(
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
}