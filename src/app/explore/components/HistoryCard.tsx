import { Box, Typography } from "@mui/material";
import MessageOutlinedIcon from '@mui/icons-material/MessageOutlined';
import CallMadeOutlinedIcon from '@mui/icons-material/CallMadeOutlined';
import Link from "next/link";

interface HistoryCardProps {
  chatTitle: string
}
export default function HistoryCard({chatTitle}: HistoryCardProps) {
  return (
    // update path to /chat/[id]
      <Link href={"/chat"}>
        <Box sx={{
          mt:2,
          color: "white",
          display: "flex",
          backgroundColor: "secondary.main",
          justifyContent:"space-between",
          p:1,
          borderRadius:2,
          transition: 'background-color 0.3s ease, color 0.3s ease',
          '&:hover': {
            backgroundColor: 'primary.main',
            color: 'black'
          }}}>
          <MessageOutlinedIcon/>
          {/* This should be the title of chat */}
          <Typography>{chatTitle}</Typography>
          <CallMadeOutlinedIcon/>
        </Box>
      </Link>
  )
}