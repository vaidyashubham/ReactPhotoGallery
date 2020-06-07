import firebase from "firebase/app";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCvFbPN-2X8Q_o_Ktx4JtMRqs6CgG7kgtY",
  authDomain: "mygallery-5985c.firebaseapp.com",
  databaseURL: "https://mygallery-5985c.firebaseio.com",
  projectId: "mygallery-5985c",
  storageBucket: "mygallery-5985c.appspot.com",
  messagingSenderId: "35877763192",
  appId: "1:35877763192:web:fa9bcc3f3b09101998958d",
  measurementId: "G-PDY1KF9SMT"
};

firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();

export { storage, firebase as default };
