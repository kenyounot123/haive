import { Box, Typography } from "@mui/material";
import MessageOutlinedIcon from '@mui/icons-material/MessageOutlined';
import CallMadeOutlinedIcon from '@mui/icons-material/CallMadeOutlined';

export default function HistoryCard() {
  return (
    <Box sx={{mt:2, color: "white", display: "flex", justifyContent:"space-between"}} p={1} borderRadius={2} bgcolor={"secondary.main"}>
      <MessageOutlinedIcon/>
      {/* This should be the title of chat */}
      <Typography>UI / UX design for new era</Typography>
      <CallMadeOutlinedIcon/>
    </Box>
  )
}