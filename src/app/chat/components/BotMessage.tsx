"use client";

import {
  Typography,
  Box,
  Avatar,
} from "@mui/material";
import {
  HiveRounded,
} from "@mui/icons-material";
import { Message } from "@/app/types/message";
import { Bot } from "@/app/types/bot";

export function BotMessage({ 
  message, 
  bot 
}: { 
  message: string; // TODO: replace string with Message type
  bot: Bot 
}) {
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
        {message}
      </Box>
    </Box>
  );
}
