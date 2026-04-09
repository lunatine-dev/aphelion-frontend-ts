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
}

export type NavConfig = NavGroup[];
