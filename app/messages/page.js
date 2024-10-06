"use client"
import { useState } from 'react';

export default function MessageCouple() {
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        await fetch('/api/messages', {
            method: 'POST',
            body: JSON.stringify({ content: message }),
            headers: { 'Content-Type': 'application/json' },
        });
    };

    return (
        <form onSubmit={handleSubmit}>
            <textarea
                placeholder="Your message to the couple"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
            ></textarea>
            <button type="submit">Send Message</button>
        </form>
    );
}
