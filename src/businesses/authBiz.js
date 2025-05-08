import authApi from "../apis/authApi";

const login = async (credential) => {
  const response = await authApi.login(credential);
  return response;
};

const logout = async (credential) => {
  const response = await authApi.logout(credential);
  return response;
};

const refreshToken = async () => {
  const response = await authApi.refreshToken();
  return response;
};

export default {
  login: login,
  logout: logout,
  refreshToken: refreshToken,
};
