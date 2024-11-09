import {initializeApp} from 'firebase/app'
import {getFirestore} from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyB1NFCvDtvajkcU9I_aNtaThhrMsZP2l1Y",
  authDomain: "react-demo-e5b81.firebaseapp.com",
  projectId: "react-demo-e5b81",
  storageBucket: "react-demo-e5b81.firebasestorage.app",
  messagingSenderId: "453572796034",
  appId: "1:453572796034:web:7417babe94547a08fbde9b",
  measurementId: "G-RF1T19JDB7"
};

initializeApp(firebaseConfig);

const db = getFirestore();

export {db}