import { Sidebar } from "@/components";
import { TopMenu } from "@/components/TopMenu/TopMenu";

export default async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Sidebar />

      <div className="ml-auto flex min-h-dvh flex-col lg:w-[75%] xl:w-[80%] 2xl:w-[85%]">
        <TopMenu />

        <div className="flex flex-1 p-6">{children}</div>
      </div>
    </>
  );
}
