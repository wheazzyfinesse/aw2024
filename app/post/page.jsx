"use client";
import { storage } from "@/lib/firebase";
import { handleFileChange } from "@/lib/handleFileChange";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import Image from "next/image";
import { useState } from "react";

export default function PostPhoto() {
	const [file, setFile] = useState(null);
	const [preview, setPreview] = useState(null);
	const [isPublic, setIsPublic] = useState(true);

	const handleSubmit = async (e) => {
		e.preventDefault();

		const formData = new FormData(e.target);

		try {
			const file = formData.get("file"); // Get the uploaded file
			const isPublic = formData.get("isPublic"); // Get the public/private flag

			if (!file) {
				console.log("No file");
			}

			// Create a storage reference
			const storageRef = ref(storage, `uploads/${Date.now()}_${file.name}`);

			// Upload the file to Firebase Storage
			const response = await uploadBytes(storageRef, file);

			// Get the download URL
			const downloadURL = await getDownloadURL(storageRef);
			console.log(downloadURL);
			return;
		} catch (error) {
			console.error(error);
			return;
		}
	};

	return (
		<form onSubmit={handleSubmit}>
			<Image
				src={preview ? preview : file ? file : ""}
				height={100}
				width={100}
				alt="image"
			/>
			<input
				type="file"
				name="file"
				onChange={(e) => handleFileChange(e, setFile, setPreview)}
				required
			/>
			<label htmlFor="isPublic">Public:</label>

			<input
				type="checkbox"
				id="isPublic"
				name="isPublic"
				checked={isPublic}
				onChange={(e) => setIsPublic(e.target.checked)}
			/>
			<button type="submit">Upload</button>
		</form>
	);
}
