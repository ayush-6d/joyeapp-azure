import {
  IS_ALL_MAPPED,
  IS_CSV_IMPORTED,
  SAVE_CONTACTS_LOCALLY,
  SAVE_CONTACT_HEADERS,
  SAVE_IGNORED_HEADERS,
  SAVE_KEY_POINTS,
  SAVE_TAGS_LOCALLY,
  SAVE_TARGET_AMOUNT,
} from "src/constants/action-types";
import { dispatch } from "../utilities/generalUtils";
export function saveContactsLocally(contactsArray) {
  return dispatch({
    type: SAVE_CONTACTS_LOCALLY,
    contactsArray,
  });
}

export function saveContactHeaders(headers) {
  return dispatch({
    type: SAVE_CONTACT_HEADERS,
    headers,
  });
}

export function saveTagsLocally(tagName) {
  return dispatch({
    type: SAVE_TAGS_LOCALLY,
    tagName,
  });
}

export function isAllMapped(isDone) {
  return dispatch({
    type: IS_ALL_MAPPED,
    isDone,
  });
}

export function saveKeyPoints(keyPoints) {
  return dispatch({
    type: SAVE_KEY_POINTS,
    keyPoints,
  });
}

export function isCSVImported(isImported, fileName) {
  return dispatch({
    type: IS_CSV_IMPORTED,
    isImported,
    fileName,
  });
}

export function saveTargetAmount(amount) {
  return dispatch({
    type: SAVE_TARGET_AMOUNT,
    amount,
  });
}

export function saveIgnoredHeaders(ignoredHeaders) {
  return dispatch({
    type: SAVE_IGNORED_HEADERS,
    ignoredHeaders,
  });
}
