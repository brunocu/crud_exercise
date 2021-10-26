// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.1.2/firebase-app.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCoVkuIsWjL2sNiGyLKGJASt6IYNAumDrM",
  authDomain: "bcu-web-crud.firebaseapp.com",
  databaseURL: "https://bcu-web-crud-default-rtdb.firebaseio.com",
  projectId: "bcu-web-crud",
  storageBucket: "bcu-web-crud.appspot.com",
  messagingSenderId: "100741468789",
  appId: "1:100741468789:web:9b1fa4cd0d64b3a347de3c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;
