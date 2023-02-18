import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyDmQZMXBMLtwaVWubvnVkXK0iH8sZQgbIQ",
  authDomain: "financialcontroller-6c561.firebaseapp.com",
  projectId: "financialcontroller-6c561",
  storageBucket: "financialcontroller-6c561.appspot.com",
  messagingSenderId: "382232109506",
  appId: "1:382232109506:web:72114f5fb0a2af84b9765b"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export default app;