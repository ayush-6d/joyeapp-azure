import { store } from '../store';
import { LOCAL_STORAGE_KEY, LOCAL_STORAGE_KEY_FOR_SESSION } from 'src/constants/utils';
import CryptoJS from 'crypto-js'

export function dispatch(action) {
    store.dispatch(action);
}

export const createHash = async(userId) => {
    return CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(userId));
  }

export function isEmpty(o) {
    if (Object.keys(o).length <= 0 || !o) {
        return true;
    } else {
        return false;
    }
}

export function parseJwt(token) {
    if (!token) { return; }
    debugger
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace('-', '+').replace('_', '/');
    return JSON.parse(window.atob(base64));
}

export function saveUserData(data) {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(data));
}

export function saveUserDataForSession(data) {
    sessionStorage.setItem(LOCAL_STORAGE_KEY_FOR_SESSION, JSON.stringify(data));
}

export function objectToArray(obj) {
    let arrayObj = Object.keys(obj).map(key => {
        return { [key]: obj[key] };
    });
    return arrayObj;
}

export function getUserData() {
    return null
    // JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
}

export function getUserDataForSession() {
    return null
    // JSON.parse(sessionStorage.getItem(LOCAL_STORAGE_KEY_FOR_SESSION));
}

function capitalize(): string {

    if (!this) {
        return;
    }
    return this.charAt(0).toUpperCase() + this.slice(1);
}

function deCapitalize(): string {

    if (!this) {
        return;
    }
    return this.charAt(0).toLowerCase() + this.slice(1);
}

String.prototype.deCapitalize = deCapitalize;
String.prototype.capitalize = capitalize;

