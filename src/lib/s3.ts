import { S3, PutObjectCommandOutput } from "@aws-sdk/client-s3";

export async function uploadToS3(
  file: File
): Promise<{ file_key: string; file_name: string }> {
  return new Promise(async (resolve, reject) => {
    try {
      const accessKey_Id = process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID;
      const secretAccess_Key = process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY;
      const bucket_name = process.env.NEXT_PUBLIC_AWS_S3_BUCKET_NAME;
      const aws_region = process.env.NEXT_PUBLIC_AWS_S3_REGION;

      const s3 = new S3({
        region: aws_region,
        credentials: {
          accessKeyId: accessKey_Id!,
          secretAccessKey: secretAccess_Key!,
        },
      });

      const file_key =
        "uploads/" + Date.now().toString() + file.name.replace(" ", "-");

      const input = {
        Bucket: bucket_name,
        Key: file_key,
        Body: file,
      };
      s3.putObject(
        input,
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
  const url = `https:://${process.env.NEXT_PUBLIC_AWS_S3_BUCKET_NAME}.s3.${process.env.AWS_S3_REGION}.amazonaws.com/${file_key}`;
  return url;
}
