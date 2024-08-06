export interface User {
    id: string;
    avatar?: string;
    email?: string;

    created_at?: Date;
    updated_at?: Date;
    name?: string;
    metadata?: UserMetadata;
}

export interface UserMetadata {
    [key: string]: any;
}