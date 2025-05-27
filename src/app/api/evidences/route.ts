import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const evidences = await prisma.evidence.findMany({
    include: { media: true, texts: true },
  });
  return NextResponse.json(evidences);
}

export async function POST(req: NextRequest) {
  const data = await req.json();
  const evidence = await prisma.evidence.create({
    data: {
      code: data.code || "",
      type: data.type || "",
      title: data.title || "",
      description: data.description || "",
      tags: data.tags || "",
      media: {
        create: data.media || [],
      },
      texts: {
        create: data.texts || [],
      },
    },
  });

  return NextResponse.json({ status: "created", id: evidence.id });
}
