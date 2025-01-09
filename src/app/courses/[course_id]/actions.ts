"use server";

import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import crypto from "crypto";
const s3 = new S3Client({
  region: process.env.AWS_BUCKET_REGION!,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY!,
    secretAccessKey: process.env.AWS_SECRET_KEY!,
  },
});
const acceptedTypes = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "video/mp4",
  "video/mkv",
  "video/webm",
];
const maxSize = 1024 * 1024 * 300;
export async function getSecureUrl(
  name: string,
  type: string,
  size: number,
  checksum: string
) {
  const session = true;
  if (!session) {
    return { Failure: "Not authenticated." };
  }

  if (!acceptedTypes.includes(type)) {
    return { failure: "Invalid file type." };
  }
  if (size > maxSize) {
    return { Failure: "File is too large" };
  }
  const generateFileName = (bytes = 32) =>
    crypto.randomBytes(bytes).toString("hex");
  const putObject = new PutObjectCommand({
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: generateFileName(),
    ContentType: type,
    ContentLength: size,
    ChecksumSHA256: checksum,
  });
  const signedUrl = await getSignedUrl(s3, putObject, { expiresIn: 60 });
  return { Success: { url: signedUrl } };
}
