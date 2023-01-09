import {initializeApp, getApp, getApps} from "firebase/app"
import {getFirestore} from "firebase/firestore"
import {getStorage} from "firebase/storage"


const firebaseConfig = {
    apiKey: "AIzaSyDWyS4kUPXti1IuDbyHxuyyOkxaAIqZxs8",
    authDomain: "twitter-clone-5f654.firebaseapp.com",
    projectId: "twitter-clone-5f654",
    storageBucket: "twitter-clone-5f654.appspot.com",
    messagingSenderId: "402400033688",
    appId: "1:402400033688:web:6acb26a53d090c033cc9ed",
    measurementId: "G-YM4YTSS5EG"
  };

  // Initialize Firebase
  const app =!getApps().length ? initializeApp(firebaseConfig):getApp();
  const db = getFirestore();
  const storage = getStorage();

  export default app;
  export {db, storage};