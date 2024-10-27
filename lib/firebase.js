import firebase from 'firebase/compat/app';
import 'firebase/compat/analytics';
import 'firebase/compat/auth';
import 'firebase/compat/messaging';
import 'firebase/compat/firestore';

const firebaseConfig = {
    apiKey: 'AIzaSyChP61wkUpsFFEV9C9GzFRTma5pGhhg8EU',
    authDomain: 'eagle-eye-c11a9.firebaseapp.com',
    projectId: 'eagle-eye-c11a9',
    storageBucket: 'eagle-eye-c11a9.appspot.com',
    messagingSenderId: '1048687057489',
    appId: '1:1048687057489:web:f3ef1f9a60fb9132a47670',
    measurementId: 'G-3B8235S9K1',
};
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}
export const auth = firebase.auth();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
export const firestore = firebase.firestore();
export const db = firebase.firestore();
export const serverTimestamp = firebase.firestore.FieldValue.serverTimestamp;
