import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCLGcdioI4Qg9mr7GdslYyQ4h7yjwDixig",
  authDomain: "bbs-react-1e80b.firebaseapp.com",
  projectId: "bbs-react-1e80b",
  storageBucket: "bbs-react-1e80b.appspot.com",
  messagingSenderId: "107458898076",
  appId: "1:107458898076:web:594c44e9ad54a17106e559",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
