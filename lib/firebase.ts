import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBpV-nLHUw1EXC48_UCr07Er9Ay2QEB798",
  authDomain: "clone-test-224a6.firebaseapp.com",
  projectId: "clone-test-224a6",
  storageBucket: "clone-test-224a6.firebasestorage.app",
  messagingSenderId: "890268506306",
  appId: "1:890268506306:web:6d87d51a4f2f178dfc435b"
};

// Initialize Firebase
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
