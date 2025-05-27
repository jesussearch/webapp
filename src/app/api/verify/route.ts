import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const auth = req.headers.get("authorization");
  if (auth === "Bearer secret-token-123") {
    return NextResponse.json({ status: "ok" });
  }
  return NextResponse.json({ error: "Token non valido" }, { status: 401 });
}
