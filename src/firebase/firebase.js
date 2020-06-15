import * as firebase from "firebase";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDbuBsVbn6XpYJt1r8VA1bXXPtSmspUJuI",
  authDomain: "event-apps-2cb4a.firebaseapp.com",
  databaseURL: "https://event-apps-2cb4a.firebaseio.com",
  projectId: "event-apps-2cb4a",
  storageBucket: "event-apps-2cb4a.appspot.com",
  messagingSenderId: "1098191449571",
  appId: "1:1098191449571:web:e6b0c0f7f8c23e9c0dc4d6",
};
const fb = {
  appInit: () => {
    if (!firebase.apps.length) {
      console.log("Inicjalizacja firebase app...");
      return firebase.initializeApp(firebaseConfig);
    }
  },
  dbInit: () => {
    console.log("Tworzenie Firestore...");
    return firebase.firestore();
  },
};

export default fb;
