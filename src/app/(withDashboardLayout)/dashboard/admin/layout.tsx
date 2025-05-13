import { ReactNode } from "react";
import DashboardSidebar from "../../_component/module/dashboardSidebar";
import DashboardTopnav from "../../_component/module/dashboardTopnav";

type TProps = {
  children: ReactNode;
};

const AdminDashboardLayout = ({ children }: TProps) => {
  return (
    <div className="grid grid-cols-12 bg-[#eff2f6] absolute w-full">
      <div className="bg-[#066836] xl:col-span-2 col-span-3  w-full h-screen sticky top-0 left-0 overflow-auto   text-white shadow-xl lg:block hidden">
        <DashboardSidebar />
      </div>
      <div className="xl:col-span-10 lg:col-span-9 col-span-full  min-h-screen  w-full ">
        <DashboardTopnav />
        {children}
      </div>
    </div>
  );
};

export default AdminDashboardLayout;
