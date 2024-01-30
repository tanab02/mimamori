import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyCfkmnlHZcXbTr9w6rOep6ZhN17NC8l4Wk",
  authDomain: "mimamori-d1e84.firebaseapp.com",
  projectId: "mimamori-d1e84",
  storageBucket: "mimamori-d1e84.appspot.com",
  messagingSenderId: "308045487850",
  appId: "1:308045487850:web:c62e5083061e7556d44193",
  measurementId: "G-4JEYMJV9Z0",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;
