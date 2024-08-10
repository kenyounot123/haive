"use client";

import {
  Typography,
  Box,
  Container,
  TextField,
  Button,
  Stack,
} from "@mui/material";
import { ArrowBackRounded, SendRounded } from "@mui/icons-material";
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { BotMessage } from "@/app/chat/components/BotMessage";
import { UserMessage } from "@/app/chat/components/UserMessage";
import { useAuth } from "@/app/providers";
import { OverlayScrollbarsComponent } from "overlayscrollbars-react";
import "overlayscrollbars/overlayscrollbars.css";
import { getDoc } from "firebase/firestore";
import {
  getChatbot,
  addMessageToHistory,
  getChatHistory,
  createChatHistory,
  moveMessagesToUserHistory,
} from "@/app/action";
import { Bot } from "@/types/bot";
import { Message } from "@/types/message";
import { Conversation } from "@/types/conversation";

const initialMessages: Message[] = [
  {
    role: "assistant",
    content:
      "Hi! How can I help you today?",
  },
];

export default function ChatPage({ params }: { params: { name: string } }) {
  const router = useRouter();
  const { user, signInWithGoogle, signOutUser } = useAuth();
  const [currentChatbot, setCurrentChatbot] = useState<Bot | null>(null);
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [message, setMessage] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const [currentPrompt, setCurrentPrompt] = useState("");
  useEffect(() => {
    const fetchCurrentChatbot = async () => {
      const botRef = await getChatbot(params.name);
      const prompt = botRef?.prompt;
      setCurrentChatbot(botRef);
      setCurrentPrompt(prompt || "");
      
    };
    const fetchChatHistory = async () => {
      if (user) {
        const chatbotData = await getChatHistory(user.uid, params.name);
        if (chatbotData) {
          setMessages(chatbotData.chatHistory || messages);
        } else {
          const conversation: Conversation = { 
            chatbotName: params.name,
            chatHistory: messages,
            title: params.name,
          };
          const docRef = await createChatHistory(user, conversation);
          
          const newDocSnap = await getDoc(docRef);
          const newDocData = newDocSnap.data();
          
          setMessages(newDocData?.chatHistory || messages);
        }
      }
    };
    const loadData = async () => {
      await fetchCurrentChatbot();
      if (user) {
        await fetchChatHistory();
      }
    };
    loadData();
  }, [user, params.name]);

  const scrollToBottom = () => {
    setTimeout(() => {
      (messagesEndRef.current as HTMLElement | null)?.scrollIntoView({
        behavior: "smooth",
      });
    }, 100);
  };

  const handleSignInSignOut = () => {
    if (user) {
      signOutUser();
      router.push("/explore");
    } else {
      signInWithGoogle().then((user) => {
        moveMessagesToUserHistory(user.uid, params.name, messages);
        router.refresh();
      });
    }
  };

  const sendMessage = async () => {
    if (!message.trim() || isLoading) return;
    setIsLoading(true);

    setMessage(""); // Clear the input field



    setMessages((messages) => [
      ...messages,
      { role: "user", content: message}, // Add the user's message to the chat
      { role: "assistant", content: "", liked: false }, // Add a placeholder for the assistant's response
    ]);

    // Problem with this is that it does not save the 
    if (user) {
      await addMessageToHistory(user.uid, params.name, {
        role: "user",
        content: message,
      });
    }

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          
        },
        body: JSON.stringify([...messages, { role: "user", content: message, prompt: currentPrompt,
          botname:params.name,
          
         }]),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();

      while (true) {
        const { done, value } = await (
          reader as ReadableStreamDefaultReader
        ).read();
        if (done) {
          if (user) {
            // end of stream, save last message to db
            const lastMessage = messages[messages.length - 1];
            await addMessageToHistory(user.uid, params.name, lastMessage);
          }
          break;
        }
        const text = decoder.decode(value, { stream: true });
        setMessages((messages) => {
          let lastMessage = messages[messages.length - 1];
          let otherMessages = messages.slice(0, messages.length - 1);
          return [
            ...otherMessages,
            { ...lastMessage, content: lastMessage.content + text },
          ];
        });
      }
    } catch (error) {
      console.error("Error:", error);
      setMessages((messages) => [
        ...messages,
        {
          role: "assistant",
          content:
            "I'm sorry, but I encountered an error. Please try again later.",
        },
      ]);
      if (user) {
        const lastMessage: Message = {
          role: "assistant",
          content:
            "I'm sorry, but I encountered an error. Please try again later.",
        };  
        // console.log(user.uid, params.name, lastMessage);
        await addMessageToHistory(user.uid, params.name, lastMessage);
      }
    }  finally {
        if (user) {
          // end of stream, save last message to db
          const lastMessage = messages[messages.length - 1];
          await addMessageToHistory(user.uid, params.name, lastMessage);
        }
    }

    setIsLoading(false);
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        maxWidth: "900px",
      }}
      maxWidth={false}
    >
      <Box
        component="nav"
        sx={{
          position: "relative",
          justifyContent: "center",
          alignItems: "center",
          display: "flex",
          py: 2,
          top: 0,
        }}
      >
        <ArrowBackRounded
          sx={{
            position: "absolute",
            left: 0,
            color: "white",
            fontSize: "30px",
            cursor: "pointer",
          }}
          onClick={() => router.push("/explore")}
        />
        <Typography sx={{ fontWeight: "bold", color: "white" }} variant="h5">
          {params.name.toUpperCase()}
        </Typography>
        <Button
          variant="outlined"
          sx={{
            position: "absolute",
            color: "white",
            right: 0,
          }}
          onClick={handleSignInSignOut}
        >
          {user ? "Logout" : "Sign In & Save"}
        </Button>
      </Box>

      <Stack
        direction={"column"}
        p={0}
        spacing={3}
        sx={{
          backgroundColor: "secondary.main",
          flexGrow: 1,
          overflowY: "auto",
          borderRadius: "10px",
          boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.75)",
        }}
      >
        <OverlayScrollbarsComponent defer>
          <Stack
            id="chat-box"
            direction={"column"}
            spacing={2}
            flexGrow={1}
            maxHeight="100%"
            sx={{
              p: 2,
            }}
          >
            {messages.map((message, index) => (
              <Box
                key={index}
                display="flex"
                justifyContent={
                  message.role === "assistant" ? "flex-start" : "flex-end"
                }
              >
                {message.role === "assistant" ? (
                  <BotMessage message={message} bot={currentChatbot} />
                ) : (
                  <UserMessage message={message} user={user} />
                )}
              </Box>
            ))}
            <div ref={messagesEndRef} />
          </Stack>
        </OverlayScrollbarsComponent>
      </Stack>

      <Box
        component={"form"}
        onSubmit={(e) => {
          e.preventDefault();
          sendMessage();
        }}
        sx={{
          display: "flex",
          gap: 1,
          py: 3,
        }}
      >
        <TextField
          fullWidth
          autoFocus
          minRows={1}
          variant="outlined"
          label="Ask anything..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          sx={{
            backgroundColor: "white",
            borderRadius: "10px",
            // "&:focus": {
            //   backgroundColor: "black",
            //   color: "white",
            // },
          }}
        />
        <Button
          variant="contained"
          onClick={sendMessage}
          sx={{
            backgroundColor: "primary.main",
            color: "black",
            borderRadius: "10px",
          }}
        >
          <SendRounded />
        </Button>
      </Box>
    </Container>
  );
}
