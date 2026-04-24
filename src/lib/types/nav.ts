import { UserRole } from "./auth";

export interface NavItem {
    title: string;
    url: string;
    icon: any;
    isActive?: boolean;
    type?: "link" | "separator" | "header" | string;
    items?: NavItem[];
}

export interface NavGroup {
    title: string;
    items: NavItem[];
    roles?: UserRole[]; // Compare to defined user role. Authentication is done on backend anyway but this is to just visually hide private routes.
}

export type NavConfig = NavGroup[];
