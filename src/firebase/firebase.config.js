// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfiguration = {
  apiKey: import.meta.env.VITE_apiKey,
  authDomain: import.meta.env.VITE_authDomain,
  projectId: import.meta.env.VITE_projectId,
  storageBucket: import.meta.env.VITE_storageBucket,
  messagingSenderId: import.meta.env.VITE_messagingSenderId,
  appId: import.meta.env.VITE_appId,
};
// const firebaseConfig = {
//   apiKey: "AIzaSyCuPT166OwGCUYpQ5Jfx_aYH5lwYagr_PU",
//   authDomain: "todo-client-bef17.firebaseapp.com",
//   projectId: "todo-client-bef17",
//   storageBucket: "todo-client-bef17.firebasestorage.app",
//   messagingSenderId: "1079107827473",
//   appId: "1:1079107827473:web:eff0fd227528022e50beb0",
// };
// Initialize Firebase
const app = initializeApp(firebaseConfiguration);
export const auth = getAuth(app);
