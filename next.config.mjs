/** @type {import('next').NextConfig} */
const nextConfig = {
    // better-auth proxy
    async rewrites() {
        return [
            {
                // Explicitly map auth requests
                source: "/api/auth/:path*",
                destination: process.env.NEXT_PUBLIC_API_URL + "/api/auth/:path*",
            },
            {
                // Explicitly map v1 API requests
                source: "/api/v1/:path*",
                destination: process.env.NEXT_PUBLIC_API_URL + "/api/v1/:path*",
            },
        ]
    },
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "res.cloudinary.com",
            },
            {
                protocol: "https",
                hostname: "example.com",
            },
        ],
    },
}

export default nextConfig
