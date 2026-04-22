export interface Role {
    id: string;
    name: "INSTRUCTOR" | "ADMIN" | "SUPER ADMIN" | "STUDENT";
}

export interface UserInfo {
    id: string;
    name: string;
    email: string;
    status: "ACTIVE";
    image: string | null;
    createdAt: string;
    role: Role;
};