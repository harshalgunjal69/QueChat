'use client';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

// This is the frontend of a fullstack realtime chat application

export default function Home() {
    const [messages, setMessages] = useState([]);
    const [inputValue, setInputValue] = useState('');

    const handleSendMessage = () => {
        // Logic to send the message to the server
        // You can use a WebSocket or an HTTP request to send the message
        // Update the 'messages' state with the new message
        setMessages([...messages, inputValue]);
        setInputValue('');
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
            </div>
        </div>
    );
}
