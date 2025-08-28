import { Client } from "minio";

export const minioClient = new Client({
    endPoint: process.env["NEXT_PUBLIC_MINIO_ENDPOINT"] ?? "http://127.0.0.1:9000",
    port: Number(process.env["NEXT_PUBLIC_MINIO_PORT"]) ?? 9000,
    useSSL: process.env["NEXT_PUBLIC_MINIO_SSL"] === "true",
    accessKey: process.env["NEXT_PUBLIC_MINIO_ACCESS_KEY"] ?? "drhazem",
    secretKey: process.env["NEXT_PUBLIC_MINIO_SECRET_KEY"] ?? "admin1234",
});

export const bucketName = "user-images";

// src/lib/minio.ts
import axios from "axios";

export const getPresignedUrl = async (filename: string, contentType: string) => {
    const res = await axios.post("/api/minio/presign", { filename, contentType });
    return res.data as { url: string; key: string };
};

export const uploadToMinio = async (file: File, url: string) => {
    await fetch(url, {
        method: "PUT",
        body: file,
        headers: {
            "Content-Type": file.type,
        },
    });
};
