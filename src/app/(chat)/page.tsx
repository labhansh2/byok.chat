import ChatAreaPlaceholder from "@/components/chat/ChatAreaPlaceholder";
import PromptInput from "@/components/chat/PromptInput";
import { getUserMetadata } from "@/lib/server";

export default async function Page() {

    const userMetadata = await getUserMetadata();
    return (
    <div className="flex flex-col h-full w-full">
      <ChatAreaPlaceholder/>
      <PromptInput selectedModel={userMetadata.defaultModel} />
    </div>
  );
}
