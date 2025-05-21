import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LineChart, SquarePen, Home, Menu } from "lucide-react";
import { FaShippingFast } from "react-icons/fa";

interface MobileAppBarProps {
  onMenuClick: () => void;
}

// Define proper types for our app bar links
type AppBarLinkWithLink = {
  name: string;
  link: string;
  icon: React.ReactNode;
  action?: never; // Ensures this type doesn't have an action
};

type AppBarLinkWithAction = {
  name: string;
  action: () => void;
  icon: React.ReactNode;
  link?: never; // Ensures this type doesn't have a link
};

type AppBarLink = AppBarLinkWithLink | AppBarLinkWithAction;

const MobileAppBar: React.FC<MobileAppBarProps> = ({ onMenuClick }) => {
  const pathname = usePathname();

  const appBarLinks: AppBarLink[] = [
    { 
      name: "Insights", 
      link: "/dashboard/admin", 
      icon: <LineChart className="w-5 h-5" />,
    },
    {
      name: "Orders",
      link: "/dashboard/admin/orders",
      icon: <FaShippingFast className="w-5 h-5" />,
    },
    {
      name: "Products",
      link: "/dashboard/admin/manage-products",
      icon: <SquarePen className="w-5 h-5" />,
    },
    {
      name: "Shop",
      link: "/",
      icon: <Home className="w-5 h-5" />,
    },
    {
      name: "Menu",
      action: onMenuClick,
      icon: <Menu className="w-5 h-5" />,
    },
  ];

  // Updated isActive to safely handle items that might not have a link
  const isActive = (link?: string): boolean => {
    if (!link) return false;
    
    if (pathname === "/dashboard/admin") {
      return link === pathname;
    }
    return pathname === link;
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 h-16 bg-white border-t border-gray-200 shadow-lg z-50 lg:hidden">
      <div className="h-full flex items-center justify-around">
        {appBarLinks.map((item) => (
          'action' in item && item.action ? (
            <button
              key={item.name}
              onClick={item.action}
              className="flex flex-col items-center justify-center h-full flex-1"
            >
              <div className="p-1 rounded-full text-gray-600">
                {item.icon}
              </div>
              <span className="text-xs mt-1 font-medium">{item.name}</span>
            </button>
          ) : (
            <Link
              key={item.name}
              href={'link' in item ? item.link : '#'}
              className="flex flex-col items-center justify-center h-full flex-1"
            >
              <div className={`p-1 rounded-full ${isActive('link' in item ? item.link : undefined) ? 'text-orange-600' : 'text-gray-600'}`}>
                {item.icon}
              </div>
              <span className={`text-xs mt-1 font-medium ${isActive('link' in item ? item.link : undefined) ? 'text-orange-600' : 'text-gray-600'}`}>
                {item.name}
              </span>
            </Link>
          )
        ))}
      </div>
    </div>
  );
};

export default MobileAppBar;