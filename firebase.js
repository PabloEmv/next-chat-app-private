import { initializeApp } from "firebase/app";
import { getAuth, updateProfile } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";

const firebaseConfig = {
  apiKey: "AIzaSyBS7z6v6RcV5kj_kY18EJ_UylmK8DbRO8E",
  authDomain: "chat-app-8f2a5.firebaseapp.com",
  projectId: "chat-app-8f2a5",
  storageBucket: "chat-app-8f2a5.appspot.com",
  messagingSenderId: "257517228784",
  appId: "1:257517228784:web:890f2dfb3f09854842e835",
  measurementId: "G-V9EYC8M1L8",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const storage = getStorage();
const db = getFirestore();
async function uploadFile(file) {
  const storageRef = ref(storage, v4());
  await uploadBytes(storageRef, file);
  const url = await getDownloadURL(storageRef);
  return url;
}
export { app, auth, storage, db, uploadFile, updateProfile };
