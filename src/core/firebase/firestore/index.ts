import firebase from "firebase/compat/app";
import "firebase/compat/firestore"

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyC54e5R_ZL4NUMUC6Kz0YRhp4V3uEivmHw",
    authDomain: "cms-ticket-sale.firebaseapp.com",
    projectId: "cms-ticket-sale",
    storageBucket: "cms-ticket-sale.appspot.com",
    messagingSenderId: "677204468378",
    appId: "1:677204468378:web:0cafc1a67bc12273697523",
    measurementId: "G-RRR1H5N0KE"
};

const store = !firebase.apps.length 
  ? firebase.initializeApp(firebaseConfig).firestore()
  : firebase.app().firestore();

export default store