"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import logo from "@/assets/logo2.png";

import { LineChart, SquarePen } from "lucide-react";

import { RiSecurePaymentFill } from "react-icons/ri";
import { usePathname } from "next/navigation";

import { useGetmeQuery } from "@/redux/api/userApi";

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
      name: "Manage Products",
      link: "/dashboard/admin/manage-all-post",
      icon: <SquarePen />,
    },
    {
      name: "Manage Categories",
      link: "/dashboard/admin/manage-categories",
      icon: <SquarePen />,
    },

    {
      name: "Manage Orders",
      link: "/dashboard/admin/orders",
      icon: <RiSecurePaymentFill />,
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
          <div className="pt-4 pl-4">
            <Link className="flex items-center gap-1" href="/newsfeed">
              <Image className="w-[35px]" src={logo} alt="logo" />
              <span className="text-2xl text-white font-bold">
                PET<span>TALES</span>
              </span>
            </Link>
          </div>
        </div>
        <hr className="opacity-30" />
        <div className="p-4">
          <p className="xl:text-xl text-lg font-bold py-5 text-white">
            {user?.data?.role === "admin"
              ? "Admin Dashboard"
              : "User Dashboard"}
          </p>
          <ul className="flex flex-col gap-4 border border-[#136bd7]  min-h-56">
            {links.map((link) => (
              <li key={link.name}>
                <Link
                  href={link.link}
                  className={`flex items-center gap-2 text-sm hover:bg-[#414193] py-2 text-white ${
                    isActive(link.link)
                      ? "bg-[#414193] w-full pl-2 "
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
            <Link href="/newsfeed">
              <button className="bg-[#268bff] text-xs md:text-sm font-semibold text-white h-[40px] w-[100px] md:w-[130px] md:h-[42px]">
                Go To Newsfeed
              </button>
            </Link>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default DashboardSidebar;
