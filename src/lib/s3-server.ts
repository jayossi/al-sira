import { S3 } from "@aws-sdk/client-s3"
import fs from 'fs'


export async function DownloadFromS3(fileKey: string): Promise<string> {
    return new Promise( async (resolve, reject) => {
    try {
        const s3 = new S3({
            region: process.env.AWS_S3_REGION,
            credentials: {
                accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
                secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
            },
        });
        const input = {
            Bucket: process.env.AWS_S3_BUCKET_NAME!,
            Key: fileKey,
        };
        const obj = await s3.getObject(input)
        const file_name = `/tmp/pdf-${Date.now().toString()}.pdf`

        if (obj.Body instanceof require("stream").Readable) {
            const file = fs.createWriteStream(file_name);
            file.on("open", function (fd) {
                // @ts-ignore
                obj.Body?.pipe(file).on("finish", () => {
                    return resolve(file_name);
                });
            });
        }
    } catch (error) {
        console.log(error)
        reject(error)
        return null
    }
})
}