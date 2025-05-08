import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";

const isAccessTokenExpired = () => {
  const token = localStorage.getItem("accessToken");
  if (!token) return true;
  const decoded = jwtDecode(token);
  const currentTime = Date.now() / 1000;

  if (decoded.exp < currentTime) {
    return true;
  } else {
    console.error("Invalid token:");
    return false;
  }
};

function getCookie(key) {
  // var b = document.cookie.match("(^|;)\\s*" + key + "\\s*=\\s*([^;]+)");
  // return b ? b.pop() : "";
  return document.cookie
    .split("; ")
    .find((row) => row.startsWith(`${key}=`))
    ?.split("=")[1];
}

export const isRefreshTokenExpired = () => {
  console.log("HI");

  console.log(getCookie("jwt"));

  //   const allCookies = document.cookie;
  //   const cookieArray = allCookies.split(";");

  //   const cookieMap = {};

  //   cookieArray.forEach((cookieStr) => {
  //     const [name, value] = cookieStr.trim().split("=");
  //     if (name && value) cookieMap[name] = value;
  //   });

  //   const jwt = getCookie("jwt");
  //   if (jwt) {
  //     console.log("jwt:", jwt);
  //   }

  //   for (const name in cookieMap) {
  //     console.log(`Cookie Name: ${name}, Value: ${cookieMap[name]}`);
  //   }
  //   try {
  //     const decoded = jwtDecode(token);
  //     const currentTime = Date.now() / 1000;
  //     console.log(`Is cookie jwt expired: ${decoded.exp < currentTime}`);
  //     // return decoded.exp < currentTime;
  //   } catch (err) {
  //     console.error("Invalid refresh token", err);
  //     // return true;
  //   }
};

export default {
  isAccessTokenExpired: isAccessTokenExpired,
  isRefreshTokenExpired: isRefreshTokenExpired,
};
