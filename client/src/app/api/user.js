import { get, post } from "../utils/fetchUtils";

export const apiGetMyUserInfo = () => {
  return get("http://localhost:8000/api/auth/authUser");
};

export const apiLogout = () => {
  return post("http://localhost:8000/api/auth/logout");
};
