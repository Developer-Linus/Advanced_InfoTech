import {
    Home,
    LayoutGrid,
    ShoppingCart,
    User,
    Heart,
    ChevronDown,
    LogIn,
} from 'lucide-react';

export const NavLinks = [
    {
        id: 1,
        name: 'Home',
        href: '/',
        icon: Home,
    },
    {
        id: 2,
        name: 'Shop',
        href: '/shop',
        icon: LayoutGrid,
    },
    {
        id: 3,
        name: 'Categories',
        href: '#',
        icon: null,              // no icon like "Home", but dropdown is shown
        submenu: [],             // fetched dynamically
        isDropdown: true,        // shows ChevronDown icon
    },
    {
        id: 4,
        name: 'Favorites',
        href: '/favorites',
        icon: Heart,
        badgeKey: 'favorites',
    },
    {
        id: 5,
        name: 'Cart',
        href: '/cart',
        icon: ShoppingCart,
        badgeKey: 'cart',
    },
    {
        id: 6,
        name: 'Account',
        href: '#',
        icon: User,
        submenu: [
            { name: 'Sign In', href: '/signin', icon: LogIn },
            { name: 'Register', href: '/register' },
        ],
        isDropdown: false,
    },
];
