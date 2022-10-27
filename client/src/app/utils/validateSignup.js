import { ErrorSharp } from "@mui/icons-material";

const validateSignup = (data) => {
    let errors = {};

    if (!data.username) {
        errors.username = "Username is required"
    } else if (data.username.length < 4) {
        errors.username = "Username must be longer than 4 characters"
    }
    if (!data.password) {
        errors.password = "Password is required"
    } else if (data.password.length < 8) {
        errors.password = "Password must be more than 8 characters long"
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
