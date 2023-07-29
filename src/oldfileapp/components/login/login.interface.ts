export interface LoginResult {
    status: any;
    message: string;
    access_token?: string;
}

export interface LoginData {
    email: string;
    password: string;
}
