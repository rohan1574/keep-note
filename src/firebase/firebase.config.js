import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCchQD_m_ZgTXFNMxugCF9voxv-2zkqwRo",
  authDomain: "guru-travell.firebaseapp.com",
  projectId: "guru-travell",
  storageBucket: "guru-travell.appspot.com",
  messagingSenderId: "691057337465",
  appId: "1:691057337465:web:4725ed2f291aeefd0c20a8"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export default auth