"use server"

import { prisma } from "./prisma"
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { auth, storage } from "./firebase";
import {
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signInWithPopup,
    GoogleAuthProvider,
} from "firebase/auth";

export const createUser = async (name, email, password, image, provider,) => {
    const user = await prisma.user.create({
        data: {
            name,
            email,
            password: provider ? provider : password,
            image
        },
    })
    if (user) {
        return { user }
    } else {
        return { error: "Failed to create user." }
    }
}
export const signupHandler = async (formData) => {
    const name = formData.get("name");
    const email = formData.get("email");
    const unhashedPassword = formData.get("password");
    const file = formData.get("file"); // Getting the file from formData

    try {
        // Validate fields
        if (!name || !email || !unhashedPassword) {
            return { error: "All fields are required." }
        }

        // Check if user already exists
        const userExists = await prisma.user.findUnique({
            where: { email },
        });
        if (userExists) {
            return { error: "User already exists! Please log in." }
        }
        const userCredential = await createUserWithEmailAndPassword(auth, email, unhashedPassword);
        // Handle file upload if there's a file
        let image = "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png" || userCredential.photoURL; // Default image

        if (file) {
            const storageRef = ref(storage, `uploads/${Date.now()}_${file.name}`);
            await uploadBytes(storageRef, file);
            image = await getDownloadURL(storageRef);
        }
        // Create user in the database
        if (userCredential) {
            const password = userCredential.user.reloadUserInfo.passwordHash
            const user = await createUser(
                name,
                email,
                password,
                image

            )
            if (user) {
                console.log({ user })
                return user
            } else {
                return { error: "Failed to create user." }
            }
        }



    } catch (error) {
        console.error("Signup error:", error);
        return { error: error.message }

    }
};


export const googleSignupHandler = async ({ image,
    email,
    name,
    provider, }) => {

    try {
        // Check if user already exists
        const userExists = await prisma.user.findUnique({
            where: { email },
        });
        if (userExists) {
            return { error: "User already exists! Please log in." }
        } else {
            // Create user in the database
            const user = await createUser(
                name,
                email,
                provider,
                image

            )
            if (user) {
                console.log(user)
                return user
            } else {
                return { error: "Failed to create user." }
            }

        }


    } catch (error) {
        console.error("Signup error:", error);
        return { error: error.message }

    }
};
