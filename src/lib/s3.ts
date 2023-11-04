import { PutObjectCommandOutput, S3 } from '@aws-sdk/client-s3';

export async function uploadToS3(file: File): Promise<{ file_key: string, file_name: string }> {
    return new Promise((resolve, reject) => {
        try {
            const s3 = new S3({
                region: process.env.AWS_S3_REGION,
                credentials: {
                    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
                    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
                },
            });
            const file_key = "uploads/" + Date.now() + file.name.replace(' ', '-');

            const input = {
                Bucket: process.env.AWS_S3_BUCKET_NAME!,
                Key: file_key,
                Body: file,
            };
            s3.putObject(input,
                (err: any, data: PutObjectCommandOutput | undefined) => {
                    return resolve({
                        file_key,
                        file_name: file.name,
                    });
                }
            );

        } catch (error) {
            reject(error);
        }

    });

}

// returns the publicly available url so that we can embed it to our pdf screen later.
export function getS3Url(file_key: string) {
    const url = `https:://${process.env.AWS_S3_BUCKET_NAME}.s3.${process.env.AWS_S3_REGION}.amazonaws.com/${file_key}`;
    return url;
}