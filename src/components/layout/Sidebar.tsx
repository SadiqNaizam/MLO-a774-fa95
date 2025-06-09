import React from 'react';
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

interface SidebarProps {
  children: React.ReactNode;
  title?: string;
  className?: string;
}

const Sidebar: React.FC<SidebarProps> = ({ children, title, className = "" }) => {
  console.log("Rendering Sidebar with title:", title);

  return (
    <aside className={`w-full md:w-72 lg:w-80 space-y-6 p-6 border-r border-border ${className}`}>
       {title && (
        <>
          <h2 className="text-xl font-semibold text-foreground">{title}</h2>
          <Separator className="my-4" />
        </>
       )}
       <ScrollArea className="h-[calc(100vh-12rem)] pr-3"> {/* Adjust height as needed */}
            <div className="space-y-6">
                {children ? children : (
                    <>
                        {/* Placeholder Content - Replace with actual filter components */}
                        <div className="text-muted-foreground">Filter Group 1</div>
                        <Separator />
                        <div className="text-muted-foreground">Filter Group 2</div>
                        <Separator />
                        <div className="text-muted-foreground">Filter Group 3</div>
                    </>
                )}
            </div>
       </ScrollArea>
    </aside>
  );
};
export default Sidebar;