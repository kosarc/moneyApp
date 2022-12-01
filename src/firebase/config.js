import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

//firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBsjQoqKYN2oOEAO_tKpTU3IhjX_DPe0vo",
  authDomain: "mymoney-9c9e1.firebaseapp.com",
  projectId: "mymoney-9c9e1",
  storageBucket: "mymoney-9c9e1.appspot.com",
  messagingSenderId: "989668116911",
  appId: "1:989668116911:web:5fafd1d7855a883364875a",
};

// init firebase
const app = initializeApp(firebaseConfig);

//init firebase auth
const auth = getAuth(app);

//init firestore
const db = getFirestore(app);

//exporting firebase function
export { db, auth };
