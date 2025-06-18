import ChatArea from "@/components/chat/ChatArea";
import PromptInput from "@/components/chat/PromptInput";
import ChatHydrator from "@/components/hydrators/chat";
import { getThreadById } from "@/lib/server";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const thread = await getThreadById(id);
  return <ChatHydrator threadId={id} />;
}
