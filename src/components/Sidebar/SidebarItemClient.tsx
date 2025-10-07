"use client";

import Link from "next/link";
import type { SidebarItem as SidebarItemProps } from "@/components/Sidebar/Sidebar";
import { usePathname } from "next/navigation";

export const SidebarItem = ({ href, icon, label }: SidebarItemProps) => {
  const path = usePathname();

  const isActive = path === href;
  return (
    <li>
      <Link
        href={href}
        className={`flex items-center space-x-4 rounded-md px-4 py-3 text-gray-600 ${isActive ? "bg-gradient-to-r from-sky-600 to-cyan-400 text-white" : "transition-all hover:bg-gray-100"}`}
      >
        {icon}
        <div className="min-w-fit">{label}</div>
      </Link>
    </li>
  );
};
