"use client";
import { useState, useEffect } from "react";
import { CalendarIcon, MapPinIcon, HeartIcon } from "lucide-react";
import Navbar from "@/components/Navbar";
import Image from "next/image";
import { loadUserFromLocalStorage } from "@/redux/userSlice";
import { useDispatch } from "react-redux";

export default function WeddingLandingPage() {
	const [days, setDays] = useState(0);
	const [hours, setHours] = useState(0);
	const [minutes, setMinutes] = useState(0);
	const [seconds, setSeconds] = useState(0);

	const dispatch = useDispatch();
	useEffect(() => {
		// loadUserFromLocalStorage(dispatch);
		const weddingDate = new Date("2024-12-21T16:00:00").getTime();

		const timer = setInterval(() => {
			const now = new Date().getTime();
			const difference = weddingDate - now;

			const d = Math.floor(difference / (1000 * 60 * 60 * 24));
			const h = Math.floor(
				(difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
			);
			const m = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
			const s = Math.floor((difference % (1000 * 60)) / 1000);

			setDays(d);
			setHours(h);
			setMinutes(m);
			setSeconds(s);

			if (difference < 0) {
				clearInterval(timer);
			}
		}, 1000);

		return () => clearInterval(timer);
	}, [dispatch]);

	return (
		<div className="min-h-screen bg-orange-50">
			<Navbar />
			{/* Hero Section */}
			<section className="relative h-screen flex items-center justify-center text-center text-white">
				{/* <Image
					width={800}
					height={800}
					src={user?.image || avatar}
					className="absolute inset-0 bg-cover bg-center z-0"
				/> */}
				<div className="absolute inset-0 bg-orange-900 opacity-60 z-10"></div>
				<div className="relative z-20">
					<h1 className="text-5xl md:text-7xl font-bold mb-4">Sarah & John</h1>
					<p className="text-xl md:text-2xl">We're getting married!</p>
				</div>
			</section>

			{/* Event Details */}
			<section className="py-20 bg-white">
				<div className="container mx-auto px-4">
					<h2 className="text-4xl font-bold text-center mb-12 text-orange-800">
						Our Special Day
					</h2>
					<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
						<div className="text-center">
							<CalendarIcon className="mx-auto h-12 w-12 text-orange-600 mb-4" />
							<h3 className="text-xl font-semibold mb-2 text-orange-800">
								Date & Time
							</h3>
							<p className="text-orange-700">June 15, 2024 at 4:00 PM</p>
						</div>
						<div className="text-center">
							<MapPinIcon className="mx-auto h-12 w-12 text-orange-600 mb-4" />
							<h3 className="text-xl font-semibold mb-2 text-orange-800">
								Location
							</h3>
							<p className="text-orange-700">
								Beautiful Gardens, 123 Wedding Lane, Love City
							</p>
						</div>
						<div className="text-center">
							<HeartIcon className="mx-auto h-12 w-12 text-orange-600 mb-4" />
							<h3 className="text-xl font-semibold mb-2 text-orange-800">
								Celebration
							</h3>
							<p className="text-orange-700">
								Join us for an evening of love, laughter, and dancing
							</p>
						</div>
					</div>
				</div>
			</section>

			{/* Countdown Timer */}
			<section className="py-20 bg-orange-100">
				<div className="container mx-auto px-4">
					<h2 className="text-4xl font-bold text-center mb-12 text-orange-800">
						Countdown to Our Big Day
					</h2>
					<div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
						<div className="bg-white p-6 rounded-lg shadow-md border-2 border-orange-200">
							<span className="block text-4xl font-bold text-orange-600">
								{days}
							</span>
							<span className="text-orange-700">Days</span>
						</div>
						<div className="bg-white p-6 rounded-lg shadow-md border-2 border-orange-200">
							<span className="block text-4xl font-bold text-orange-600">
								{hours}
							</span>
							<span className="text-orange-700">Hours</span>
						</div>
						<div className="bg-white p-6 rounded-lg shadow-md border-2 border-orange-200">
							<span className="block text-4xl font-bold text-orange-600">
								{minutes}
							</span>
							<span className="text-orange-700">Minutes</span>
						</div>
						<div className="bg-white p-6 rounded-lg shadow-md border-2 border-orange-200">
							<span className="block text-4xl font-bold text-orange-600">
								{seconds}
							</span>
							<span className="text-orange-700">Seconds</span>
						</div>
					</div>
				</div>
			</section>

			{/* RSVP Form */}
			<section className="py-20 bg-white">
				<div className="container mx-auto px-4 max-w-md">
					<h2 className="text-4xl font-bold text-center mb-12 text-orange-800">
						RSVP
					</h2>
					<form className="space-y-6">
						<div className="space-y-2">
							<label htmlFor="name" className="text-orange-700">
								Name
							</label>
							<input
								id="name"
								placeholder="Your full name"
								required
								className="border-orange-200 focus:border-orange-500 focus:ring-orange-500"
							/>
						</div>
						<div className="space-y-2">
							<label htmlFor="email" className="text-orange-700">
								Email
							</label>
							<input
								id="email"
								type="email"
								placeholder="Your email address"
								required
								className="border-orange-200 focus:border-orange-500 focus:ring-orange-500"
							/>
						</div>
						<div className="space-y-2">
							<label htmlFor="guests" className="text-orange-700">
								Number of Guests
							</label>
							<input
								id="guests"
								type="number"
								min="1"
								max="5"
								placeholder="Number of guests attending"
								required
								className="border-orange-200 focus:border-orange-500 focus:ring-orange-500"
							/>
						</div>
						<div className="space-y-2">
							<label htmlFor="message" className="text-orange-700">
								Message (Optional)
							</label>
							<textarea
								id="message"
								placeholder="Any special messages or dietary requirements?"
								className="border-orange-200 focus:border-orange-500 focus:ring-orange-500"
							/>
						</div>
						<button
							type="submit"
							className="w-full bg-orange-600 hover:bg-orange-700 text-white"
						>
							Send RSVP
						</button>
					</form>
				</div>
			</section>

			{/* Floral Divider */}
			<div className="py-12 bg-orange-50">
				<div className="container mx-auto px-4">
					<div className="flex items-center justify-center">
						<div className="h-0.5 bg-green-500 flex-grow"></div>
						<svg
							className="h-8 w-8 mx-4 text-green-500"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M12 6v6m0 0v6m0-6h6m-6 0H6"
							/>
						</svg>
						<div className="h-0.5 bg-green-500 flex-grow"></div>
					</div>
				</div>
			</div>

			{/* Footer */}
			<footer className="bg-orange-800 text-white py-8">
				<div className="container mx-auto px-4 text-center">
					<p>
						&copy; {new Date().getFullYear()} Sarah & John's Wedding. All rights
						reserved.
					</p>
					<div className="mt-4 flex justify-center space-x-4">
						<a
							href="#"
							className="text-orange-200 hover:text-white transition duration-300"
						>
							<svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
								<path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
							</svg>
						</a>
						<a
							href="#"
							className="text-orange-200 hover:text-white transition duration-300"
						>
							<svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
								<path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
							</svg>
						</a>
					</div>
				</div>
			</footer>
		</div>
	);
}
