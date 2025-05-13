"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import logo from "@/assets/logo2.png";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { AlignJustify, Search } from "lucide-react";
import Lottie from "lottie-react";
import handWave from "@/assets/lottie/wavinghand.json";

import DashboardSidebar from "../dashboardSidebar";
import { useGetmeQuery } from "@/redux/api/userApi";
const DashboardTopnav = () => {
  const { data: user } = useGetmeQuery("");

  return (
    <div className="h-[80px] w-full lg:bg-[#eff2f6] bg-[#0a9f43]  shadow-md sticky top-0 z-50  pt-3">
      <div className="md:px-4 px-0">
        <div className="flex justify-between items-center ">
          <div className="lg:hidden block">
            <div className="flex items-center justify-center ">
              <div>
                <Sheet>
                  <SheetTrigger asChild>
                    <Button className="text-white bg-transparent">
                      <AlignJustify />
                    </Button>
                  </SheetTrigger>
                  <SheetContent
                    side="left"
                    className="bg-[#066836]      text-white shadow-2xl "
                  >
                    <div>
                      <DashboardSidebar />
                    </div>
                  </SheetContent>
                </Sheet>
              </div>
            </div>
          </div>
          <div className="lg:block hidden">
            <div className="flex items-center  gap-1">
              <p className="text-lg ">Welcome {user?.data?.name} </p>
              <div className=" ">
                <Lottie
                  animationData={handWave}
                  loop={true}
                  className="w-9 h-9"
                />
              </div>
            </div>
            <p className="text-sm text-gray-500 ">
              Here&apos;s what&apos;s happening with your store today.
            </p>
          </div>
          <div className="lg:hidden sm:block hidden">
            <Link className="flex items-center gap-1 " href="/">
              <Image className="xl:w-[35px] w-[35px]" src={logo} alt="logo" />
              <span className="xl:text-3xl text-2xl text-white font-bold">
                PETTALES
              </span>
            </Link>
          </div>

          <div>
            <div className="flex items-center  md:space-x-7 space-x-2  pr-5 ">
              <div className="bg-[#d5e0f0] rounded-full p-3 w-11 h-11 flex items-center justify-center">
                <Search className="w-6 h-6" />
              </div>
              {/* <div className="relative cursor-pointer bg-[#d5e0f0] rounded-full p-3 w-11 h-11 flex items-center justify-center">
                <Mail className="w-6 h-6" />
                <div className="absolute xl:-top-1 text-white -top-1 -right-1 lg:bg-[#6783cc] bg-[#268bfe]  w-6 h-6 rounded-full flex items-center justify-center">
                  <p className="text-center text-xs">6+</p>
                </div>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardTopnav;
