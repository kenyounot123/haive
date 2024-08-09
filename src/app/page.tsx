"use client";

import { Button } from "@mui/material";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/providers";
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
