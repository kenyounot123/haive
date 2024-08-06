export interface Message {
    role: "user" | "assistant";
    content: string;
    author: string;
    
    metadata?: MessageMetadata;

    created_at: Date;
}

export interface MessageMetadata {
    [key: string]: any;
}