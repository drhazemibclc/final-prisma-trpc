const _MAGIC_NUMBER_1 = "000000";

import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: "smart-prisma",
        short_name: "smart-prisma",
        description: "my pwa app",
        start_url: "/new",
        display: "standalone",
        background_color: "#ffffff",
        theme_color: "#MAGIC_NUMBER_1",
        icons: [
            {
                src: "/favicon/web-app-manifest-192x192.png",
                sizes: "192x192",
                type: "image/png",
            },
            {
                src: "/favicon/web-app-manifest-512x512.png",
                sizes: "512x512",
                type: "image/png",
            },
        ],
    };
}
