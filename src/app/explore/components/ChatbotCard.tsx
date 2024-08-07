import { Box, Typography } from "@mui/material"
import EastIcon from '@mui/icons-material/East';
import WestIcon from '@mui/icons-material/West';
import Link from "next/link";
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';

interface HexagonProps {
  chatbotName: string,
  chatbotLikes: number,
}
interface ChatbotCardProps {
  reverse: boolean,
  chatbotName: string,
  chatbotLikes: number,
}
const Hexagon = ({chatbotName, chatbotLikes}: HexagonProps) => {
  return (
    <Box 
      sx={{display:"flex", flexDirection:"column", justifyContent:"center", alignItems:"center", position:"relative", width: "104px", height: "60px", backgroundColor: "primary.main"}}
    >
      <Box
      sx={{width: 0,
        height: 0,
        position:"absolute",
        top: 0,
        transform: "translateY(-29px)",
        borderBottom: '30px solid #FFCF00',
        borderLeft: '52px solid transparent',
        borderRight: '52px solid transparent',}}
      /> 
      <Typography sx={{fontWeight:"bold", fontSize:24}}>{chatbotName}</Typography>
      <Typography sx={{fontWeight:900, fontSize:24}}>
        {chatbotLikes}<ThumbUpAltIcon/>
      </Typography>
      <Box
      sx={{width: 0,
        height: 0,
        bottom: 0,
        position:"absolute",
        transform: "translateY(29px)",
        borderTop: '30px solid #FFCF00',
        borderLeft: '52px solid transparent',
        borderRight: '52px solid transparent',}}
      />
    </Box>
  )
}
export default function ChatbotCard({reverse=false, chatbotLikes, chatbotName}:ChatbotCardProps) {
  const iconStyles = {
    color: 'primary.main',
  };
  return (
    <>
      <Box sx={{position:"relative"}}>
        <Box sx={{
          position: "absolute",
          right: reverse ? 0 : undefined,
          top: reverse ? 0 : undefined,
          transform: "translateY(-20px)"
          }}>
          <Hexagon chatbotLikes={chatbotLikes} chatbotName={chatbotName}/>
        </Box>
        {/* This is clickable */}
 
        <Box sx={{ 
          p:1, 
          border: '1px solid', 
          borderColor: 'primary.main', 
          borderRadius:3, 
          backgroundColor:"black", 
          width:"80%", 
          mx:'auto', 
          transition: 'background-color 0.3s ease', 
          cursor: 'pointer',
          '&:hover': {
            backgroundColor: 'secondary.main',
          },
        }}>
          <Link href={"/chat"}>
            <Typography sx={{
              color: "white",
              fontSize:24,
              textWrap:"wrap",
              maxWidth:"80%",
              ml: {
                xs: reverse ? 4 : 8,
                lg: reverse ? 8 : 8
              }
              }}>Chatbot for your culinary needs!</Typography>
            <Box sx={{
              display: "flex",
              justifyContent: reverse ? 'flex-start' : 'flex-end'}}>
                {reverse ? <WestIcon sx={iconStyles} /> : <EastIcon sx={iconStyles} />}
            </Box>
          </Link>
        </Box>
      </Box>
    </>
  )
}