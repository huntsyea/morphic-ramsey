/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        serverActions: {
            allowedOrigins: ['localhost:3000', '127.0.0.1:61055', '127.0.0.1:63555'],
        },
    },
};

export default nextConfig;
