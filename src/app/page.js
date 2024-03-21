'use client';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import withAuth from '@/lib/withAuth';
import { useRouter } from 'next/navigation';
import { signOut } from 'firebase/auth';
import { auth } from '@/lib/utils';
import { toast } from 'sonner';

function Home() {
    const [messages, setMessages] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const router = useRouter();

    const handleSendMessage = () => {
        // Logic to send the message to the server
        // You can use a WebSocket or an HTTP request to send the message
        // Update the 'messages' state with the new message
        setMessages([...messages, inputValue]);
        setInputValue('');
    };

    const handleLogout = () => {
        signOut(auth)
            .then(() => {
                // Sign-out successful.
                router.push('/login');
                toast.success('Signed out successfully');
            })
            .catch((error) => {
                // An error happened.
                toast.error('Error signing out');
                console.log(error);
            });
    };

    return (
        <div>
            <div>
                {/* Render the chat messages */}
                {messages.map((message, index) => (
                    <div key={index}>{message}</div>
                ))}
            </div>
            <div>
                {/* Input field for typing messages */}
                <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                />
                {/* Button to send the message */}
                <Button onClick={handleSendMessage}>Send</Button>
                <Button onClick={handleLogout}>Logout</Button>
            </div>
        </div>
    );
}

export default withAuth(Home);
