export interface Bot {
    id: number;
    name: string;
    description: string;

    icon?: string; // b64 encoded image
    model?: string; // bot model

    created_at: Date;
    updated_at: Date;
}