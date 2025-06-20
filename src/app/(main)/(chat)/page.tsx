import { auth } from "@clerk/nextjs/server";
import { cookies } from "next/headers";

import { getUserMetadata } from "@/lib/server";
import BaseHydrator from "@/components/hydrators/base";

export default async function Page() {
  const {userId, redirectToSignIn} = await auth();

  if (!userId) {
    return redirectToSignIn();
  }

  const cookieStore = await cookies();
  // const userThreads = await getUserThreads(userId);

  return <BaseHydrator model={cookieStore.get("defaultModel")?.value || "openai/gpt-4o"} />;
}
