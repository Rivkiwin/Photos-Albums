
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyClGzYErBSOw4r7zjsTZk_WQUq795KFm78",
  authDomain: "photo-album-1fe63.firebaseapp.com",
  projectId: "photo-album-1fe63",
  storageBucket: "photo-album-1fe63.appspot.com",
  messagingSenderId: "814038963380",
  appId: "1:814038963380:web:fb1b5e160b572bab2b33e1",
  measurementId: "G-HYFG4N8BGT"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

export default auth;