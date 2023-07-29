export interface GroupResult {
    status: any;
    message: string;
    access_token?: string;
}

export interface Group {
    group_users: any;
    id: number;
    name: string;
}