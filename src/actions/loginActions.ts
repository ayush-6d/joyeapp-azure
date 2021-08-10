import { dispatch } from "../utilities/generalUtils";
import { LOGIN_USER } from "../constants/action-types";

export function loginUser(userData) {
  return dispatch({
    type: LOGIN_USER,
    userData,
  });
}

export function logoutUser(userData) {
  return dispatch({
    type: LOGIN_USER,
    userData,
  });
}
