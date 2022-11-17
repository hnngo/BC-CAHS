import { get, post } from "../utils/fetchUtils";

export const apiGetMyUserInfo = () => {
  return get("/api/auth/authUser");
};

export const apiLogout = () => {
  return post("/api/auth/logout");
};

export const apiLogin = (data) => {
  return post("/api/auth/login", data);
};

export const apiSignup = (data) => {
  return post("/api/auth/signup", data);
};

export const apiGetAuthUser = () => {
  return get("/api/auth/authUser");
};
