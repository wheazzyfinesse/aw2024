// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyD_ff0GvHeMmzwUso0o4Vc4sSKjUiD3J1o",
    authDomain: "aw2024-de941.firebaseapp.com",
    projectId: "aw2024-de941",
    storageBucket: "aw2024-de941.appspot.com",
    messagingSenderId: "205489323321",
    appId: "1:205489323321:web:5514f28e82e4b7963ffce8",
    measurementId: "G-3G4VCV47JC"

};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const storage = getStorage(app);
export { storage, auth }