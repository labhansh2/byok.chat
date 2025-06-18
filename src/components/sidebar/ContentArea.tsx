"use client";

import { useSidebar } from "@/contexts/sidebar-context";
import { Thread } from "@/types/chat";

import Extensions from "./extensions/Extensions";
import History from "./history/History";

export default function ContentArea({
  threads,
}: {
  threads: Thread[];
}) {
  const { tab } = useSidebar();

  return (
    <>
      {tab === "recent" && <History threads={threads} />}
      {tab === "extensions" && <Extensions />}
    </>
  );
}
