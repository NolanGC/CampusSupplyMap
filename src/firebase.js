
/*import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyD2ddIA5FwK2qhKcEpWBYuoEKedC0LKWEY",
    authDomain: "campussupply-ba45c.firebaseapp.com",
    projectId: "campussupply-ba45c",
    storageBucket: "campussupply-ba45c.appspot.com",
    messagingSenderId: "1122090575",
    appId: "1:1122090575:web:3be15818d25f600e7bf43a",
    measurementId: "G-6NBC6F47BP"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

export default db;*/
import { initializeApp } from 'firebase/app';
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyD2ddIA5FwK2qhKcEpWBYuoEKedC0LKWEY",
  authDomain: "campussupply-ba45c.firebaseapp.com",
  databaseURL: "https://campussupply-ba45c-default-rtdb.firebaseio.com/",
  projectId: "campussupply-ba45c",
  storageBucket: "campussupply-ba45c.appspot.com",
  messagingSenderId: "1122090575",
  appId: "1:1122090575:web:3be15818d25f600e7bf43a",
  measurementId: "G-6NBC6F47BP",
};

const app = initializeApp(firebaseConfig);

// Get a reference to the database service
const db = getDatabase(app);
export default db;
