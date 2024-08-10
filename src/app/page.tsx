"use client";

import { Button, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/providers";
import Link from "next/link";
import Image from "next/image";

import HiveRounded from '@mui/icons-material/Hive';

export default function LandingPage() {
  const router = useRouter();
  const { user, signInWithGoogle } = useAuth();

  function handleSignIn() {
    signInWithGoogle().then(() => router.push("/explore"));
  }

  return (
    <>
      <nav className="navbar">
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
          <Button className="login-button" variant="outlined" sx={{ color: "white", display: { xs: 'none', sm: 'block' } }} onClick={handleSignIn}>
              Login
            </Button>
            <Button className="menu-button" variant="outlined" sx={{ color: "white", display: { xs: 'block', sm: 'none' } }}>
              Menu
            </Button>
          </div>
        </div>
      </nav>

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
        <div className="empty">
          <Image style={{width:"100%", height:"100%", borderRadius:"0.25em", objectFit: "fill"}} width={0} height={0} alt={"Chat bot"} src={"/chatbot-ai.gif"}></Image>
        </div>
      </section>
    </>
  );
}
