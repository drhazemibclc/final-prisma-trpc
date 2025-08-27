import { S3Client } from '@aws-sdk/client-s3';

export const s3Client = new S3Client({
    region: 'us-east-1', // MinIO ignores region, but SDK requires one
    endpoint: 'http://127.0.0.1:9000',
    credentials: {
        accessKeyId: process.env['MINIO_ROOT_USER'] || 'admin',
        secretAccessKey: process.env['MINIO_ROOT_PASSWORD'] || 'admin12345'
    },
    forcePathStyle: true // ✅ Required for MinIO (path-style instead of virtual-hosted)
});
