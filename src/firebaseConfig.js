import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"

const firebaseConfig = {
    apiKey: "AIzaSyCX8rG8WL77_yI7b8xToRn44W3auuzD_uw",
    authDomain: "affable-hall-394214.firebaseapp.com",
    projectId: "affable-hall-394214",
    storageBucket: "affable-hall-394214.appspot.com",
    messagingSenderId: "654269140914",
    appId: "1:654269140914:web:6ea87e04916a8cdc0c5eab"
};

const app = initializeApp(firebaseConfig);
export const database = getAuth(app)