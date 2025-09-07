import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'elasticbeanstalk-ap-northeast-2-975050238551.s3.ap-northeast-2.amazonaws.com',
                port: '',
                pathname: '/**'
            }
        ]
    },
    eslint: {
        ignoreDuringBuilds: false,
    },
};

export default nextConfig;
