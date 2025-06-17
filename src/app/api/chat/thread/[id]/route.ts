import { NextRequest } from "next/server";

import { getThreads } from "@/lib/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  const { id } = await params;
  const threads = await getThreads();
  const thread = threads.find((thread) => thread.id === id);
  return new Response(JSON.stringify(thread));
}
