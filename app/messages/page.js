'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useSelector } from 'react-redux'
import { sendMessage } from '@/lib/message'

export default function SendMessage() {
    const { user } = useSelector(state => state.user)
    const router = useRouter()


    const handleSubmit = async (e) => {
        e.preventDefault()
        const formData = new FormData(e.target)
        const message = formData.get('message')
        try {
            const res = await sendMessage(message, user.id)
            console.log(res)
        } catch (error) {
            console.log(error.message)

        } router.push('/')
    }

    return (
        <div className="min-h-screen bg-orange-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
                <div className="md:flex">
                    <div className="p-8 w-full">
                        <div className="uppercase tracking-wide text-sm text-orange-500 font-semibold mb-1">Send Your Wishes</div>
                        <h1 className="block mt-1 text-lg leading-tight font-medium text-black mb-6">Message the Couple</h1>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                                    Your Name
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    value={user?.name}
                                    className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500`}
                                />
                            </div>

                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                    Your Email
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    value={user?.email}
                                    className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 `}
                                />
                            </div>

                            <div>
                                <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                                    Your Message
                                </label>
                                <textarea
                                    id="message"
                                    rows="4"
                                    name="message"
                                    className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 `}
                                ></textarea>
                            </div>

                            <div>
                                <button
                                    type="submit"
                                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
                                >
                                    Send Message
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}