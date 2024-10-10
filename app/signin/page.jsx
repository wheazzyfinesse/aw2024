"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { FcGoogle } from "react-icons/fc";
import Link from "next/link";
import { googleSigninHandler, signInHandler } from "@/lib/signinActions";
import toast from "react-hot-toast";
import { auth } from "@/lib/firebase";
import { setCredentials } from "@/redux/userSlice";
import { useDispatch, useSelector } from "react-redux";

export default function SignIn() {
	const { user } = useSelector((state) => state.user);
	const [loading, setLoading] = useState(false);
	const router = useRouter();
	const dispatch = useDispatch();

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);

		const formData = new FormData(e.target);
		const email = formData.get("email");
		const password = formData.get("password");
		try {
			if (!email || !password) {
				toast.error("All fields are required.");
				setLoading(false);
				return;
			}
			const user = await signInHandler(email, password);
			if (user.error) {
				toast.error(user.error);
				setLoading(false);
			} else {
				toast.success(`Nice to see you!`);
				dispatch(setCredentials(user.user));
				setLoading(false);
				router.replace("/");
			}
		} catch (error) {
			return toast.error(error.message);
		}
	};

	const handleGoogleSubmit = async (e) => {
		e.preventDefault();
		const provider = new GoogleAuthProvider();

		setLoading(true);

		try {
			const result = await signInWithPopup(auth, provider);
			if (result) {
				const user = await googleSigninHandler(result.user.email);
				if (user.error) {
					toast.error(user.error);
					setLoading(false);
				} else {
					toast.success(`Nice to see you ${result.user.displayName}!`);
					dispatch(setCredentials(user.user));

					setLoading(false);
					router.replace("/");
				}
			}
		} catch (error) {
			console.log(error.code);
			if (error.code === "auth/popup-closed-by-user")
				toast.error("sign in with google was cancelled");
		}
	};

	useEffect(() => {
		console.log("User state:", user); // Debugging line
		if (user) {
			router.push("/");
		}
	}, [user, router]);

	return (
		<div className="max-w-md p-4 flex flex-col mx-auto   mt-10">
			<h1 className="text-2xl text-center my-5">Sign In</h1>
			<form onSubmit={handleSubmit} className="space-y-4 ">
				<input
					type="email"
					placeholder="Email"
					name="email"
					className="border p-2 w-full"
				/>
				<input
					type="password"
					placeholder="Password"
					name="password"
					className="border p-2 w-full"
				/>
				<button
					disabled={loading}
					type="submit"
					className="bg-sunflower text-white w-full p-2"
				>
					Sign In
				</button>
			</form>
			<p className="text-center font-bold mt-4">OR</p>
			<button
				type="submit"
				className="flex gap-4 items-center p-4 w-full shadow-lg mt-4 justify-center rounded-md "
				onClick={handleGoogleSubmit}
			>
				<FcGoogle size={24} />
				Sign in with Google
			</button>
			<div className="flex justify-center items-center pt-4 gap-2 ">
				Don&apos;t have an account?
				<Link href="/signup" className="hover:underline text-purple-900">
					Sign up
				</Link>
			</div>
		</div>
	);
}
