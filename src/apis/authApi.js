import baseApi from "./baseApi";

const login = async (credential) => {
  const url = `/auths/login`;
  const payload = {
    email: credential.email,
    password: credential.password,
  };
  try {
    const response = await baseApi.post(url, payload);
    return response.data;
  } catch (err) {
    throw err;
  }
};

const refreshToken = async () => {
  const url = `/auths/refreshToken`;
  try {
    const response = await baseApi.post(url);
    return response.data;
  } catch (err) {
    throw err;
  }
};

export default {
  login: login,
  refreshToken: refreshToken,
};
