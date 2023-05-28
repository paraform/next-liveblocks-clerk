import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";
import { authorize } from "@liveblocks/node";
import { currentUser } from "@clerk/nextjs";

// Replace this key with your secret key provided at https://liveblocks.io/dashboard/apikeys
const SECRET_KEY = process.env.NEXT_PUBLIC_LIVEBLOCKS_SECRET_KEY!;

export async function POST(request: Request) {
  const { userId } = auth();
  const user = await currentUser();

  if (!SECRET_KEY || !userId) {
    return new Response("Unauthorized", { status: 401 });
  }
  const { room } = await request.json();

  const res = await authorize({
    room: room,
    secret: SECRET_KEY,
    userId,
    userInfo: {
      username: user?.username,
      image: user?.imageUrl,
    },
  });

  return new NextResponse(res.body, { status: res.status });
}
