import baseApi from "./baseApi";

const me = async (accessToken) => {
  const url = `/users/me`;
  try {
    const response = await baseApi.get(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    console.log(response.data);
    return response.data;
  } catch (err) {
    throw err;
  }
};

const register = async (credential) => {
  console.log(credential)
  const url = `/users/register`;
  const payload = {
    email: credential.email,
    password: credential.password,
    username: credential.username,
  };
  try {
    const response = await baseApi.post(url, payload);
    console.log(response.data);
    return response.data;
  } catch (err) {
    throw err;
  }
};

export default {
  me: me,
  register: register,
};
