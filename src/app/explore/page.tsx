'use client'
import { Typography, Box, Container, Stack, Button, CircularProgress } from "@mui/material";
import HistoryCard from "./components/HistoryCard";
import ChatbotCard from "./components/ChatbotCard";
import Link from "next/link";
import { useAuth } from "@/app/providers";
import { Key, useEffect, useState } from "react";
import LogoutButton from "./components/SignoutButton";
import { getAllExploreChatbots } from "../action";

const LoadingScreen = () => {
  return (
    <Box sx={{display: "flex", justifyContent:"center"}}>
      <CircularProgress color="primary" />
    </Box>
  );
};

export default function Explore() {
  const { user } = useAuth();
  const [chatBots, setChatbots] = useState<any>(null)
  const [loading, setLoading] = useState<boolean>(true)
  useEffect(() => {
    const fetchAllChatBots = async () => {
      try {
        const querySnapshot = await getAllExploreChatbots();
        const chatbotsData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setChatbots(chatbotsData);
      } catch (error) {
        console.error('Error fetching chatbots:', error);
        // You can set an error state here if you want to display an error message to the user
      } finally {
        setLoading(false);
      }
    }

    fetchAllChatBots()
  },[])
  return (
    <Container sx={{display: "flex", flexDirection:"column", maxWidth:"900px"}} maxWidth={false}>


      <Box sx={{flexGrow:1, p:2}}>
        <Box sx={{display: "flex", justifyContent:"space-between", alignItems:"flex-start"}}>
          <Typography sx={{mb:8, fontWeight: 'bold', color:"white"}} variant="h4">Explore</Typography>
          <LogoutButton/>
        </Box>

        <Stack spacing={8}>
          {/* Displays all chatbots */}
          {loading && <LoadingScreen/>}
          {!loading && chatBots && chatBots.map((chatbot: { id: string; likes: number; name: string; description: string }, index:number) => (
            <ChatbotCard key={chatbot.id} chatbotDescription={chatbot.description} chatbotLikes={chatbot.likes} chatbotName={chatbot.name} reverse={index % 2 ? true : false}/>
          ))}
        </Stack>
      </Box>


      <Box p={2}>
        <Box sx={{position:"relative"}}>
          <Box sx={{display: "flex", justifyContent:"space-between", alignItems:"center",filter: user ? 'none' : 'blur(8px)'}}>
            <Typography sx={{fontWeight: 'bold', color:"white"}} variant="h4">History</Typography>
            {/* Not sure where this should redirect to yet */}
            <Link href="/chat/chefai">
              <Typography sx={{fontWeight: 'light', color:"white", textDecoration: "underline"}}>See all</Typography>
            </Link>
          </Box>
          {/* This should be the user's chat history  */}
          <Box sx={{filter: user ? 'none' : 'blur(5px)'}}>
            <HistoryCard chatTitle="UI/UX Design for new era"/>
            <HistoryCard chatTitle="UI/UX Design for new era"/>
            <HistoryCard chatTitle="UI/UX Design for new era"/>
          </Box>
          {!user && (
            <Box
              sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                backgroundColor: "rgb(0,0, 0 / 50%)", // Optional: semi-transparent to indicate blocking
                zIndex: 99, // Ensure it is on top of other content
                display: 'flex',
                alignItems: 'center', // Center vertically
                justifyContent: 'center',
              }}
            > 
              <Box>
                <Typography color={"primary.main"} sx={{fontSize:24, mb:2}}>Log In To Access</Typography>
                <Button sx={{
                  fontSize: 32, // Increase font size
                  padding: '12px 32px', // Increase padding for height and width
                  borderRadius: "12px",
                  color: "white",
                }} variant="outlined">
                  Log In
                </Button>
              </Box>
            </Box>
          )}
        </Box>
      </Box>


    </Container>
  )
}