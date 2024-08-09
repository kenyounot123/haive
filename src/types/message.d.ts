export interface Message {
    role: "user" | "assistant";
    content: string;

    // we can add other relevant fields in the future
    // author: string;
    // metadata?: MessageMetadata;
    // created_at: Date;
}
export interface ChatHistory {
    chatHistory: Message[];
}
export interface MessageMetadata {
    [key: string]: any;
}