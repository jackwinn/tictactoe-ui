const isValidEmail = (email) => {
  const emailRegexp =
    /^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/;
  return !emailRegexp.test(email);
};

const isValidPassword = (password) => {
  const errors = {};
  const upperCaseRegex = /[A-Z]/;
  const lowerCaseRegex = /[a-z]/;
  const numberRegex = /[0-9]/;

  const missingCriteria = [];

  if (!upperCaseRegex.test(password)) {
    missingCriteria.push("one uppercase letter");
  }
  if (!lowerCaseRegex.test(password)) {
    missingCriteria.push("one lowercase letter");
  }
  if (!numberRegex.test(password)) {
    missingCriteria.push("one number");
  }

  if (missingCriteria.length > 0) {
    return (errors.password = `Password must contain at least ${missingCriteria.join(
      ", "
    )}.`);
  }
};

export default {
  isValidEmail: isValidEmail,
  isValidPassword: isValidPassword,
};
