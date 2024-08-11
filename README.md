# Haive - AI Chatbot Platform

Welcome to the Haive, the ultimate AI chatbot platform, a web application where you can explore and interact with a variety of specialized AI chatbots. Each chatbot is tailored to a specific field, such as cooking or fitness, and utilizes Retrieval-Augmented Generation (RAG) for enhanced conversational capabilities.

[Visit Live Here](http://34.228.30.176:3000/)
## Features

- **Specialized Chatbots**: Browse and interact with chatbots specialized in various fields (e.g., ChefAI for cooking, FitnessAI for fitness).
- **Retrieval-Augmented Generation (RAG)**: Provides enhanced conversational abilities by combining retrieval of relevant information with text generation.
- **Chat History**: View and manage chat history if logged in.
- **User Authentication**: Secure sign-in and session management.
- **Modern UI**: Built with Next.js, React, and MUI for a seamless user experience.

## Tech Stack

- **Frontend**: Next.js, React, MUI
- **Backend**: Next.js API routes, Express.js
- **AI Logic**: Pinecone, OpenAI API
- **Deployment**: AWS EC2

## Future updates
- Adding proper authentication in request headers.
- Fix error where users can just type in a name in /chat/\[name\] route and that would work when it is not supposed to