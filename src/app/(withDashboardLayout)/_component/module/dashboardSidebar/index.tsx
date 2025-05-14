"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import tazafol from "@/assets/logo/tajafol-logo1.png";

import { LineChart, SquarePen } from "lucide-react";
import { MdAdminPanelSettings } from "react-icons/md";
import { usePathname } from "next/navigation";
import { FaShippingFast } from "react-icons/fa";
import { useGetmeQuery } from "@/redux/api/userApi";
import { IoNewspaperSharp } from "react-icons/io5";
const DashboardSidebar = () => {
  const { data: user } = useGetmeQuery("");

  const pathname = usePathname();

  // const userDashboardLinks = [
  //   { name: "Insights", link: "/dashboard/user", icon: <LineChart /> },
  //   {
  //     name: "My Unlock Post",
  //     link: "/dashboard/user/my-unlock-post",
  //     icon: <FaUnlockAlt />,
  //   },
  //   {
  //     name: "My Earnings",
  //     link: "/dashboard/user/earning",
  //     icon: <FaSackDollar />,
  //   },
  // ];
  const adminDashboardLinks = [
    { name: "Insights", link: "/dashboard/admin", icon: <LineChart /> },
    {
      name: "Manage Orders",
      link: "/dashboard/admin/orders",
      icon: <FaShippingFast className="w-7 h-7" />,
    },
    {
      name: "Manage Products",
      link: "/dashboard/admin/manage-products",
      icon: <SquarePen />,
    },
    {
      name: "Manage Categories",
      link: "/dashboard/admin/manage-categories",
      icon: <SquarePen />,
    },
    {
      name: "Create Admin",
      link: "/dashboard/admin/create-admin",
      icon: <MdAdminPanelSettings className="w-7 h-7" />,
    },
    {
      name: "Create Blog",
      link: "/dashboard/admin/create-blog",
      icon: <IoNewspaperSharp className="w-7 h-7" />,
    },
  ];

  const links = adminDashboardLinks;

  const isActive = (link: string): boolean => {
    if (pathname === "/dashboard/admin") {
      return link === pathname;
    }
    return pathname === link;
  };

  return (
    <aside>
      <div>
        <div className="h-[79px]">
          <div className="w-full flex justify-center items-center pt-2">
            <Link href="/" className="flex items-center ">
              <Image src={tazafol} alt="Logo" width={100} height={60} />
            </Link>
          </div>
        </div>
        <hr className="opacity-30" />
        <div className="p-4">
          <p className="xl:text-xl lg:text-lg  text-base font-bold py-5 text-white">
            {user?.data?.user?.role === "SUPER_ADMIN"
              ? "ADMIN DASHBOARD"
              : user?.data?.user?.role === "ADMIN"
              ? "ADMIN DASHBOARD"
              : "User DASHBOARD"}
          </p>
          <ul className="flex flex-col gap-4 border border-[#26f57c]  min-h-56">
            {links.map((link) => (
              <li key={link.name}>
                <Link
                  href={link.link}
                  className={`flex items-center gap-2 text-sm hover:bg-[#30bf7c] py-2 text-white ${
                    isActive(link.link)
                      ? "bg-[#19af69] w-full pl-2 "
                      : "w-full pl-2"
                  }`}
                >
                  <span className="text-white w-8 h-8 flex items-center justify-center">
                    {link.icon}
                  </span>
                  <p>{link.name}</p>
                </Link>
              </li>
            ))}
          </ul>
          <div className="flex items-center justify-center md:pt-28 pt-20 pb-3">
            <Link href="/">
              <button className="bg-[#19af69] hover:bg-[#33d589] rounded-lg  text-xs md:text-sm font-semibold text-white h-[40px] w-[100px] md:w-[130px] md:h-[42px]">
                Go To Homepage
              </button>
            </Link>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default DashboardSidebar;
