"use server"
import { signInWithEmailAndPassword } from "firebase/auth";
import { prisma } from "./prisma";
import { auth } from "./firebase";

export const googleSigninHandler = async (email) => {
    try {
        // Check if user already exists
        const user = await prisma.user.findUnique({
            where: { email },
        });

        if (!user) {
            return { error: "Invalid credentials! Please try again or create an account." }
        } else {

            return { user }
        }


    } catch (error) {
        console.error("Signin error:", error);
        return { error: error.message }

    }
};


export const signInHandler = async (email, password) => {
    try {
        // Check if user exists in your database
        const userExists = await prisma.user.findUnique({
            where: { email },
        });

        if (!userExists) {
            return { error: "Invalid credentials! Please try again or create an account." };
        }

        // If the user signed up via Google, direct them to sign in using Google
        if (userExists.password.includes("google.com")) {
            return { error: "This account was created using Google. Please sign in with Google." };
        }



        // If the password is valid, log the user in with Firebase Auth
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        if (user) {
            return { user: userExists }; // Return the authenticated user object
        } else {
            return { error: "Failed to sign in. Please try again." };
        }

    } catch (error) {
        console.error("Sign-in error:", error);

        // Handle specific Firebase error codes
        if (error.code === "auth/invalid-credential") {
            return { error: "Invalid credentials! Please try again." };
        }

        // Return a general error message for other errors
        return { error: "Something went wrong. Please try again later." };
    }
};