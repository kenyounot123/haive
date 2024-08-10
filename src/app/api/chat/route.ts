import {NextRequest, NextResponse} from 'next/server' // Import NextResponse from Next.js for handling responses
import OpenAI from 'openai' // Import OpenAI library for interacting with the OpenAI API
import { Pinecone } from '@pinecone-database/pinecone'

// POST function to handle incoming requests
export async function POST(req: NextRequest) {
  const openai = new OpenAI({apiKey: process.env.OPENAI_API_KEY}) 
  const pinecone = new Pinecone({ apiKey: process.env.PINECONE_API_KEY || "" })
  const data = await req.json() // Parse the JSON body of the incoming request
  
  // Assuming you need to use the prompt in a system prompt or elsewhere
  const lastMessage = data[data.length - 1];
  const systemPrompt = lastMessage.prompt || "you are an assistant"; // Default system prompt if none provided
  const chatbotName: string = lastMessage.botname.toLowerCase()
  console.log(chatbotName)
  const rawQueryEmbedding = await openai.embeddings.create({
    input: lastMessage.content,
    model: "text-embedding-3-small",
  });

  const queryEmbedding = rawQueryEmbedding.data[0].embedding;

  const index = pinecone.index(chatbotName);
  const topMatches = await index.query({
    vector: queryEmbedding,
    topK: 10,
    includeMetadata: true 
  });

  const contexts = topMatches.matches.map((item: any) => item.metadata.text);

  const augmentedQuery = "\n" + contexts.slice(0, 10).join("\n\n-------\n\n") + "\n-------\n\n\n\n\nMY QUESTION:\n" + lastMessage.content;



  // Create a chat completion request to the OpenAI API
  const completion = await openai.chat.completions.create({
    messages: [{role: 'system', content: systemPrompt}, 
      { role: 'user', content: augmentedQuery }
    ], // Include the system prompt and user messages
    model: 'gpt-3.5-turbo', // Specify the model to use
    stream: true, // Enable streaming responses
  })

  // Create a ReadableStream to handle the streaming response
  const stream = new ReadableStream({
    async start(controller) {
      const encoder = new TextEncoder() // Create a TextEncoder to convert strings to Uint8Array
      try {
        // Iterate over the streamed chunks of the response
        for await (const chunk of completion) {
          const content = chunk.choices[0]?.delta?.content // Extract the content from the chunk
          if (content) {
            const text = encoder.encode(content) // Encode the content to Uint8Array
            controller.enqueue(text) // Enqueue the encoded text to the stream
          }
        }
      } catch (err) {
        controller.error(err) // Handle any errors that occur during streaming
      } finally {
        controller.close() // Close the stream when done
      }
    },
  })

  return new NextResponse(stream) // Return the stream as the response
}