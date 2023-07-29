export interface LocationResult {
    status: any;
    message: string;
    access_token?: string;
}

export interface createLocation {
    name: string;
    userid:BigInt[];
    companyID:BigInt;
    countryCode:string;
    telephone:string;
    timeZone:string;

}

export interface User {
    id: number;
    name: string;
    lastname: string;
    email: string;
    registerDate: string;
}

export interface CountryCode {
    id: number;
    name: string;
}

export interface TimeZone{
    id: number;
    name: string;
}