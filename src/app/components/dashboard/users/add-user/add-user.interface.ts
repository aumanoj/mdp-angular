export interface UserResult {
    status: any;
    message: string;
    access_token?: string;
}

export interface CreateUser {
    companyID:BigInt,
    fname:string, 
    lname:string, 
    email:string, 
    countryCode?:string,
    telephone?:string, 
    timeZone?:string, 
    password?:string,
    empID?:BigInt,
    team?:string, 
    position?:string, 
    group?:string
}

export interface Position {
    id: number;
    name: string;

}

export interface Location {
    id: number;
    name: string;
    time_zone:string;
}

export interface Group {
    id: number;
    name: string;
}

export interface CountryCode {
    id: number;
    name: string;
}

export interface TimeZone{
    id: number;
    name: string;
}