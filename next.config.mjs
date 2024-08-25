/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack: (config) => {
        config.resolve.alias = {
            ...config.resolve.alias,
            'plotly.js-dist': 'plotly.js',
        };
        return config;
    },
};

export default nextConfig;
