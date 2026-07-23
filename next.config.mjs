/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,
  experimental: {
    // Only lucide-react here: recharts' internal cross-file dependencies
    // are incompatible with this optimization and cause "Collecting page
    // data" failures (createContext errors) during static generation.
    optimizePackageImports: ["lucide-react"],
  },
};

export default nextConfig;
