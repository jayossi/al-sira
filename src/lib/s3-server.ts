import { S3 } from "@aws-sdk/client-s3"
import fs from 'fs'
export async function DownloadFromS3(file_Key: string): Promise<string> {
    const accessKey_Id = process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID;
    const secretAccess_Key = process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY;
    const bucket_name = process.env.NEXT_PUBLIC_AWS_S3_BUCKET_NAME;
    const aws_region = process.env.NEXT_PUBLIC_AWS_S3_REGION;

    return new Promise(async (resolve, reject) => {
        try {
            const s3 = new S3({
                region: aws_region,
                credentials: {
                    accessKeyId: accessKey_Id!,
                    secretAccessKey: secretAccess_Key!,
                },
            });
            const input = {
                Bucket: bucket_name!,
                Key: file_Key,
            };

            const obj = await s3.getObject(input);
            const file_name = `/tmp/${Date.now().toString()}.pdf`;

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