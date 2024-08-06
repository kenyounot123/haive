import { Box, Typography } from "@mui/material"

interface HexagonProps {
  chatbotName: string
}
const Hexagon = ({chatbotName}: HexagonProps) => {
  return (
    <Box 
      sx={{display:"flex", justifyContent:"center", alignItems:"center", position:"relative", width: "104px", height: "60px", backgroundColor: "primary.main"}}
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
export default function ChatbotCard() {
  return (
    <Box sx={{display: "flex"}}>
      <Hexagon chatbotName={"ChefAI"}/>
      <Box sx={{p:3, border: '1px solid', borderColor: 'primary.main', borderRadius:3, backgroundColor:"black"}}>
        <Typography sx={{color: "white", fontSize:24}}>Chatbot for your culinary needs!</Typography>
      </Box>
    </Box>
  )
}