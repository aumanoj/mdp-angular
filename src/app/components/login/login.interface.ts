export interface LoginResult {
    status: any;
    message: string;
    access_token?: string;
    user: any;
    company:any;
}

export interface LoginData {
    email: string;
    password: string;
}
