import './globals.css';
import Header from '@/components/header';
import { MessagesProvider } from '@/contexts/messages.js';
import { Toaster } from '@/components/ui/toaster';

export const metadata = {
    title: 'Create Next App',
    description: 'Generated by create next app',
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <MessagesProvider>
                <body className={`antialiased`}>
                    <Header />
                    {children}
                    <Toaster />
                </body>
            </MessagesProvider>
        </html>
    );
}
