import Message from "@/types/message"

export interface Conversation {
  chatbotName: string,
  chatHistory: Message[], // This will be an array of Message Objects in the future
  title: string,
}