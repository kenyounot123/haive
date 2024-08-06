import { Typography, Box, Container } from "@mui/material";
import HistoryCard from "./components/HistoryCard";
import ChatbotCard from "./components/ChatbotCard";
export default function Explore() {
  return (
    <Container sx={{display: "flex", flexDirection:"column", height:"100vh"}}>
      <Box sx={{flexGrow:1}}>
        <Typography sx={{fontWeight: 'bold', color:"white"}} variant="h3">Explore</Typography>
        <ChatbotCard/>
      </Box>




      <Box mb={2}>
        <Box sx={{display: "flex", justifyContent:"space-between", alignItems:"center"}}>
          <Typography sx={{fontWeight: 'bold', color:"white"}} variant="h3">History</Typography>
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