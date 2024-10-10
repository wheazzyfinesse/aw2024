"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Heart, MessageCircle, X } from "lucide-react";
import { getAllMemories } from "@/lib/postmemory";

// Dummy data for photos (replace with actual data fetching in a real application)
// const photos = [
// 	{
// 		id: 1,
// 		src: "/placeholder.svg?height=400&width=600",
// 		alt: "Wedding photo 1",
// 		likes: 15,
// 		comments: [],
// 	},
// 	{
// 		id: 2,
// 		src: "/placeholder.svg?height=400&width=600",
// 		alt: "Wedding photo 2",
// 		likes: 20,
// 		comments: [],
// 	},
// 	{
// 		id: 3,
// 		src: "/placeholder.svg?height=400&width=600",
// 		alt: "Wedding photo 3",
// 		likes: 10,
// 		comments: [],
// 	},
// 	{
// 		id: 4,
// 		src: "/placeholder.svg?height=400&width=600",
// 		alt: "Wedding photo 4",
// 		likes: 25,
// 		comments: [],
// 	},
// 	{
// 		id: 5,
// 		src: "/placeholder.svg?height=400&width=600",
// 		alt: "Wedding photo 5",
// 		likes: 18,
// 		comments: [],
// 	},
// 	{
// 		id: 6,
// 		src: "/placeholder.svg?height=400&width=600",
// 		alt: "Wedding photo 6",
// 		likes: 22,
// 		comments: [],
// 	},
// ];

export default function GalleryPage() {
	const [selectedPhoto, setSelectedPhoto] = useState(null);
	const [photos, setPhotos] = useState([]);
	const [comment, setComment] = useState("");

	const handleLike = (id) => {
		// In a real app, you would update this in the backend
		console.log(`Liked photo with id: ${id}`);
	};

	const handleComment = (id) => {
		if (comment.trim()) {
			// In a real app, you would send this comment to the backend
			console.log(`New comment for photo ${id}: ${comment}`);
		}
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
				<h1 className="text-4xl font-bold text-center text-orange-800 mb-12">
					Wedding Photo Gallery
				</h1>
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
					{photos.map((photo) => (
						<div
							key={photo.id}
							className="bg-white rounded-lg shadow-md overflow-hidden"
						>
							<div className="relative h-64 sm:h-80">
								<Image
									src={photo.imageUrl}
									alt="wedding photo"
									layout="fill"
									objectFit="cover"
									className="cursor-pointer transition-transform duration-300 hover:scale-105"
									onClick={() => setSelectedPhoto(photo)}
								/>
							</div>
							<div className="p-4">
								<div className="flex justify-between items-center">
									<button
										onClick={() => handleLike(photo.id)}
										className="flex items-center text-gray-600 hover:text-red-500 transition-colors duration-300"
									>
										<Heart className="h-5 w-5 mr-1" />
										{/* <span>{photo.likes}</span> */}
										<span>6</span>
									</button>
									<button
										onClick={() => setSelectedPhoto(photo)}
										className="flex items-center text-gray-600 hover:text-blue-500 transition-colors duration-300"
									>
										<MessageCircle className="h-5 w-5 mr-1" />
										<span>12</span>
										{/* <span>{photo.comments.length}</span> */}
									</button>
								</div>
							</div>
						</div>
					))}
				</div>
			</div>

			{selectedPhoto && (
				<div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-50">
					<div className="bg-white rounded-lg max-w-3xl w-full overflow-hidden">
						<div className="relative">
							<Image
								src={selectedPhoto.imageUrl}
								alt="wedding photos"
								width={800}
								height={600}
								className="object-contain"
							/>
							<button
								onClick={() => setSelectedPhoto(null)}
								className="absolute top-2 right-2 text-white hover:text-orange-500 transition-colors duration-300"
							>
								<X className="h-8 w-8" />
							</button>
						</div>
						<div className="p-4">
							<div className="flex justify-between items-center mb-4">
								<button
									onClick={() => handleLike(selectedPhoto.id)}
									className="flex items-center text-gray-600 hover:text-red-500 transition-colors duration-300"
								>
									<Heart className="h-5 w-5 mr-1" />
									<span>6</span>
									{/* <span>{selectedPhoto.likes}</span> */}
								</button>
								<span className="text-gray-600">
									12 comments
									{/* {selectedPhoto.comments.length} comments */}
								</span>
							</div>
							<div className="mb-4 max-h-40 overflow-y-auto">
								{/* {selectedPhoto.comments.map((comment, index) => (
									<p key={index} className="text-gray-600 mb-2">
										{comment}
									</p>
								))} */}

								<p className="text-gray-600 mb-2">{comment}</p>
							</div>
							<div className="flex">
								<input
									type="text"
									value={comment}
									onChange={(e) => setComment(e.target.value)}
									placeholder="Add a comment..."
									className="flex-grow px-3 py-2 border rounded-l-md focus:outline-none focus:ring-2 focus:ring-orange-500"
								/>
								<button
									onClick={() => handleComment(selectedPhoto.id)}
									className="px-4 py-2 bg-orange-500 text-white rounded-r-md hover:bg-orange-600 transition-colors duration-300"
								>
									Post
								</button>
							</div>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}
