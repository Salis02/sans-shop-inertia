import { InertiaLinkProps } from '@inertiajs/react';
import { LucideIcon } from 'lucide-react';

export interface Auth {
    user: User;
}

export interface BreadcrumbItem {
    title: string;
    href: string;
}

export interface NavGroup {
    title: string;
    items: NavItem[];
}

export interface NavItem {
    title: string;
    href: NonNullable<InertiaLinkProps['href']>;
    icon?: LucideIcon | null;
    isActive?: boolean;
}

export interface SharedData {
    name: string;
    quote: { message: string; author: string };
    auth: Auth;
    sidebarOpen: boolean;
    [key: string]: unknown;
}

export interface User {
    id: number;
    role_id: number;
    name: string;
    email: string;
    avatar?: string;
    email_verified_at: string | null;
    two_factor_enabled?: boolean;
    created_at: string;
    updated_at: string;
    [key: string]: unknown; // This allows for additional properties...
}

export interface Role {
    id: number;
    name: string;
    description?: string;
}

export interface Category {
    id: number;
    parent_id?: number;
    name: string;
    slug: string;
    description?: string;
    created_at: string;
    updated_at: string;
    parent?: Category;
    children?: Category[];
    products_count?: number;
}

export interface Product {
    uuid: string;
    category_id?: number;
    name: string;
    slug: string;
    description?: string;
    price: number;
    stock: number;
    sku: string;
    status: 'draft' | 'active' | 'archived';
    created_by: number;
    updated_by?: number;
    created_at: string;
    updated_at: string;
    category?: Category;
    images?: ProductImage[];
    primary_image?: ProductImage;
    formatted_price?: string;
}

export interface ProductImage {
    id: number;
    product_id: string;
    path: string;
    is_primary: boolean;
    created_at: string;
    updated_at: string;
}

export interface PaginatedData<T> {
    data: T[];
    current_page: number;
    from: number;
    to: number;
    total: number;
    per_page: number;
    last_page: number;
    links: {
        url: string | null;
        label: string;
        active: boolean;
    }[];
}

export interface PageProps {
    auth: {
        user: User;
    };
    flash?: {
        success?: string;
        error?: string;
    };
}