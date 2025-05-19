'use client'
import { ReactNode, useState } from "react";
import DashboardSidebar from "../../_component/module/dashboardSidebar";
import DashboardTopnav from "../../_component/module/dashboardTopnav";

type TProps = {
  children: ReactNode;
};

const AdminDashboardLayout = ({ children }: TProps) => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  const handleSidebarToggle = (collapsed: boolean) => {
    setIsSidebarCollapsed(collapsed);
  };

  const handleMobileMenuClick = () => {
    setIsMobileSidebarOpen(!isMobileSidebarOpen);
  };

  const handleMobileSidebarClose = () => {
    setIsMobileSidebarOpen(false);
  };

  return (
    <div className="flex bg-[#eff2f6] min-h-screen overflow-hidden">
      {/* Desktop Sidebar */}
      <div className={`bg-[#097d5a] text-white shadow-xl transition-all duration-300 flex-shrink-0 ${
        isSidebarCollapsed ? 'w-20' : 'w-54'
      } hidden lg:block`}>
        <DashboardSidebar onToggle={handleSidebarToggle} />
      </div>

      {/* Mobile sidebar overlay */}
      <div className={`fixed inset-0 bg-black bg-opacity-50 z-50 lg:hidden ${
        isMobileSidebarOpen ? 'block' : 'hidden'
      }`} onClick={handleMobileSidebarClose}>
        <div className={`fixed left-0 top-0 h-screen bg-[#097d5a] text-white shadow-xl transition-transform duration-300 z-50 ${
          isMobileSidebarOpen ? 'translate-x-0 w-64' : '-translate-x-full w-0'
        }`} onClick={(e) => e.stopPropagation()}>
          <DashboardSidebar 
            isMobile={true} 
            onMobileClose={handleMobileSidebarClose}
          />
        </div>
      </div>

      {/* Main content area */}
      <div className="flex-1 flex flex-col min-h-screen overflow-hidden">
        <DashboardTopnav onMenuClick={handleMobileMenuClick} />
        <main className="flex-1 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminDashboardLayout;