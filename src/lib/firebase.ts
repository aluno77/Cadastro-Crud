import firebase from "firebase/app";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD-dShUh4Fa35DR7mzKnUdaBLmbiemQO00",
  authDomain: "cadastro-01-5462d.firebaseapp.com",
  projectId: "cadastro-01-5462d",
  storageBucket: "cadastro-01-5462d.appspot.com",
  messagingSenderId: "540089774577",
  appId: "1:540089774577:web:1681466dd0e7f11ec61450",
};
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export default firebase;
