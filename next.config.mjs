/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["storage.googleapis.com", "mynu.s3.amazonaws.com"], // Add the domain here
  },
};

export default nextConfig;
