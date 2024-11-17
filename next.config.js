/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'jakdxnwvgeluegarvyzf.supabase.co',
                port: '',
                pathname: '/storage/v1/object/public/img/**',
            }

        ],
    }
};

module.exports = nextConfig;
