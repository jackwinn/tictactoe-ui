import userApi from "../apis/userApi";
import regexUtil from "../utilities/regexUtil";

const me = async (accessToken) => {
  const response = await userApi.me(accessToken);
  return response;
};

const register = async (credential) => {
  const response = await userApi.register(credential);
  return response;
};

const invalid = (err) => {
  return {
    ok: false,
    err: err,
  };
};

const credentialValidation = (credential) => {
  // console.log(credential.username);
  if (!credential.email) return invalid("Email is required.");
  if (credential.email && regexUtil.isValidEmail(credential.email))
    return invalid("Invalid email format.");
  if (!credential.password) return invalid("Password is required.");
  if (credential.password && credential.password.length < 8)
    return invalid("Password must be at least 8 characters.");
  if (credential.password) {
    const validPassword = regexUtil.isValidPassword(credential.password);
    return invalid(validPassword);
  }
  if (!credential.username) return invalid("Username is required.");
  return {
    ok: true,
  };
};

const updateScore = async (gameResult, userId, accessToken) => {
  const response = await userApi.updateScore(gameResult, userId, accessToken);
  return response;
};

export default {
  me: me,
  register: register,
  credentialValidation: credentialValidation,
  updateScore: updateScore,
};
