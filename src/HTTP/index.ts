import axios, { AxiosRequestConfig } from 'axios';
import { API_ROOT } from 'src/config';
import { getUserData, parseJwt, getUserDataForSession } from 'src/utilities/generalUtils';

let axiosInstance = axios.create({
  baseURL: API_ROOT,
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${(getUserData() || getUserDataForSession() || {}).accessToken}`
  }
});

axiosInstance.interceptors.request.use(function (request: AxiosRequestConfig) {
  const originalRequest = request;
  console.log(request)
  // check if token is expired
  const token = (getUserData() || getUserDataForSession() || {}).accessToken;
  const userDetails = token && parseJwt(token);
  if (userDetails && (`${userDetails.exp} 000`) < Date.now().toString()) {
    // for time being, if the token is expired then user is asked to login
    // once the API for getting the new token is ready then add the request here
    localStorage.clear();
    return;
  }
  return originalRequest;
});

axiosInstance.interceptors.response.use(function (response) {
  return response;
}, function (error) {
  Promise.reject(error);
});

axiosInstance.interceptors.request.use(
  config => {
    const userData = getUserData();
    const token = userData && userData.accessToken ? userData.accessToken : '';
    const isUserLoggedIn = userData && userData.isUserLoggedIn ? userData.isUserLoggedIn : false;
    if (isUserLoggedIn && token) {
      config.headers.Authorization = `Bearer ${token} `;
    }
    return config;
  },
  error => Promise.reject(error)
);

export async function get(url: string) {
  try {
    const response = await axiosInstance.get(url);
    if (response.data.status) {
      return response.data;
    }
    throw new Error(response.data);
  } catch (error) {
    throw error;
  }
}
export async function post(url: string, data: {}) {
  try {
    const response = await axiosInstance.post(url, data);
    if (response.data.status || response.data.status === 'valid') {
      return response.data;
    }
    throw new Error(JSON.stringify(response.data));
  } catch (error) {
    throw error;
  }
}

export async function put(url: string, data: {}) {
  try {
    const response = await axiosInstance.put(url, data);
    if (response.data.status) {
      return response.data;
    }
    throw new Error(response.data);
  } catch (error) {
    throw error;
  }
}

export async function del(url: string, data: {}) {
  try {
    const response = await axiosInstance.delete(url, data);
    if (response.data.status) {
      return response.data;
    }
    throw new Error(response.data);
  } catch (error) {
    throw error;
  }
}
