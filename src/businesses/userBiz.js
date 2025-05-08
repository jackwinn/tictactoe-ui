import userApi from "../apis/userApi";

const me = async (accessToken) => {
  const response = await userApi.me(accessToken);
  return response;
};

const register = async (credential) => {
  const response = await userApi.register(credential);
  return response;
};

export default {
  me: me,
  register: register,
};
