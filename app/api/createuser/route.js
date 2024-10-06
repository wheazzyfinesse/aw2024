import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export const POST = async (req) => {
    const body = await req.json()
    const { email, name, password, image } = body;

    if (!email || !password) {
        return res.status(400).json({ error: 'Email and password are required' });
    }

    try {
        // Hash the password before saving
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user in the database
        const newUser = await prisma.user.create({
            data: {
                email,
                name,
                password: hashedPassword, // Store hashed password
                image
            },
        });
        console.log(newUser)

        // Return the created user as a response
        return NextResponse.json(newUser, { status: 201 });

    } catch (error) {
        console.error('Error creating user:', error);

        // Handle unique constraint error (e.g., email already exists)
        if (error.code === 'P2002') {
            return NextResponse.json("Email already exists", { status: 409 });
        }

        // General error handling
        return NextResponse.json({ error: 'User could not be created' }, { status: 500 });
    }
}
