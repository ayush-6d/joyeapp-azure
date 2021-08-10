import * as firebase from "firebase";

const config = {
  apiKey: "AIzaSyDgBMwAlFM7VnTNELf-ZJnWOkCETCTr9Kk",
  authDomain: "joye-768f7.firebaseapp.com",
  projectId: "joye-768f7",
  type: "service_account",
  project_id: "joye-768f7",
  databaseURL: "https://master-768f7.firebaseio.com",
};
// const firebaseInit = firebase.initializeApp(config)
export const firebaseInit = firebase.initializeApp(config);
export const database = firebaseInit.database();
export const auth = firebase.auth();
export const firestore = firebase.firestore();
export const timestamp = firebase.database.ServerValue.TIMESTAMP;
export const storage = firebase.storage();
export const provider = new firebase.auth.GoogleAuthProvider();
export const faceBookProvider = new firebase.auth.FacebookAuthProvider();
