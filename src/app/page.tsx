"use client";

import { Button, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/providers";
import { createExploreChatbot, createChatHistory } from "./action";
import Link from "next/link";

import HiveRounded from '@mui/icons-material/Hive';

export default function LandingPage() {
  const router = useRouter();
  const { user, signInWithGoogle } = useAuth();

  function handleSignIn() {
    signInWithGoogle().then(() => router.push("/explore"));
  }

  return (
    <>
      <div className="header">
        <div className="logo">
          <HiveRounded style={{ fontSize: 40 }} sx={{
            color: "primary.main"
          }}/>
          <div className="logo-text">
            <header>
              <Typography variant="h3">
                h<span className="highlight">AI</span>ve
              </Typography>
            </header>
          </div>
        </div>
        <div>
          <Button className="login-button" variant="outlined" sx={{fontSize:20, color: "white"}} onClick={handleSignIn}>
            Login 
          </Button>
          <Button className="menu-button" variant="outlined" sx={{fontSize:20, color: "white"}}>
            Menu 
          </Button>
        </div>
      </div>

      <section className="main">
        <div>
          <h1 className="lp text-bold">
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
          <Link href={"/explore"}>
            <Button sx={{fontSize:24, mt:2, fontWeight:700}} variant="contained">
              Explore
            </Button>
          </Link>
        </div>
      </section>
      <section className="img-container">
        <div className="empty"></div>
      </section>
    </>
  );
}
