"use server"
import { prisma } from "./prisma"

export const postMemory = async (post, imageUrl, isPrivate, location, userId) => {

    if (!imageUrl || !location || !userId) {
        return { error: "All fields are required." };
    }
    try {
        const memory = await prisma.post.create({
            data: {
                post,
                imageUrl,
                isPrivate,
                location,
                userId
            },
        })
        if (!memory) {
            return { error: "Failed to create memory." };
        } else {
            return memory;
        }
    } catch (error) {
        console.log(error.message)
        return { error: "error creating memory" }
    }

}

export const getMemory = async (memoryId) => { }
export const getAllMemories = async () => {
    try {
        const memory = await prisma.post.findMany()
        if (!memory) {
            return { error: "Failed to create memory." };
        } else {
            return memory;
        }
    } catch (error) {
        console.log(error.message)
        return { error: "error creating memory" }
    }
}