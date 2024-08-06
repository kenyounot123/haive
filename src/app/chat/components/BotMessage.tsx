"use client";

import { Typography, Box, Container, TextField, Button } from "@mui/material";
import { ArrowBackRounded, Send, SendRounded } from "@mui/icons-material";
import { useState } from "react";

export function BotMessage({ message }: { message: string }) {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "center",
        gap: 1,
        p: 1,
        borderRadius: 2,
        bgcolor: "primary.main",
        color: "white",
        mt: 2,
      }}
    >
      <Typography>{message}</Typography>
    </Box>
  );
}
