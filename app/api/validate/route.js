import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';


export async function POST(req) {
    try {
        const { email } = await req.json();

        if (!email) {
            return NextResponse.json({ error: 'Email is required' }, { status: 400 });
        }

        // Check if the user exists
        const user = await prisma.user.findUnique({
            where: { email },
        });

        if (user) {
            return NextResponse.json({ exists: true });
        } else {
            return NextResponse.json({ exists: false });
        }
    } catch (error) {
        console.error('Error checking user:', error);
        return NextResponse.json({ error: 'Error checking user' }, { status: 500 });
    }
}

