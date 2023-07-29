import { User } from '../users/user.interface';

export interface RegisterResult {
    status: any;
    message: string;
    user?: User;
    access_tocken:string;
}

export interface RegisterData {

    fname: string;
    lastname: string;
    email: string;
    password: string;
    password_confirmation:string;
    telephone:string;
}
