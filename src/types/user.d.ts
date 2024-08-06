// Google firebase UserImpl
export interface User {
    uid: string;
    displayName?: string;
    photoURL?: string;
    email?: string;
    
    metadata?: UserMetadata;
}

export interface UserMetadata {
    [key: string]: any;
}