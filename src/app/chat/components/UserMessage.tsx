"use client";

import { Typography, Box, Avatar } from "@mui/material";
import { HiveRounded } from "@mui/icons-material";
import { Message } from "@/types/message";
import { User } from "@/types/user";

export function UserMessage({
  message,
  user,
}: {
  message: Message; // TODO: replace string with Message type
  user: User;
}) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 1,
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
          gap: 1,
        }}
      >
        <Typography
          variant="caption"
          sx={{
            color: "white",
            fontWeight: "bold",
          }}
        >
          {user ? user.displayName : "Guest"}
        </Typography>
        {user ? 
          <Avatar
            sx={{
              backgroundColor: "black",
            }}
            src={user.photoURL}
            slotProps={{ img: { referrerPolicy: "no-referrer" } }}
          /> 
        : <HiveRounded
            sx={{
              color: "primary.main",
            }}
          />}
      </Box>
      <Box
        bgcolor={"primary.main"}
        color="black"
        sx={{
          p: 2,
          borderRadius: "15px",
        }}
      >
        {message.content}
      </Box>
    </Box>
  );
}
