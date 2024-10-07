"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Heart, MessageCircle, Share2, Download } from "lucide-react";
import { getAllMemories } from "@/lib/postmemory";

export default function GalleryPage() {
	const [photos, setPhotos] = useState([]);
	const [activePhoto, setActivePhoto] = useState(null);
	const [comment, setComment] = useState("");

	const handleLike = (id) => {
		setPhotos(
			photos.map((photo) =>
				photo.id === id ? { ...photo, likes: photo.likes + 1 } : photo,
			),
		);
	};

	const handleComment = (id) => {
		if (comment.trim()) {
			setPhotos(
				photos.map((photo) =>
					photo.id === id
						? { ...photo, comments: [...photo.comments, comment] }
						: photo,
				),
			);
			setComment("");
		}
	};

	const handleShare = (id) => {
		// In a real application, implement sharing functionality
		alert(`Sharing photo with id: ${id}`);
	};

	const handleDownload = (id) => {
		// In a real application, implement download functionality
		alert(`Downloading photo with id: ${id}`);
	};
	useEffect(() => {
		// Fetch photos from your API or database
		// Replace `initialPhotos` with your actual data
		const photos = async () => {
			const photos = await getAllMemories();
			setPhotos(photos);

			console.log(photos);
		};
		photos();
	}, []);

	return (
		<div className="min-h-screen bg-orange-50 py-12 px-4 sm:px-6 lg:px-8">
			<div className="max-w-7xl mx-auto">
				<h1 className="text-3xl font-bold text-center text-orange-800 mb-10">
					Wedding Photo Gallery
				</h1>
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
					{photos.map((photo) => (
						<div
							key={photo.id}
							className="bg-white rounded-lg shadow-md overflow-hidden"
						>
							<div className="">
								<Image
									src={photo.imageUrl}
									alt={photo.location + "" + "photo"}
									width={500}
									height={500}
									className="cursor-pointer"
									onClick={() => setActivePhoto(photo)}
								/>
							</div>
							<div className="p-4">
								<div className="flex justify-between items-center mb-4">
									<button
										onClick={() => handleLike(photo.id)}
										className="flex items-center text-gray-600 hover:text-red-500"
									>
										<Heart className="h-5 w-5 mr-1" />
										<span>{photo.likes}</span>
									</button>
									<button
										onClick={() => setActivePhoto(photo)}
										className="flex items-center text-gray-600 hover:text-blue-500"
									>
										<MessageCircle className="h-5 w-5 mr-1" />
										<span>{photo.comments?.length}</span>
									</button>
									<button
										onClick={() => handleShare(photo.id)}
										className="text-gray-600 hover:text-green-500"
									>
										<Share2 className="h-5 w-5" />
									</button>
									<button
										onClick={() => handleDownload(photo.id)}
										className="text-gray-600 hover:text-purple-500"
									>
										<Download className="h-5 w-5" />
									</button>
								</div>
								{activePhoto && activePhoto.id === photo.id && (
									<div className="mt-4">
										<h3 className="font-semibold mb-2">Comments</h3>
										{/* {photo.comments.map((comment, index) => (
											<p key={index} className="text-sm text-gray-600 mb-1">
												{comment}
											</p>
										))} */}
										<div className="mt-2 flex">
											<input
												type="text"
												value={comment}
												onChange={(e) => setComment(e.target.value)}
												placeholder="Add a comment..."
												className="flex-grow px-3 py-2 border rounded-l-md focus:outline-none focus:ring-2 focus:ring-orange-500"
											/>
											<button
												onClick={() => handleComment(photo.id)}
												className="px-4 py-2 bg-orange-500 text-white rounded-r-md hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500"
											>
												Post
											</button>
										</div>
									</div>
								)}
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}
