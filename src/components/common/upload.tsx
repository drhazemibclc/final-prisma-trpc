// src/components/ui/minio-upload-button.tsx
'use client';

import * as React from 'react';
import { getPresignedUrl, uploadToMinio } from '@/lib/minio';
import { Button } from '../ui/button';

type Props = {
    onUploadCompleteAction?: (url: string) => void; // rename
    children?: React.ReactNode;
    className?: string;
};

export const UploadButton: React.FC<Props> = ({ onUploadCompleteAction, children, className }) => {
    const [loading, setLoading] = React.useState(false);

    const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        try {
            setLoading(true);
            const { url, key } = await getPresignedUrl(file.name, file.type);
            await uploadToMinio(file, url);
            const fileUrl = `${process.env['NEXT_PUBLIC_MINIO_BASE_URL']}/${key}`;
            onUploadCompleteAction?.(fileUrl);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <label className={className}>
            <input
                type='file'
                className='hidden'
                onChange={handleUpload}
            />
            <Button disabled={loading}>{loading ? 'Uploading...' : (children ?? 'Upload')}</Button>
        </label>
    );
};
