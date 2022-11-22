import { ErrorSharp } from "@mui/icons-material";

/**
 * Validates signup in front end
 * @param {*} data a json of user inputs
 * @returns json containing error(s), else empty object
 */
const validateSignup = (data) => {
    let errors = {};
    if (!data.first_name) { // check if first name was provided
        errors.first_name = "First name must be provided"
    } else if (!/[\w'-]+/.test(data.first_name)) { // check if first name contains alphabet chars only
        errors.first_name = "First name must contain only alphabet characters"
    }
    if (!data.last_name) { // check if last name was provided
        errors.last_name = "Last name must be provided"
    } else if (!/[\w'-]+/.test(data.last_name)) { // check if last name contains alphabet chars only
        errors.last_name = "Last name must contain only alphabet characters"
    }
    if (!data.username) { // check if username was provided
        errors.username = "Username is required"
    } else if (data.username.length < 4) { // check if username length is longer than 4
        errors.username = "Username must be longer than 4 characters"
    }
    if (!data.password) { // check if password was provided
        errors.password = "Password is required"
    } else if (data.password.length < 8) { // check if password length is longer than 4
        errors.password = "Password must be longer than 8 characters long"
    }
    if (!data.confirmPassword) { // check if confirmation password was provided
        errors.confirmPassword = "Please confirm your password"
    }
    if (data.password != data.confirmPassword) { // check if password and confirmation password matches
        errors.confirmPassword = "Password does not match"
    }
  return errors;
}

export default validateSignup
