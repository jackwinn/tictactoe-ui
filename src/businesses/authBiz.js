import authApi from "../apis/authApi";
import regexUtil from "../utilities/regexUtil";

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

const invalid = (err) => {
  return {
    ok: false,
    err: err,
  };
};

const credentialValidation = (credential) => {
  if (!credential.email) return invalid("Email is required.");
  if (credential.email && regexUtil.isValidEmail(credential.email))
    return invalid("Invalid email format.");
  if (!credential.password) return invalid("Password is required.");
  return {
    ok: true,
  };
};

export default {
  login: login,
  logout: logout,
  refreshToken: refreshToken,
  credentialValidation: credentialValidation,
};
