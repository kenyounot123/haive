import { doc, setDoc, getDocs, collection, addDoc, increment, updateDoc  } from "firebase/firestore";
import { db } from "@/firebase";
import { User } from 'firebase/auth';
import { Conversation } from "@/types/conversation";

export async function saveUserToDatabase(user: User) {
  await setDoc(doc(db, "users", user.uid), {
    uid: user.uid,
    displayName: user.displayName,
    email: user.email,
    photoURL: user.photoURL
  }, { merge: true });
}

export async function createExploreChatbot(chatbotName:string, likes:number, description:string, messages?:string) {
  await setDoc(doc(db,"chatbots", chatbotName), {
    name: chatbotName,
    likes: likes,
    description: description,
    ...(messages && { messages }),
  })
}

export async function getAllExploreChatbots() {
  const querySnapshot = await getDocs(collection(db, "chatbots"));
  return querySnapshot
}
// Create chat history for user 
// get reference to user doc
// get reference to that user's history collection 
// create a chathistory
export async function createChatHistory(user:User, conversation:Conversation) {
  const userRef = doc(db, 'users', user.uid)
  const historyCollectionRef = collection(userRef, 'history');
  await addDoc(historyCollectionRef, conversation)
}

export async function getAllChatHistories(user: User) {
  try {
    const userRef = doc(db, 'users', user.uid);
    const historyCollectionRef = collection(userRef, 'history');
    const querySnapshot = await getDocs(historyCollectionRef);
    return querySnapshot;
  } catch (error) {
    console.error('Error fetching chat histories:', error);
    throw new Error('Failed to fetch chat histories');
  }
}

export async function updateChatbotLikes(chatbotName: string, like: boolean) {
  try {
    const chatbotRef = doc(db, 'chatbots', chatbotName);
    const update = like ? increment(1) : increment(-1);
    await updateDoc(chatbotRef, {
      likes: update,
    });
  } catch (error) {
    console.error('Error updating likes:', error);
  }
}