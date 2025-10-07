import { TabBar } from "@/components";
import type { Metadata } from "next";
import { cookies } from "next/headers";

export const metadata: Metadata = {
  title: "Cookies Page",
  description: "Cookies Page",
};

export default async function CookiesPage() {
  const cookieStore = await cookies();
  const cookieTab = Number(cookieStore.get("selectedTab")?.value ?? "1");

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl">Tabs</h1>
      <TabBar currentTab={cookieTab} />
    </div>
  );
}
