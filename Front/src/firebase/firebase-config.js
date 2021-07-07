import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth'; 

const firebaseConfig = {
    apiKey: "AIzaSyBgxphrAKy00g4ee0dkJRVrf8vYZdeX7hM",
    authDomain: "predio-db.firebaseapp.com",
    projectId: "predio-db",
    storageBucket: "predio-db.appspot.com",
    messagingSenderId: "378253589324",
    appId: "1:378253589324:web:7d644b925c34e193beade9"
  };

  //Inicialización
  firebase.initializeApp(firebaseConfig);

  const db = firebase.firestore();

  export {
      db,
      firebase
  }