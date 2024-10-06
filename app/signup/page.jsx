"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { FcGoogle } from "react-icons/fc";
import { googleSignupHandler, signupHandler } from "@/lib/signupActions";
import Image from "next/image";
import { CloudUpload } from "lucide-react";
import { auth } from "@/lib/firebase";
import toast from "react-hot-toast";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import Link from "next/link";
import { handleFileChange } from "@/lib/handleFileChange";
import { useDispatch, useSelector } from "react-redux";
import { setCredentials } from "@/redux/userSlice";

export default function SignUp() {
	const { user } = useSelector((state) => state.user);
	const dispatch = useDispatch();

	const router = useRouter();
	const avatar =
		"https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png";

	const [file, setFile] = useState(null);
	const [preview, setPreview] = useState(null);
	const [loading, setLoading] = useState(false);

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);
		const formData = new FormData(e.target);
		formData.append("file", file);
		const result = await signupHandler(formData);

		// Handle the response
		if (result.error) {
			toast.error(result.error);
			setLoading(false);
		} else {
			toast.success("User created successfully!");
			dispatch(setCredentials(result.user));
			setLoading(false);
			router.replace("/");
		}
	};

	const handleGoogleSubmit = async (e) => {
		e.preventDefault();
		const provider = new GoogleAuthProvider();

		setLoading(true);
		const result = await signInWithPopup(auth, provider);
		console.log(result.user.email);
		if (result) {
			const user = await googleSignupHandler({
				image: result.user.photoURL,
				email: result.user.email,
				name: result.user.displayName,
				provider: result.user.providerData[0].providerId,
			});
			// Handle the response
			if (user.error) {
				toast.error(user.error);
				setLoading(false);
			} else {
				toast.success("User created successfully using google!");
				dispatch(setCredentials(user.user));
				setLoading(false);
				router.replace("/");
			}
		}
	};
	useEffect(() => {
		console.log("User state:", user); // Debugging line
		if (user) {
			router.push("/");
		}
	}, [user, router]);

	return (
		<div className="max-w-md flex flex-col mx-auto justify-center h-screen">
			<h1 className="text-2xl text-center my-5">Sign up</h1>
			<form onSubmit={handleSubmit} className="space-y-4 ">
				<div className="flex items-center gap-4 justify-center">
					<Image src={preview || avatar} height={100} width={100} alt="image" />
					<div className="flex">
						<label
							htmlFor="file"
							className="p-4 flex items-center gap-3 text-white rounded-md bg-purple-800"
						>
							<CloudUpload color="yellow" /> Upload a profile photo
						</label>
						<input
							hidden
							id="file"
							type="file"
							name="file"
							onChange={(e) => handleFileChange(e, setFile, setPreview)}
						/>
					</div>
				</div>

				<input
					type="text"
					placeholder="Name"
					name="name"
					className="border p-2 w-full"
				/>
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
					{loading ? "Loading..." : "sign up"}
				</button>
			</form>
			<p className="text-center font-bold mt-4">OR</p>
			<button
				type="submit"
				className="flex gap-4 items-center p-4 w-full shadow-lg mt-4 justify-center rounded-md "
				onClick={handleGoogleSubmit}
			>
				<FcGoogle size={24} />
				Sign Up with Google
			</button>
			<div className="flex justify-end items-center p-2 gap-2 ">
				Already have an account?
				<Link href="/signin" className="hover:underline text-purple-900">
					Sign in
				</Link>
			</div>
		</div>
	);
}
