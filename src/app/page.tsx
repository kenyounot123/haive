"use client";

import { Button } from "@mui/material";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/providers";
import { createExploreChatbot, getAllExploreChatbots } from "./action";


export default function LandingPage() {
  const router = useRouter();
  const { user, signInWithGoogle } = useAuth();

  function handleSignIn() {
    signInWithGoogle().then(() => router.push("/explore"));
  }

  const handleCreateChatbot = async () => {
    try {
      await createExploreChatbot("ChefAI", 12);
      alert('Chatbot created successfully!');
    } catch (error) {
      console.error('Error creating chatbot:', error);
      alert('Failed to create chatbot.');
    }
  }


  return (
    <>
      <Button onClick={handleCreateChatbot} variant="contained"> create chatbot</Button>
      <Button onClick={handleSignIn} variant="contained">
        Login
      </Button>
    </>
  );
}
