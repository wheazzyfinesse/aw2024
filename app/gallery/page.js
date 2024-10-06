"use client"
import { storage } from '@/lib/firebase';
import { prisma } from '@/lib/prisma';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import Image from 'next/image';
import { useState } from 'react';

export default function PostPhoto() {
    const [file, setFile] = useState(null);
    const [preview, setPreview] = useState(null);
    const [isPublic, setIsPublic] = useState(true);

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            setFile(selectedFile);

            // Create a FileReader to generate a preview URL
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result); // Set the preview state
            };
            reader.readAsDataURL(selectedFile); // Read the file as a data URL
        } else {
            setFile(null);
            setPreview(null); // Clear the preview if no file is selected
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);

        try {
            const file = formData.get('file'); // Get the uploaded file
            const isPublic = formData.get('isPublic'); // Get the public/private flag

            if (!file) {
                console.log("No file");
            }

            // Create a storage reference
            const storageRef = ref(storage, `uploads/${Date.now()}_${file.name}`);


            // Upload the file to Firebase Storage
            const response = await uploadBytes(storageRef, file);


            // Get the download URL
            const downloadURL = await getDownloadURL(storageRef);
            console.log(downloadURL)
            const post = await prisma.post.create()
            return;
        } catch (error) {
            console.error(error);
            return;
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <Image src={preview ? preview : file ? file : ""} height={100} width={100} alt='image' />
            <input type="file" name="file" onChange={handleFileChange} required />
            <label htmlFor="isPublic">
                Public:
            </label>

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
