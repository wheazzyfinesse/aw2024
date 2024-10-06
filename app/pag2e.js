"use client";
import { useEffect } from "react"
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";

export default function Dashboard() {
	const { user } = useSelector((state) => state.user);
	const router = useRouter();
	useEffect(() => {
		console.log("User state:", user); // Debugging line
		if (!user) {
			router.push("/signin");
		}
	}, [user, router]);

	// While waiting for user state, show loading message
	if (!user) {
		return <p>Loading...</p>; // This can be improved with a spinner or loading animation
	}
	return (
		<div>
			<h1>Welcome, </h1>
			<p>You are logged in!</p>
			<div>
				<h1>Welcome to Our Wedding!</h1>
				<p>We are so excited to celebrate with you!</p>
				<nav>
					<ul>
						<li>
							<a href="/gallery">Post Photos</a>
						</li>
						<li>
							<a href="/gifts">Send Gifts</a>
						</li>
						<li>
							<a href="/messages">Message the Couple</a>
						</li>
						<li>
							<a href="/events">Events</a>
						</li>
						<li>
							<a href="/info">Info</a>
						</li>
						<li>
							<a href="/signup">signup</a>
						</li>
						<li>
							<a href="/signin">signin</a>
						</li>
					</ul>
				</nav>
			</div>
		</div>
	);
}
