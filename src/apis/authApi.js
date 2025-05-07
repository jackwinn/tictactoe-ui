import baseApi from "./baseApi";

const login = async (credential) => {
  const url = `/auths/login`;
  const payload = {
    email: credential.email,
    password: credential.password,
  };
  try {
    const response = await baseApi.post(url, payload);
    console.log(response.data)
    return response.data;
  } catch (err) {
    throw err;
  }
};

export default {
  login: login,
};
