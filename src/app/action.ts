import { doc, setDoc } from "firebase/firestore";
import { db } from "@/firebase";
import { User } from 'firebase/auth';

// On login create a user document to save to database
export async function saveUserToDatabase(user: User) {
  await setDoc(doc(db, "users", user.uid), {
    uid: user.uid,
    displayName: user.displayName,
    email: user.email,
    photoURL: user.photoURL
  }, { merge: true });
}