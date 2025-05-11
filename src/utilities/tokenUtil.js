import { jwtDecode } from "jwt-decode";

const isAccessTokenExpired = () => {
  const token = localStorage.getItem("accessToken");
  if (!token) return true;
  const decoded = jwtDecode(token);
  const currentTime = Date.now() / 1000;

  if (decoded.exp < currentTime) {
    return true;
  } else {
    // console.error("Invalid token:");
    return false;
  }
};

export default {
  isAccessTokenExpired: isAccessTokenExpired,
};


