export interface PositionResult {
    status: any;
    message: string;
    access_token?: string;
}

export interface editPosition {
    positionid: number;
    userid:BigInt[];
    companyID:BigInt;
    name: string;


}
export interface User {
    id: number;
    name: string;
    lastname: string;
    email: string;
    registerDate: string;
}
