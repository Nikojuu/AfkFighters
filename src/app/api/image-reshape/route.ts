import { NextRequest, NextResponse } from "next/server";
import sharp from "sharp";
import path from "path";
import fs from "fs";

export async function POST(req: NextRequest) {
  const image = await req.formData();

  const file = image.get("picture");
  if (!file) {
    return NextResponse.json({ message: "No image found" });
  }

  const fileBuffer = await new Response(file).arrayBuffer();

  const processedImageBuffer = await sharp(Buffer.from(fileBuffer))
    .resize(1024, 1024, {
      fit: "contain",
      background: { r: 255, g: 255, b: 255 },
    })
    .toBuffer();

  const fileNameWithoutExtension = (file as File).name.split(".")[0];

  const savePath = path.join(
    process.cwd(),
    "public",
    `${fileNameWithoutExtension}.jpg`
  );
  if (fs.existsSync(savePath)) {
    return NextResponse.json({
      error: "Image with same name already exists please rename the image",
      status: 500,
    });
  }

  fs.writeFileSync(savePath, processedImageBuffer);
  console.log(processedImageBuffer);
  return NextResponse.json({ message: "Image received" });
}
