import { NextResponse } from "next/server";

function resolveIp(request: Request) {
  const forwarded = request.headers.get("x-forwarded-for");

  if (forwarded) {
    return forwarded.split(",")[0]?.trim() || null;
  }

  const realIp = request.headers.get("x-real-ip");

  if (realIp) {
    return realIp.trim();
  }

  return null;
}

export async function GET(request: Request) {
  return NextResponse.json(
    {
      ip: resolveIp(request),
    },
    {
      headers: {
        "Cache-Control": "no-store",
      },
    },
  );
}
