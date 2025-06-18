import ChatArea from "@/components/chat/ChatArea";
import PromptInput from "@/components/chat/PromptInput";
import { getThreadById } from "@/lib/server";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const thread = await getThreadById(id);
  return (
    <div className="flex flex-col h-full w-full">

        <ChatArea chatId={id} />
        <PromptInput
          selectedModel={thread?.model || "GPT-4"}
        />
    </div>
  );
}
