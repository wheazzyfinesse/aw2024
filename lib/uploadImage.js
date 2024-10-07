import { storage } from './firebase'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'


export const uploadImage = async (file) => {
    const storageRef = ref(storage, `uploads/${Date.now()}_${file.name}`);

    // Upload the file to Firebase Storage
    const response = await uploadBytes(storageRef, file);

    // Get the download URL
    const downloadURL = await getDownloadURL(storageRef);
    return downloadURL
}