import { doc, setDoc, getDocs, collection } from "firebase/firestore";
import { db } from "@/firebase";
import { User } from 'firebase/auth';

// On login takes the user created from firebase auth during signInWithPopup,
// then save to database
export async function saveUserToDatabase(user: User) {
  await setDoc(doc(db, "users", user.uid), {
    uid: user.uid,
    displayName: user.displayName,
    email: user.email,
    photoURL: user.photoURL
  }, { merge: true });
}

export async function createExploreChatbot(chatbotName:string, likes:number) {
  await setDoc(doc(db,"chatbots", chatbotName), {
    name: chatbotName,
    likes: likes
  })
}

export async function getAllExploreChatbots() {
  const querySnapshot = await getDocs(collection(db, "chatbots"));
  // querySnapshot.forEach((doc) => {
  //   // doc.data() is never undefined for query doc snapshots
  //   console.log(doc.id, " => ", doc.data());
  // });
  return querySnapshot
}
export async function createChatHistory() {

}