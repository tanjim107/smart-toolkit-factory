
import React, { useState } from "react";
import { cn } from "@/lib/utils";
import Sidebar from "./Sidebar";
import SidebarButton from "./SidebarButton";
import { useIsMobile } from "@/hooks/use-mobile";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const isMobile = useIsMobile();
  const [isSidebarOpen, setIsSidebarOpen] = useState(!isMobile);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="min-h-screen flex bg-gradient-radial from-blue-50 to-slate-50">
      <Sidebar 
        isSidebarOpen={isSidebarOpen} 
        toggleSidebar={toggleSidebar} 
      />
      
      <main 
        className={cn(
          "flex-1 relative min-h-screen w-full",
          "transition-all duration-300 ease-out",
          isSidebarOpen && !isMobile ? "ml-64" : "ml-0"
        )}
      >
        <SidebarButton 
          isSidebarOpen={isSidebarOpen} 
          toggleSidebar={toggleSidebar} 
        />
        
        <div className="w-full h-full px-4 sm:px-6 lg:px-8 pt-16 pb-8 max-w-7xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
};

export default Layout;
