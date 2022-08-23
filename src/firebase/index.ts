import { FIREBASE_PROJECT_ID } from "../config";
import admin from "firebase-admin";

admin.initializeApp({
  credential: admin.credential.cert(__dirname + "\\..\\..\\firebase-cert.json"),
  storageBucket: `${FIREBASE_PROJECT_ID}.appspot.com`,
});

export const firebase = admin;
