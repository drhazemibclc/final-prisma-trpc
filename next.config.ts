import path from "node:path";
import type { NextConfig } from "next";
export default {
    eslint: {
        ignoreDuringBuilds: true,
    },
    serverExternalPackages: ["@trpc/server"],
    images: {
        dangerouslyAllowSVG: true,
        remotePatterns: [
            {
                protocol: "https",
                hostname: "academy-public.coinmarketcap.com",
            },
            {
                protocol: "https",
                hostname: "coin-images.coingecko.com",
            },
            {
                protocol: "https",
                hostname: "placehold.co",
            },
        ],
        unoptimized: true,
    },

    // Root directory (optional, auto-detected if not set)
    turbopack: {
        root: path.resolve(__dirname),

        // Loader rules for custom assets
        rules: {
            "*.svg": {
                loaders: [
                    {
                        loader: "@svgr/webpack",
                        options: { icon: true }, // render SVG as React component
                    },
                ],
                as: "*.js", // Turbopack expects JS output
            },
            "*.yaml": {
                loaders: ["yaml-loader"],
                as: "*.js",
            },
            "*.mdx": {
                loaders: ["@mdx-js/loader"],
                as: "*.js",
            },
        },

        // Aliases for imports
        resolveAlias: {
            "@components": path.resolve(__dirname, "src/components"),
            "@lib": path.resolve(__dirname, "src/lib"),
            underscore: "lodash", // example: replace underscore with lodash
        },

        // Resolve extensions in imports
        resolveExtensions: [
            ".tsx",
            ".ts",
            ".jsx",
            ".js",
            ".mjs",
            ".json",
            ".mdx", // if using MDX
        ],
    },
    // Performance and caching
    output: "standalone", // produces minimal bundle for serverless
    reactStrictMode: true,
    webpack: config => {
        // This is only intended to pass CI and should be skiped in your app
        if (config.name === "server") config.optimization.concatenateModules = false;

        return config;
    },
} satisfies NextConfig;
