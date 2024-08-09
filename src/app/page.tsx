"use client";

import { Button } from "@mui/material";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/providers";
import { createExploreChatbot, createChatHistory } from "./action";

import HiveRounded from '@mui/icons-material/Hive';

export default function LandingPage() {
  const router = useRouter();
  const { user, signInWithGoogle } = useAuth();

  function handleSignIn() {
    signInWithGoogle().then(() => router.push("/explore"));
  }

  const handleCreateChatbot = async () => {
    try {
      await createExploreChatbot({name: "ChefAI", likes: 12, description: "Chatbot for your culinary needs"});
      alert('Chatbot created successfully!');
    } catch (error) {
      console.error('Error creating chatbot:', error);
      alert('Failed to create chatbot.');
    }
  }
  
  const handleCreateHistory = async () => {
    if (!user) {
      alert('Please sign in to create chat history.');
      return;
    }
    try {
      await createChatHistory(user, {
        title: "UI/UX Design for new era",
        chatbotName: "ChefAI",
        chatHistory: ["Hi", "Hi how can I help you today"],
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
      <div className="header">
        <div className="logo">
          <HiveRounded style={{ fontSize: 40 }} sx={{
            color: "primary.main"
          }}/>
          <div className="logo-text">
            <header>
              <h1>
                h<span className="highlight">AI</span>ve
              </h1>
            </header>
          </div>
        </div>
        <div>
          <a href="#" className="login-button">
            Login 
          </a>
          <button className="menu-button">Menu</button>
        </div>
      </div>

      <section className="main">
        <div>
          <h1 className="highlight">
            <span>Unlock the{" "}</span>
            <span>
              Ultimate <b className="highlight">AI</b>
            </span>
            <br className="line-break"></br>
            <span>
              <b className="highlight">Chatbot{" "}</b>
            </span>
            <span>Experience</span>
          </h1>
          <p style={{
            color: "white"
          }}>
            Discover the ultimate AI chatbot experience with Haive where expert{" "}
            <br />
            ChatBots provide instant, specialized insights just for you.
          </p>
          <a href="#" className="explore-button">
            Explore
          </a>
        </div>
      </section>
      <section>
        <div className="empty"></div>
      </section>
    </>
  );
}
