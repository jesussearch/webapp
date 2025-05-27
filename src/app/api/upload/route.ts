import { v2 as cloudinary, UploadApiResponse } from "cloudinary";
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
});

export const config = {
  api: {
    bodyParser: false,
  },
};

export async function POST(req: Request) {
  const formData = await req.formData();
  const file = formData.get("file") as File;
  const evidenceId = formData.get("evidenceId")?.toString();
  const caption = formData.get("caption")?.toString() || null;

  if (!file || !evidenceId) {
    return NextResponse.json(
      { error: "Missing file or evidenceId" },
      { status: 400 }
    );
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  // Upload to Cloudinary using buffer
  const uploadResult = await new Promise<UploadApiResponse>(
    (resolve, reject) => {
      cloudinary.uploader
        .upload_stream({ folder: "evidence" }, (error, result) => {
          if (error || !result) return reject(error);
          resolve(result);
        })
        .end(buffer);
    }
  );

  const media = await prisma.mediaAttachment.create({
    data: {
      type: file.type,
      url: uploadResult.secure_url,
      caption,
      evidence: {
        connect: {
          id: parseInt(evidenceId),
        },
      },
    },
  });

  return NextResponse.json(media);
}
