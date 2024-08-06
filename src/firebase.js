// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCMwUhcYx6DZm-EGCch3dvuCna1gRlGJZw",
    authDomain: "haive-dev.firebaseapp.com",
    projectId: "haive-dev",
    storageBucket: "haive-dev.appspot.com",
    messagingSenderId: "678396045050",
    appId: "1:678396045050:web:52c4f4cb39309729668b43"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Auth provider
const provider = new GoogleAuthProvider();

// whenever a user interacts with the provider, we force them to select an account
provider.setCustomParameters({   
  prompt : "select_account "
});

const db = getFirestore(app);
const auth = getAuth(app);

export { app, db, auth, provider };