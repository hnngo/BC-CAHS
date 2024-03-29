import React from "react";

// Apis
import { apiGetMyUserInfo, apiLogout } from "../api/user";

const INITIAL_USER_INFO = {
  userId: "",
  username: "",
  firstName: "",
  lastName: "",
  isFetched: false
};

export const UserInfoContext = React.createContext({
  userInfo: INITIAL_USER_INFO,
  setUserInfo: () => {},
  clearUserInfo: () => {},
  getUserInfo: () => {}
});

export function UserInfoProvider({ children }) {
  const [userInfo, setUserInfo] = React.useState(INITIAL_USER_INFO);

  const getUserInfo = React.useCallback(async () => {
    const { error, data } = await apiGetMyUserInfo();

    if (!error && data && data.user && data.auth) {
      setUserInfo({
        ...userInfo,
        username: data.user.username || userInfo.username,
        userId: data.user.userId || userInfo.userId,
        firstName: data.user.first_name || userInfo.firstName,
        lastName: data.user.last_name || userInfo.lastName,
        isFetched: true
      });
    } else {
      setUserInfo({ ...INITIAL_USER_INFO, isFetched: true });
    }
  }, [userInfo]);

  React.useEffect(() => {
    getUserInfo();
  }, []);

  const clearUserInfo = React.useCallback(() => {
    setUserInfo({
      ...INITIAL_USER_INFO,
      isFetched: true
    });
    apiLogout();
  }, []);

  return (
    <UserInfoContext.Provider
      value={{
        userInfo,
        setUserInfo: (data) => setUserInfo((userInfo) => ({ ...userInfo, ...data })),
        clearUserInfo,
        getUserInfo
      }}>
      {children}
    </UserInfoContext.Provider>
  );
}
