import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface AdSpaceProps {
  position: "top" | "middle" | "bottom" | "sidebar";
  className?: string;
  adCode?: string; // For AdSense/Adsterra code injection
  customContent?: {
    title: string;
    description: string;
    cta: string;
    link?: string;
    bgColor?: string;
    textColor?: string;
  };
}

const AdSpace: React.FC<AdSpaceProps> = ({ 
  position, 
  className, 
  adCode, 
  customContent 
}) => {
  const [isVisible, setIsVisible] = React.useState(true);

  if (!isVisible) return null;

  // If ad code is provided, render it directly
  if (adCode) {
    return (
      <div 
        className={cn("relative", className)}
        dangerouslySetInnerHTML={{ __html: adCode }}
      />
    );
  }

  const getDefaultAdContent = () => {
    switch (position) {
      case "top":
        return {
          title: "🚀 Grow Your Business!",
          description: "Succeed online with digital marketing. Get free consultation.",
          cta: "Learn More",
          bgColor: "bg-gradient-to-r from-blue-50 to-indigo-50",
          textColor: "text-blue-700"
        };
      case "middle":
        return {
          title: "💰 Earn Money Online",
          description: "Learn freelancing from home. 100% practical course and job support.",
          cta: "View Course",
          bgColor: "bg-gradient-to-r from-green-50 to-emerald-50",
          textColor: "text-green-700"
        };
      case "bottom":
        return {
          title: "📱 Download Mobile App",
          description: "Use SmartToolkit mobile app to access tools anytime.",
          cta: "Download",
          bgColor: "bg-gradient-to-r from-purple-50 to-pink-50",
          textColor: "text-purple-700"
        };
      case "sidebar":
        return {
          title: "🎯 Advertise Here",
          description: "Show your products here",
          cta: "Contact Us",
          bgColor: "bg-gradient-to-r from-orange-50 to-red-50",
          textColor: "text-orange-700"
        };
      default:
        return {
          title: "📢 Advertisement",
          description: "You can place your advertisement here",
          cta: "Contact Us",
          bgColor: "bg-gradient-to-r from-gray-50 to-slate-50",
          textColor: "text-gray-700"
        };
    }
  };

  const adContent = customContent || getDefaultAdContent();

  return (
    <div className={cn("relative", className)}>
      <Card className={cn(
        "relative overflow-hidden border-2 border-dashed border-muted-foreground/20",
        adContent.bgColor
      )}>
        <button
          onClick={() => setIsVisible(false)}
          className="absolute top-2 right-2 p-1 rounded-full bg-white/80 hover:bg-white text-muted-foreground hover:text-foreground transition-colors z-10"
          aria-label="Close advertisement"
        >
          <X className="h-4 w-4" />
        </button>
        
        <div className="p-4 md:p-6">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
            <div className="flex-1">
              <h3 className={cn("font-semibold text-lg mb-2", adContent.textColor)}>
                {adContent.title}
              </h3>
              <p className="text-sm text-muted-foreground mb-3 md:mb-0">
                {adContent.description}
              </p>
            </div>
            
            <Button 
              variant="default" 
              size="sm"
              className="shrink-0 gap-2"
              onClick={() => 'link' in adContent && adContent.link && window.open(adContent.link, '_blank')}
            >
              {adContent.cta}
              <ExternalLink className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
        {/* Watermark */}
        <div className="absolute bottom-1 right-2 text-xs text-muted-foreground/50">
          Advertisement
        </div>
      </Card>
    </div>
  );
};

export default AdSpace;