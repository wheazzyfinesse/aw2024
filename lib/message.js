"use server"

import { prisma } from "./prisma"

export const sendMessage = async (message, userId) => {
    try {
        const res = await prisma.message.create({
            data: {
                content: message,
                User: {
                    connect: { id: userId }, // Assuming you have a user with id '1'
                },
            },
        }); if (res) {
            return { res };
        } else {
            return { error: "Couldn't create message" }
        }

    } catch (error) {
        console.log(error)
        return { error }
    }

}
