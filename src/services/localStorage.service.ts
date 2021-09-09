// Functions to operate localStorage

function getAuthToken() {
  return JSON.parse(localStorage.getItem("authToken"));
}

function setAuthToken(token) {
  localStorage.setItem("authToken", JSON.stringify(token));
}

function removeAuthToken() {
  localStorage.removeItem("authToken");
}

function setCurrentUser(user) {
  localStorage.setItem("currentUser", JSON.stringify(user));
}

function getCurrentUser() {
  return JSON.parse(localStorage.getItem("currentUser"));
}

function removeCurrentUser() {
  localStorage.removeItem("currentUser");
}

function setAuthId(id) {
  localStorage.setItem("authId", JSON.stringify(id));
}

function getAuthId() {
  return JSON.parse(localStorage.getItem("authId"));
}

function setDbUrl(url) {
  localStorage.setItem("dburl", JSON.stringify(url));
}

function getDbUrl() {
  return JSON.parse(localStorage.getItem("dburl"));
}

function setDbId(id) {
  localStorage.setItem("dbId", JSON.stringify(id));
}

function getDbId() {
  return JSON.parse(localStorage.getItem("dbId"));
}

function getUserId() {
  return localStorage.getItem("userId");
}

function setUserId(id) {
  localStorage.setItem("userId", id);
}

function getTId() {
  return localStorage.getItem("tid");
}

function setTid(id) {
  localStorage.setItem("tid", id);
}
export {
  getAuthToken,
  setAuthToken,
  removeAuthToken,
  setCurrentUser,
  getCurrentUser,
  removeCurrentUser,
  setAuthId,
  getAuthId,
  setDbUrl,
  getDbUrl,
  setDbId,
  getDbId,
  getUserId,
  setUserId,
  getTId,
  setTid,
};
