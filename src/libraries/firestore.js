import { initializeApp } from "firebase/app";
import { getFirestore, collection } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyCKtUBiSDl0WuQltAOmXkZSJNxDG_dc-vs",
  authDomain: "tenzies-d9016.firebaseapp.com",
  projectId: "tenzies-d9016",
  storageBucket: "tenzies-d9016.appspot.com",
  messagingSenderId: "164958233098",
  appId: "1:164958233098:web:df459b8647f11c2d29b5f3"
};


const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)
export const leaderboardCollection = collection(db, "leaderboard")