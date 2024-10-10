'use client'

import { useState } from 'react'
import { Calendar, Clock, MapPin } from 'lucide-react'

const events = [
    {
        id: 1,
        title: 'Welcome Dinner',
        date: '2024-06-14',
        time: '19:00',
        location: 'Sunset Restaurant, 123 Beach Road',
        description: 'Join us for a casual welcome dinner to kick off the wedding weekend!',
    },
    {
        id: 2,
        title: 'Wedding Ceremony',
        date: '2024-06-15',
        time: '16:00',
        location: 'Rosewood Garden, 456 Blossom Avenue',
        description: 'The main event! We invite you to witness our exchange of vows.',
    },
    {
        id: 3,
        title: 'Reception',
        date: '2024-06-15',
        time: '18:00',
        location: 'Grand Ballroom, Rosewood Hotel',
        description: 'Celebrate with us! Dinner, dancing, and merriment to follow the ceremony.',
    },
    {
        id: 4,
        title: 'Farewell Brunch',
        date: '2024-06-16',
        time: '11:00',
        location: 'Rosewood Hotel Restaurant',
        description: 'Before you depart, join us for a farewell brunch to wrap up the celebrations.',
    },
]

export default function EventsPage() {
    const [expandedEvent, setExpandedEvent] = useState(null)

    const toggleEventDetails = (id) => {
        setExpandedEvent(expandedEvent === id ? null : id)
    }

    return (
        <div className="min-h-screen bg-orange-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
                <h1 className="text-4xl font-bold text-center text-orange-800 mb-12">Wedding Events</h1>
                <div className="space-y-8">
                    {events.map((event) => (
                        <div key={event.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                            <div
                                className="p-6 cursor-pointer"
                                onClick={() => toggleEventDetails(event.id)}
                            >
                                <h2 className="text-2xl font-semibold text-orange-700 mb-2">{event.title}</h2>
                                <div className="flex items-center text-gray-600 mb-2">
                                    <Calendar className="h-5 w-5 mr-2" />
                                    <span>{new Date(event.date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
                                </div>
                                <div className="flex items-center text-gray-600 mb-2">
                                    <Clock className="h-5 w-5 mr-2" />
                                    <span>{event.time}</span>
                                </div>
                                <div className="flex items-center text-gray-600">
                                    <MapPin className="h-5 w-5 mr-2" />
                                    <span>{event.location}</span>
                                </div>
                            </div>
                            {expandedEvent === event.id && (
                                <div className="px-6 pb-6">
                                    <p className="text-gray-700">{event.description}</p>
                                    <button
                                        className="mt-4 px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600 transition duration-300"
                                        onClick={() => alert(`RSVP functionality for ${event.title} would go here!`)}
                                    >
                                        RSVP for this event
                                    </button>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}