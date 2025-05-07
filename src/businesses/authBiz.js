import authApi from "../apis/authApi";

const login = async (credential) => {
  const response = await authApi.login(credential);
  return response;
};

export default {
  login: login,
};
