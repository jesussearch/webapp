import { prisma } from "@/lib/prisma";

// src/app/api/evidences/[code]/route.ts
import { NextRequest, NextResponse } from "next/server";

export async function PUT(
  request: NextRequest,
  context: { params: Promise<{ code: string }> }
) {
  const { code } = await context.params;
  const data = await request.json();

  const e = await prisma.evidence.findUnique({ where: { code } });

  if (!e) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  await prisma.mediaAttachment.deleteMany({ where: { evidenceId: e.id } });
  await prisma.textAttachment.deleteMany({ where: { evidenceId: e.id } });

  await prisma.evidence.update({
    where: { code },
    data: {
      title: data.title,
      description: data.description,
      tags: data.tags,
      type: data.type,
      media: {
        create: data.media.map((m: any) => ({
          type: m.type,
          url: m.url,
          caption: m.caption,
        })),
      },
      texts: {
        create: data.texts.map((t: any) => ({
          title: t.title,
          content: t.content,
        })),
      },
    },
  });

  return NextResponse.json({ status: "updated" });
}

export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ code: string }> }
) {
  const { code } = await context.params;
  const e = await prisma.evidence.findUnique({
    where: { code: code },
    include: { media: true, texts: true },
  });

  if (!e) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  // Delete associated media and texts first
  await prisma.mediaAttachment.deleteMany({ where: { evidenceId: e.id } });
  await prisma.textAttachment.deleteMany({ where: { evidenceId: e.id } });

  // Delete the evidence
  await prisma.evidence.delete({
    where: { code: code },
  });

  return NextResponse.json({ status: "deleted" });
}

// e

// export async function PUT(
//   request: NextRequest,
//   context: { params: Promise<{ code: string }> }
// ) {
//   const { code } = await context.params;
//   // Your logic here
//   return NextResponse.json({ message: `Updated evidence ${code}` });
// }

// export async function DELETE(
//   request: NextRequest,
//   context: { params: Promise<{ code: string }> }
// ) {
//   const { code } = await context.params;
//   // Your logic here
//   return NextResponse.json({ message: `Deleted evidence ${code}` });
// }
