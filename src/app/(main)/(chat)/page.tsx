import { getUserMetadata } from "@/lib/server";
import BaseHydrator from "@/components/hydrators/base";

export default async function Page() {
  const userMetadata = (await getUserMetadata()) as { defaultModel: string };

  return <BaseHydrator model={userMetadata.defaultModel} />;
}
