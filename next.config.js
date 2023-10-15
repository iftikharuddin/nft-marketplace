/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ["nftmarketplace-solidity.infura-ipfs.io", "infura-ipfs.io"],
        formats: ["image/webp"],
    },
    webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
        config.externals.push({
            'utf-8-validate': 'commonjs utf-8-validate',
            'bufferutil': 'commonjs bufferutil',
        });
        return config;
    },

};

module.exports = nextConfig
