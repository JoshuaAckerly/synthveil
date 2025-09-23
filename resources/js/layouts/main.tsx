import Footer from '@/components/footer';
import Header from '@/components/header';
import React from 'react';

const Main: React.FC<React.PropsWithChildren> = ({ children }) => (
    <div>
        <Header />
        <main>{children}</main>
        <Footer />
    </div>
);

export default Main;
