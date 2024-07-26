import { initializeApp, getApps, getApp, FirebaseApp } from "firebase/app";
import { Firestore, getFirestore } from "firebase/firestore";
import { FirebaseStorage, getStorage } from "firebase/storage";
import { Auth, getAuth, GoogleAuthProvider } from "firebase/auth";

if (
    !import.meta.env.VITE_FIREBASE_API_KEY ||
    !import.meta.env.VITE_FIREBASE_AUTH_DOMAIN ||
    !import.meta.env.VITE_FIREBASE_PROJECT_ID ||
    !import.meta.env.VITE_FIREBASE_STORAGE_BUCKET ||
    !import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID ||
    !import.meta.env.VITE_FIREBASE_APP_ID
) {
    throw new Error("Missing Firebase environment variables");
}

const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID,
} as const;

let app: FirebaseApp;
if (!getApps().length) {
    app = initializeApp(firebaseConfig);
} else {
    app = getApp();
}

const db: Firestore = getFirestore(app);
const storage: FirebaseStorage = getStorage(app);
const auth: Auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { db, storage, auth, provider };
