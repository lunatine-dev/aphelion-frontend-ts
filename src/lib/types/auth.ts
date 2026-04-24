export enum UserRole {
    User = "user",
    Admin = "admin",
    Dev = "dev",
}
export interface User {
    id: string;
    email: string;
    name: string;
    login: string;
    avatar: string;
    role: UserRole;
}
