import { Box, Typography } from "@mui/material"
import EastIcon from '@mui/icons-material/East';
import WestIcon from '@mui/icons-material/West';
interface HexagonProps {
  chatbotName: string
}
interface ChatbotCardProps {
  reverse: boolean
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
export default function ChatbotCard({reverse=false}:ChatbotCardProps) {
  return (
    <>
      {reverse ? (
        <Box sx={{position:"relative"}}>
          <Box sx={{position: "absolute", right: 0, top: 0, transform: "translateY(-20px)"}}>
            <Hexagon chatbotName={"ChefAI"}/>
          </Box>
          {/* This is clickable */}
          <Box sx={{ p:1, border: '1px solid', borderColor: 'primary.main', borderRadius:3, backgroundColor:"black", maxWidth:"80%", mx:'auto', transition: 'background-color 0.3s ease', cursor: 'pointer',
            '&:hover': {
              backgroundColor: '#1E1E1E',
            },
          }}>
            <Typography sx={{color: "white", fontSize:24, textWrap:"wrap", maxWidth:"80%", ml:6}}>Chatbot for your culinary needs!</Typography>
            <Box sx={{display: "flex", justifyContent:"flex-start"}}>
              <WestIcon sx={{color: "primary.main"}}/>
            </Box>
          </Box>
        </Box>
      ) : (
      <Box sx={{position:"relative"}}>
        <Box sx={{position: "absolute", transform: "translateY(-20px)"}}>
          <Hexagon chatbotName={"ChefAI"}/>
        </Box>
        {/* This is clickable */}
        <Box sx={{ p:1, border: '1px solid', borderColor: 'primary.main', borderRadius:3, backgroundColor:"black", maxWidth:"80%", mx:'auto',transition: 'background-color 0.3s ease',cursor: 'pointer',
          '&:hover': {
            backgroundColor: '#1E1E1E',
          },
        }}>
          <Typography sx={{color: "white", fontSize:24, textWrap:"wrap", maxWidth:"80%", ml:8}}>Chatbot for your culinary needs!</Typography>
          <Box sx={{display: "flex", justifyContent:"flex-end"}}>
            <EastIcon sx={{color: "primary.main"}}/>
          </Box>
        </Box>
      </Box>
      )}
    </>
  )
}