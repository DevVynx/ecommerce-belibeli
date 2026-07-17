import { UploadApiResponse } from "cloudinary";

import { cloudinary } from "@/infra/cloudinary";

export function uploadToCloudinary(
  buffer: Buffer,
  folder: string = "belibeli"
): Promise<{ url: string; publicId: string }> {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      { folder, resource_type: "image" },
      (error, result: UploadApiResponse | undefined) => {
        if (error) return reject(error);
        if (!result) return reject(new Error("Upload sem resposta do Cloudinary"));

        resolve({ url: result.secure_url, publicId: result.public_id });
      }
    );

    uploadStream.end(buffer);
  });
}
