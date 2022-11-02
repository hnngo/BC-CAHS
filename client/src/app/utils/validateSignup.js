import { ErrorSharp } from "@mui/icons-material";

const validateSignup = (data) => {
    let errors = {};
    if (!data.first_name) {
        errors.first_name = "First name must be provided"
    } else if (!/[\w'-]+/.test(data.first_name)) {
        errors.first_name = "First name must contain only alphabet characters"
    }
    if (!data.last_name) {
        errors.last_name = "Last name must be provided"
    } else if (!/[\w'-]+/.test(data.last_name)) {
        errors.last_name = "Last name must contain only alphabet characters"
    }
    if (!data.username) {
        errors.username = "Username is required"
    } else if (data.username.length < 4) {
        errors.username = "Username must be longer than 4 characters"
    }
    if (!data.password) {
        errors.password = "Password is required"
    } else if (data.password.length < 8) {
        errors.password = "Password must be longer than 8 characters long"
    }
    if (!data.confirmPassword) {
        errors.confirmPassword = "Please confirm your password"
    }
    if (data.password != data.confirmPassword) {
        errors.confirmPassword = "Password does not match"
    }
  return errors;
}

export default validateSignup
