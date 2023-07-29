export interface UserResult {
    status: any;
    message: string;
    access_token?: string;
}

export interface User {
    id: number;
    name: string;
    lastname: string;
    email: string;
    registerDate: string;
}
