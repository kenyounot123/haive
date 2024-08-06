import { Typography, Box, Container, Stack } from "@mui/material";
import HistoryCard from "./components/HistoryCard";
import ChatbotCard from "./components/ChatbotCard";
export default function Explore() {
  return (
    <Container sx={{display: "flex", flexDirection:"column", height:"100vh", maxWidth:"900px"}} maxWidth={false}>
      <Box sx={{flexGrow:1, p:2}}>
        <Typography sx={{mb:8, fontWeight: 'bold', color:"white"}} variant="h4">Explore</Typography>

        <Stack spacing={8}>
          <ChatbotCard reverse={false}/>
          <ChatbotCard reverse={true}/>
          <ChatbotCard reverse={false}/>
        </Stack>
      </Box>




      <Box p={2}>
        <Box sx={{display: "flex", justifyContent:"space-between", alignItems:"center"}}>
          <Typography sx={{fontWeight: 'bold', color:"white"}} variant="h4">History</Typography>
          <Typography sx={{fontWeight: 'light', color:"white", textDecoration: "underline"}}>See all</Typography>
        </Box>
        {/* This should be the user's chat history  */}
        <HistoryCard/>
        <HistoryCard/>
        <HistoryCard/>
      </Box>
    </Container>
  )
}