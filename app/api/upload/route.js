
import { storage } from '@/lib/firebase';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { NextResponse } from 'next/server';

export const config = {
    api: {
        bodyParser: false, // Disable default body parsing
    },
};


export const POST = async (req) => {
    try {
        const formData = await req.formData(); // Parse form data
        const file = formData.get('file'); // Get the uploaded file
        const isPublic = formData.get('isPublic'); // Get the public/private flag

        if (!file) {
            return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
        }

        // Create a storage reference
        const storageRef = ref(storage, `uploads/${Date.now()}_${file.name}`);

        // Upload the file to Firebase Storage
        const response = await uploadBytes(storageRef, file);


        // Get the download URL
        const downloadURL = await getDownloadURL(storageRef);
        const deletePhoto = await deleteObject(storageRef, downloadURL)
        console.log(downloadURL)
        return NextResponse.json(downloadURL);
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error }, { status: 500 });
    }
};
