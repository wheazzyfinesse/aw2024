export const handleFileChange = (e, setFile, setPreview) => {
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