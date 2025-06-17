export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return (
    <div className="flex flex-col h-full w-full">
      <div className="flex-1 overflow-auto p-4">
        <h1 className="text-2xl font-semibold mb-4">Chat Area for {id}</h1>
        {/* Chat messages will go here */}
      </div>
      <div className="border-t border-border p-4">
        <h1 className="text-2xl font-semibold mb-4">Prompt Area</h1>
        {/* Prompt input will go here */}
      </div>
    </div>
  );
}
