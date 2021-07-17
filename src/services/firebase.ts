import * as firebase from 'firebase'
const config = {
  apiKey: 'AIzaSyDgBMwAlFM7VnTNELf-ZJnWOkCETCTr9Kk',
  authDomain: 'joye-768f7.firebaseapp.com',
  projectId: 'joye-768f7',
  type: 'service_account',
  project_id: 'joye-768f7',
  databaseURL: 'https://teams-768f7-e6e45.firebaseio.com',
};
// const firebaseInit = firebase.initializeApp(config)
export const firebaseInit = firebase.initializeApp(config)
  // export const db = firebaseInit.database();