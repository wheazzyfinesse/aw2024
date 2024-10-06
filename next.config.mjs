/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ["firebasestorage.googleapis.com", "upload.wikimedia.org"], // Allow images from Firebase Storage
    },
};

export default nextConfig;
