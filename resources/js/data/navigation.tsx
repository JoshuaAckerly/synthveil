export interface NavigationItem {
    name: string;
    href: string;
}

const navigation: NavigationItem[] = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Music', href: '/music' },
    { name: 'Events', href: '/events' },
    { name: 'Contact', href: '/contact' },
    { name: 'Login', href: 'http://localhost:8007/login' },
];

const adminNavigation: NavigationItem[] = [{ name: 'Admin', href: '/admin' }];

export default navigation;
export { adminNavigation };
