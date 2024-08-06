"use client";

import { Typography, Box, Avatar } from "@mui/material";
import { HiveRounded } from "@mui/icons-material";
import { Message } from "@/app/types/message";
import { User } from "@/app/types/user";

export function UserMessage({
  message,
  user,
}: {
  message: string; // TODO: replace string with Message type
  user: User;
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
        <Typography
          variant="caption"
          sx={{
              color: "white",
              fontWeight: "bold",
            }}
        >
          {/* TODO: replace with bot */}
          --USER NAME--
        </Typography>
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
      </Box>
      <Box
        bgcolor={"primary.main"}
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
