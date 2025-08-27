import { bucketName, minioClient } from './minio';

const URL = 'https://better.ecarry.uk';

export const keyToImage = (key: string | undefined | null) => {
    if (!key) {
        return '';
    }

    return `${URL}/${key}`;
};

export const uploadFile = async (file: File): Promise<string> => {
    const fileName = `${Date.now()}-${file.name}`;

    // Convert File to ArrayBuffer (browser-friendly)
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer); // Node-compatible Buffer

    // Ensure bucket exists
    const exists = await minioClient.bucketExists(bucketName);
    if (!exists) {
        await minioClient.makeBucket(bucketName, 'us-east-1');
    }

    await minioClient.putObject(bucketName, fileName, buffer);

    return `${process.env['NEXT_PUBLIC_MINIO_ENDPOINT']}/${bucketName}/${fileName}`;
};
