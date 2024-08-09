import { doc, setDoc, getDocs, collection, addDoc, increment, updateDoc, getDoc } from "firebase/firestore";
import { db } from "@/firebase";
import { User } from 'firebase/auth';
import { Conversation } from "@/types/conversation";
import { Message } from "@/types/message";
import { Bot } from "@/types/bot";

export async function saveUserToDatabase(user: User) {
  await setDoc(doc(db, "users", user.uid), {
    uid: user.uid,
    displayName: user.displayName,
    email: user.email,
    photoURL: user.photoURL
  }, { merge: true });
}
export async function getChatbot(name: string): Promise<Bot | null> {
  try {
    // Reference the document with the ID that matches the name parameter
    const chatbotDocRef = doc(db, 'chatbots', name);
    
    // Fetch the document
    const docSnapshot = await getDoc(chatbotDocRef);
    
    // Check if the document exists
    if (docSnapshot.exists()) {
      // Retrieve the document data
      const data = docSnapshot.data();
      // Ensure that the data matches the Bot type
      // You might want to add checks or default values if some fields can be missing
      const chatbot: Bot = {
        name: data.name,
        description: data.description,
        likes: data.likes || 0,
      };
      
      return chatbot;
    } else {
      console.log('No chatbot found with the specified ID');
      return null;
    }
  } catch (error) {
    console.error('Error fetching chatbot:', error);
    // Handle the error
    return null;
  }
}
export async function createExploreChatbot({name, likes, description}: Bot) {
  await setDoc(doc(db,"chatbots", name), {
    name: name,
    likes: likes,
    description: description,
  })
}
export async function getAllExploreChatbots() {
  const querySnapshot = await getDocs(collection(db, "chatbots"));
  return querySnapshot
}

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
export async function updateChatbotLikes(bot: Bot | null, like: boolean) {
  if (!bot) {
    console.log("Cannot find bot so cannot increment likes")
    return;
  }
  try {
    const chatbotRef = doc(db, 'chatbots', bot.name);
    const update = like ? increment(1) : increment(-1);
    await updateDoc(chatbotRef, {
      likes: update,
    });
  } catch (error) {
    console.error('Error updating likes:', error);
  }
}
export async function createMessage(message: Message) {
  try {
    await addDoc(collection(db,"messages"), message)
  } catch (error) {
    console.error('Error adding message:', error);
  }
}
export async function moveMessagesToUserHistory(userId: string) {
  try {
    // Reference the 'messages' collection
    const messagesCollectionRef = collection(db, 'messages');
    // Fetch all documents from the 'messages' collection
    const querySnapshot = await getDocs(messagesCollectionRef);
    // Reference to the user's 'history' subcollection
    const userHistoryCollectionRef = collection(doc(db, 'users', userId), 'history');
    // Iterate through each message document and move it to the user's 'history' subcollection
    for (const docSnapshot of querySnapshot.docs) {
      const messageData = docSnapshot.data() as Message;
      const messageId = docSnapshot.id;
      // Create a new document in the user's 'history' subcollection with the 'chatHistory' field
      await setDoc(doc(userHistoryCollectionRef, messageId), {
        chatHistory: messageData,
      });
    }
  } catch (error) {
    console.error('Error moving messages:', error);
    // Handle the error, e.g., show a message to the user
  }
}