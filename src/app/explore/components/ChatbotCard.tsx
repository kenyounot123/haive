import { Box } from "@mui/material"
export default function ChatbotCard() {
  return (
    <Box 
      sx={{position:"relative", width: "104px", height: "60px", backgroundColor: "primary.main"}}
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
      > </Box>
      <Box
      sx={{width: 0,
        height: 0,
        bottom: 0,
        position:"absolute",
        transform: "translateY(29px)",
        borderTop: '30px solid #FFCF00',
        borderLeft: '52px solid transparent',
        borderRight: '52px solid transparent',}}
      > </Box>
    </Box>
  )
}