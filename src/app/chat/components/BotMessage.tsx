"use client";

import {
  Typography,
  Box,
  Avatar,
} from "@mui/material";
import {
  HiveRounded,
} from "@mui/icons-material";
import { Message } from "@/types/message";
import { Bot } from "@/types/bot";
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import { Dispatch, SetStateAction } from 'react';

export function BotMessage({ 
  messageLiked,
  setMessageLiked,
  message, 
  bot 
}: { 
  messageLiked: boolean;
  setMessageLiked: Dispatch<SetStateAction<boolean>>;
  message: string; // TODO: replace string with Message type
  bot: Bot 
}) {

  const toggleLikeMessage = () => {
    messageLiked ? setMessageLiked(false) : setMessageLiked(true) 
  }
  return (
    <Box sx={{
      display: "flex",
      flexDirection: "column",
      gap: 1,
  }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1,
        }}
      >
        <Avatar
          sx={{
            backgroundColor: "black",
          }}
        >
          <HiveRounded
            sx={{
              color: "primary.main",
            }}
          />
        </Avatar>
        <Typography
          variant="caption"
          sx={{
            color: "white",
            fontWeight: "bold",
          }}
        >
          {/* TODO: replace with bot */}
          --ASSISTANT NAME-- 
        </Typography>
      </Box>
      <Box
        bgcolor={"white"}
        color="black"
        sx={{
          p: 2,
          borderRadius: "15px",
        }}
      >
        <Typography>{message}</Typography>
        <Box 
          sx={{display: "flex", justifyContent:"flex-end"}}
        >
          {message && <ThumbUpOffAltIcon onClick={toggleLikeMessage} sx={{transition: 'color 0.3s, transform 0.3s',
            color: messageLiked ? "primary.main" : "black",
            '&:hover': {
              color: "primary.main", // Change color on hover
              transform: 'scale(1.1)', // Slightly enlarge on hover
            }, }}/>}
        </Box>
      </Box>
    </Box>
  );
}
