"use client"
import { useState } from 'react';

export default function SendGift() {
    const [amount, setAmount] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        await fetch('/api/gifts', {
            method: 'POST',
            body: JSON.stringify({ amount, message }),
            headers: { 'Content-Type': 'application/json' },
        });
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="number"
                placeholder="Amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                required
            />
            <textarea
                placeholder="Message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
            ></textarea>
            <button type="submit">Send Gift</button>
        </form>
    );
}
