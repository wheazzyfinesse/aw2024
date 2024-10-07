"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { handleFileChange } from "@/lib/handleFileChange";
import { CloudUpload } from "lucide-react";
import Image from "next/image";
import { uploadImage } from "@/lib/uploadImage";
import { useSelector } from "react-redux";
import { postMemory } from "@/lib/postmemory";
import toast from "react-hot-toast";

export default function PostPhotos() {
	const { user } = useSelector((state) => state.user);
	const [file, setFile] = useState(null);
	const [preview, setPreview] = useState(null);
	const router = useRouter();

	const handleSubmit = async (e) => {
		e.preventDefault();
		const formData = new FormData(e.target);
		const post = formData.get("post");
		let isPrivate = formData.get("isPrivate");
		const location = formData.get("location");
		const userId = user?.id;
		isPrivate = isPrivate === "on" ? true : false;

		if (!post || !isPrivate || !location || !userId) {
			alert("All fields are required.");
			return;
		}
		const imageUrl = await uploadImage(file);
		console.log(post, isPrivate, location, userId, imageUrl);

		const memory = await postMemory(
			post,
			imageUrl,
			isPrivate,
			location,
			userId,
		);
		if (memory.error) {
			toast.error(memory.error);
			return;
		} else {
			toast.success("Memory has been created successfully.");
			router.push("/gallery");
			console.log(memory);

			return;
		}
	};

	return (
		<div className="min-h-screen bg-orange-50 py-12 px-4 sm:px-6 lg:px-8">
			<div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
				<div className="md:flex">
					<div className="p-8 w-full">
						<div className="uppercase tracking-wide text-center text-sm text-orange-500 font-semibold mb-1">
							Share Your Moments and memories with us!
						</div>

						{preview && (
							<div className="items-center flex justify-center m-4">
								<Image
									width={200}
									height={200}
									src={preview}
									alt="image Preview"
									className="max-w-full rounded-lg"
								/>
							</div>
						)}
						<form onSubmit={handleSubmit} className="mt-6">
							<div className="flex items-center justify-center">
								<label
									htmlFor="file"
									className="p-2 w-full justify-center flex items-center gap-3 text-white rounded-md bg-purple-800"
								>
									<CloudUpload color="yellow" />{" "}
									{preview ? "Change photo" : "Select Photo"}
								</label>
								<input
									hidden
									id="file"
									type="file"
									name="file"
									onChange={(e) => handleFileChange(e, setFile, setPreview)}
								/>
							</div>

							<div className="my-4">
								<label
									className="block text-gray-700 text-sm font-bold mb-2"
									htmlFor="post"
								></label>
								<textarea
									id="post"
									name="post"
									className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
									rows="3"
									placeholder="Add a message to your photo"
								></textarea>
							</div>
							<div className="mb-4 flex flex-col">
								<label className="inline-flex items-center">
									<input
										type="checkbox"
										className="form-radio"
										name="isPrivate"
									/>
									<span className="ml-2">Private</span>
								</label>
								<span className="text-orange-500">
									NB: Just for you and the couple
								</span>
							</div>
							<div className="mb-4 flex items-center gap-2">
								<label className="flex items-center gap-1">
									<input type="radio" name="location" value="RECEPTION" />
									Reception
								</label>
								<br />

								<label className="flex items-center gap-1">
									<input type="radio" name="location" value="AFTERPARTY" />
									Afterparty
								</label>
								<br />
								<label className="flex items-center gap-1">
									<input type="radio" name="location" value="BRIDAL_SHOWER" />
									Bridal Shower
								</label>
								<br />
								<label className="flex items-center gap-1">
									<input type="radio" name="location" value="CEREMONY" />
									Ceremony
								</label>
								<br />
							</div>

							<div className="flex items-center justify-between">
								<button
									type="submit"
									className="bg-orange-500 hover:bg-orange-700 mt-2 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full justify-center flex items-center"
								>
									Upload Photo
								</button>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
}
