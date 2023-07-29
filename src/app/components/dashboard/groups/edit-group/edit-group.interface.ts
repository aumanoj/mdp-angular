export interface GroupResult {
    status: any;
    message: string;
    access_token?: string;
}

export interface editGroup {
    groupid:BigInt;
    name: string;
    userid:BigInt[];
    companyID:BigInt;
   

}

export interface User {
    id: number;
    name: string;
    lastname: string;
    email: string;
    registerDate: string;
}