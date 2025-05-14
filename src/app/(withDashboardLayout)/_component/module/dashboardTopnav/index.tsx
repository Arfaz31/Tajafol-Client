"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import tazafol from "@/assets/logo/tajafol-logo1.png";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { AlignJustify } from "lucide-react";
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
            <Link href="/" className="flex items-center ">
              <Image src={tazafol} alt="Logo" width={100} height={60} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardTopnav;
