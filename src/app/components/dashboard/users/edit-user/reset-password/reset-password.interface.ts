export interface resetPasswordResult {
    status: any;
    message: string;
}

export interface resetPasswordData {
    oldPassword: string;
    newPassword: string;
    confirmPassword: string;
    
}