"use client";
import { ReactNode, useState, useEffect } from "react";
import DashboardSidebar from "../../_component/module/dashboardSidebar";
import DashboardTopnav from "../../_component/module/dashboardTopnav";
import MobileAppBar from "../../_component/module/mobileAppbar";

type TProps = {
  children: ReactNode;
};

const AdminDashboardLayout = ({ children }: TProps) => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleSidebarToggle = (collapsed: boolean) => {
    setIsSidebarCollapsed(collapsed);
  };

  const handleMobileMenuClick = () => {
    setIsMobileSidebarOpen((prev) => !prev);
  };

  const handleMobileSidebarClose = () => {
    setIsMobileSidebarOpen(false);
  };

  return (
    <div className="flex h-screen overflow-hidden bg-[#eff2f6]">
      {/* Desktop Sidebar */}
      <div
        className={`fixed top-0 left-0 z-30 h-screen bg-[#097d5a] text-white shadow-xl hidden lg:flex flex-col transition-all duration-200 ease-linear ${
          isSidebarCollapsed ? "w-20" : "w-[216px]"
        }`}
      >
        <div className="flex-1 overflow-y-auto">
          <DashboardSidebar onToggle={handleSidebarToggle} />
        </div>
      </div>

      {/* Mobile sidebar overlay */}
      {isMounted && (
        <div
          className={`fixed inset-0 bg-black bg-opacity-50 z-50 lg:hidden transition-opacity duration-200 ${
            isMobileSidebarOpen
              ? "opacity-100"
              : "opacity-0 pointer-events-none"
          }`}
          onClick={handleMobileSidebarClose}
        >
          <div
            className={`fixed left-0 top-0 h-screen w-64 bg-gradient-to-b from-orange-600 via-orange-700 to-orange-800 text-white shadow-xl transition-all duration-200 ease-linear z-50 ${
              isMobileSidebarOpen ? "translate-x-0" : "-translate-x-full"
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <DashboardSidebar
              isMobile={true}
              onMobileClose={handleMobileSidebarClose}
            />
          </div>
        </div>
      )}

      {/* Main content area */}
      <div
        className={`flex flex-col flex-1 min-h-screen transition-all duration-200 ease-linear ${
          isSidebarCollapsed ? "lg:ml-20" : "lg:ml-[216px]"
        }`}
      >
        {/* Top nav */}
        <div className="sticky top-0 z-20 w-full">
          <DashboardTopnav onMenuClick={handleMobileMenuClick} />
        </div>

        {/* Page content */}
        <main className="flex-1 overflow-auto pb-16 lg:pb-0">{children}</main>

        {/* Bottom nav for mobile */}
        <div className="fixed bottom-0 left-0 right-0 lg:hidden">
          <MobileAppBar onMenuClick={handleMobileMenuClick} />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardLayout;
