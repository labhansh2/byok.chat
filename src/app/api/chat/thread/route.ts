import { NextRequest } from "next/server";

import { getThreads } from "@/lib/server";
import { Thread } from "@/types/chat";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get("query");
  const fields = searchParams.getAll("fields");

  // TO DO : later change it to get specific properties of the thread from db
  let threads: Thread[] = await getThreads();

  // Filter by query if present
  if (query) {
    threads = threads.filter((thread) =>
      thread.title.toLowerCase().includes(query.toLowerCase()),
    );
  }

  // If fields are specified, only return those fields for each thread
  let result;
  if (fields.length > 0) {
    result = threads.map((thread) => {
      const filtered: any = {};
      for (const field of fields) {
        if (field in thread) {
          filtered[field] = (thread as any)[field];
        }
      }
      return filtered;
    });
  } else {
    result = threads;
  }

  return new Response(JSON.stringify(result), { status: 200 });
}
