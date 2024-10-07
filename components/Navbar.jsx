"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { signOut } from "firebase/auth";
import toast from "react-hot-toast";
import { auth } from "@/lib/firebase";
import { removeCredentials } from "@/redux/userSlice";
import { usePathname } from "next/navigation";

export default function Navbar() {
	const [isOpen, setIsOpen] = useState(false);
	const { user } = useSelector((state) => state.user);
	const dispatch = useDispatch();
	const pathname = usePathname();

	const toggleMenu = () => {
		setIsOpen(!isOpen);
	};

	const avatar =
		"https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png";

	const signoutHandler = async () => {
		try {
			await signOut(auth);
			dispatch(removeCredentials());
			toast.success("You signed out successfully");
			// Optional: Redirect to a different page or update your UI
			window.location.href = "/signin";
		} catch (error) {
			console.error("Error signing out: ", error);
		}
	};

	return (
		<nav className="bg-white shadow-md sticky top-0 z-50 p-2">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="flex justify-between h-10">
					<Link href="/" className="flex-shrink-0 flex items-center">
						<span className="text-2xl font-bold text-orange-600">A&W2024</span>
					</Link>
					<div className="hidden sm:ml-6 sm:flex sm:space-x-8">
						{user && (
							<>
								<NavLink pathname={pathname} href="/post">
									Post
								</NavLink>
								<NavLink pathname={pathname} href="/gifts">
									Gift
								</NavLink>
								<NavLink pathname={pathname} href="/messages">
									Message
								</NavLink>
							</>
						)}
						<NavLink pathname={pathname} href="/gallery">
							Gallery
						</NavLink>
						<NavLink pathname={pathname} href="/events">
							Events
						</NavLink>
						<NavLink pathname={pathname} href="/info">
							Info
						</NavLink>
						{user ? (
							<div className="flex items-center gap-2">
								<img
									src={user?.image || avatar}
									className="h-8 w-8 rounded-full"
								/>
								<p className="text-sm">{user?.name}</p>
								<button
									className=" items-center p-2  border-b border-orange-500 text-sm font-medium text-gray-500 hover:bg-orange-700 hover:rounded-sm hover:text-white transition duration-150 ease-in-out"
									onClick={signoutHandler}
								>
									Sign out
								</button>
							</div>
						) : (
							<>
								<NavLink pathname={pathname} href="/signup">
									Sign Up
								</NavLink>
								<NavLink pathname={pathname} href="/signin">
									Sign In
								</NavLink>
							</>
						)}
					</div>
					<div className="-mr-2 flex items-center sm:hidden">
						{user && (
							<div className="flex items-center gap-2">
								<img src={user.image} className="h-8 w-8 rounded-full" />
								<p className="text-sm">{user.name}</p>
							</div>
						)}
						<button
							onClick={toggleMenu}
							className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-orange-500"
							aria-expanded="false"
						>
							<span className="sr-only">Open main menu</span>
							{isOpen ? (
								<X className="block h-6 w-6" aria-hidden="true" />
							) : (
								<Menu className="block h-6 w-6" aria-hidden="true" />
							)}
						</button>
					</div>
				</div>
			</div>

			{isOpen && (
				<div className="sm:hidden">
					<div className="pt-2 pb-3 space-y-1">
						{user && (
							<>
								<MobileNavLink pathname={pathname} href="/post">
									Post Memories
								</MobileNavLink>
								<MobileNavLink pathname={pathname} href="/gifts">
									Gifts
								</MobileNavLink>
								<MobileNavLink pathname={pathname} href="/messages">
									Message
								</MobileNavLink>
							</>
						)}
						<MobileNavLink pathname={pathname} href="/gallery">
							Gallery
						</MobileNavLink>

						<MobileNavLink pathname={pathname} href="/events">
							Events
						</MobileNavLink>
						<MobileNavLink pathname={pathname} href="/info">
							Info
						</MobileNavLink>

						{user ? (
							<button
								className="block pl-3 pr-4 py-2  bg-gray-200  text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-50 hover:border-orange-300 transition duration-150 ease-in-out"
								onClick={signoutHandler}
							>
								Sign out
							</button>
						) : (
							<>
								<MobileNavLink pathname={pathname} href="/signin">
									Sign In
								</MobileNavLink>
								<MobileNavLink pathname={pathname} href="/signup">
									Sign Up
								</MobileNavLink>
							</>
						)}
					</div>
				</div>
			)}
		</nav>
	);
}

function NavLink({ href, children, pathname }) {
	return (
		<Link
			href={href}
			className={`inline-flex items-center px-2 pt-1 border-b-2 border-transparent text-sm font-medium text-gray-500 hover:border-orange-300 hover:text-gray-700 transition duration-150 ease-in-out
				
				${pathname === href ? "bg-gray-200 border-b-2 border-orange-400" : ""}
				`}
		>
			{children}
		</Link>
	);
}

function MobileNavLink({ href, children, pathname }) {
	return (
		<Link
			href={href}
			className={`block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-50 hover:border-orange-300 transition duration-150 ease-in-out ${
				pathname === href ? "bg-gray-200 border-l-4 border-orange-400" : ""
			}`}
		>
			{children}
		</Link>
	);
}
