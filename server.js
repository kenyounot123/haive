const express = require('express');
const { OpenAI } = require('langchain/llms');
const { RetrievalQAChain } = require('langchain/chains');
const { SimpleRetriever } = require('langchain/retrievers');
const { SimpleChatHistory } = require('langchain/chains/chat_history');

const app = express();
const port = 3000;

app.use(express.json());

// Initialize OpenAI
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // Replace with your OpenAI API key
});

// Mock retrieval function
const simpleRetriever = new SimpleRetriever();

const chatHistory = new SimpleChatHistory();

const retrievalQAChain = new RetrievalQAChain({
  retriever: simpleRetriever,
  llm: openai,
  chatHistory: chatHistory,
});

app.post('/api/chat', async (req, res) => {
  try {
    const { messages } = req.body;
    const userMessage = messages[messages.length - 1].content;

    // Add the user message to chat history
    chatHistory.addMessage({ role: 'user', content: userMessage });

    // Get the response from the retrieval-augmented generation chain
    const response = await retrievalQAChain.run({
      query: userMessage,
    });

    // Add the assistant's response to chat history
    chatHistory.addMessage({ role: 'assistant', content: response });

    res.json({ content: response });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
