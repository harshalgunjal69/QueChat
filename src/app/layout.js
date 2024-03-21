import './globals.css';
import { Inter, Roboto_Mono } from 'next/font/google';
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/sonner';

const inter = Inter({
    subsets: ['latin'],
    display: 'swap',
    variable: '--font-inter',
});

const roboto_mono = Roboto_Mono({
    subsets: ['latin'],
    display: 'swap',
    variable: '--font-roboto-mono',
});

export const metadata = {
    title: 'QueChat - Your Own Chat App',
    description:
        'QueChat: Your all-in-one solution for real-time chat, video, and voice calls. Connect with anyone, anywhere, and stay in touch effortlessly.',
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body
                className={`${inter.variable} ${roboto_mono.variable} font-sans`}
            >
                <ThemeProvider attribute="class" defaultTheme="dark">
                    {children}
                    <Toaster richColors />
                </ThemeProvider>
            </body>
        </html>
    );
}
