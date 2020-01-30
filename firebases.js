import firebase from "firebase/app";
import "firebase/firestore"
// import "firebase/messaging"


const firebaseConfig = {
    apiKey: "AIzaSyDf1-HIaC5KcppamMQ6B-zY-dAu-vB0gv0",
    authDomain: "todo-e8d4f.firebaseapp.com",
    databaseURL: "https://todo-e8d4f.firebaseio.com",
    projectId: "todo-e8d4f",
    storageBucket: "todo-e8d4f.appspot.com",
    messagingSenderId: "1081656073632",
    appId: "1:1081656073632:web:5dd66809631bcc7bd118c5",
    measurementId: "G-JNL9NX1MYL"
};
// firebase.initializeApp(firebaseConfig);
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export const db = firebase.firestore();
