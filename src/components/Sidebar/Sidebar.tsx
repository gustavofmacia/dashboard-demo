import Image from "next/image";
import Link from "next/link";
import { LoginButonContainer, SidebarItem, User } from "@/components/";
import type { Route } from "next";
import logo from "@/assets/logo-company.webp";
import {
  IoBasketOutline,
  IoCalendarOutline,
  IoCheckboxOutline,
  IoCodeWorkingOutline,
  IoListOutline,
  IoPersonOutline,
} from "react-icons/io5";

const sidebarItems: SidebarItem[] = [
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: <IoCalendarOutline size={30} />,
  },
  {
    label: "Profile",
    href: "/dashboard/profile",

    icon: <IoPersonOutline size={30} />,
  },
  {
    label: "Rest TODOS",
    href: "/dashboard/rest-todos",
    icon: <IoCheckboxOutline size={30} />,
  },
  {
    label: "Actions TODOS",
    href: "/dashboard/server-actions-todos",

    icon: <IoListOutline size={30} />,
  },
  {
    label: "Cookies",
    href: "/dashboard/cookies",

    icon: <IoCodeWorkingOutline size={30} />,
  },
  {
    label: "Products",
    href: "/dashboard/products",

    icon: <IoBasketOutline size={30} />,
  },
];

export const Sidebar = () => {
  return (
    <aside className="fixed top-0 z-10 ml-[-100%] flex h-screen w-full flex-col justify-between border-r bg-white pb-3 transition duration-300 *:px-6 md:w-4/12 lg:ml-0 lg:w-[25%] xl:w-[20%] 2xl:w-[15%]">
      <div>
        <div className="py-4">
          <Link href="/dashboard" title="dashboard">
            <Image
              src={logo}
              width={200}
              height={100}
              priority
              alt="Tailus logo"
            />
          </Link>
        </div>

        <User />

        <ul className="mt-8 space-y-2 tracking-wide">
          {sidebarItems.map((item) => (
            <SidebarItem key={item.href} {...item} />
          ))}
        </ul>
      </div>

      <div className="flex items-center justify-between border-t pt-4">
        <LoginButonContainer />
      </div>
    </aside>
  );
};

export interface SidebarItem {
  href: Route;
  icon: React.ReactElement;
  label: string;
}
