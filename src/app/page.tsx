"use client";

import { Button } from "@mui/material";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/providers";
import { createExploreChatbot, createChatHistory } from "./action";


export default function LandingPage() {
  const router = useRouter();
  const { user, signInWithGoogle } = useAuth();

  function handleSignIn() {
    signInWithGoogle().then(() => router.push("/explore"));
  }

  const handleCreateChatbot = async () => {
    try {
      await createExploreChatbot("ChefAI", 12, "Chatbot for your culinary needs");
      alert('Chatbot created successfully!');
    } catch (error) {
      console.error('Error creating chatbot:', error);
      alert('Failed to create chatbot.');
    }
  }
  
  const handleCreateHistory = async () => {
    try {
      await createChatHistory(user, {
        chatbotName: "ChefAI",
        messages: ["Hi", "Hi how can I help you today"],
      })
      alert('Convo created successfully!');
    } catch (error) {
      console.error('Error creating Convo:', error);
      alert('Failed to create Convo.');
    }
  }


  return (
    <>
      <Button onClick={handleCreateHistory} variant="contained"> create History</Button>
      <Button onClick={handleCreateChatbot} variant="contained"> create chatbot</Button>
      <Button onClick={handleSignIn} variant="contained">
        Login
      </Button>
    </>
  );
}
