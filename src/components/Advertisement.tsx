import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface AdvertisementProps {
  position: "top" | "middle" | "bottom" | "sidebar";
  className?: string;
}

const Advertisement: React.FC<AdvertisementProps> = ({ position, className }) => {
  const [isVisible, setIsVisible] = React.useState(true);

  if (!isVisible) return null;

  const getAdContent = () => {
    switch (position) {
      case "top":
        return {
          title: "🚀 আপনার ব্যবসা বাড়ান!",
          description: "ডিজিটাল মার্কেটিং এর সাথে অনলাইনে সফল হন। বিনামূল্যে পরামর্শ নিন।",
          cta: "আরও জানুন",
          bgColor: "bg-gradient-to-r from-blue-50 to-indigo-50",
          textColor: "text-blue-700"
        };
      case "middle":
        return {
          title: "💰 অনলাইনে আয় করুন",
          description: "ঘরে বসে ফ্রিল্যান্সিং শিখুন। ১০০% প্র্যাক্টিক্যাল কোর্স এবং জব সাপোর্ট।",
          cta: "কোর্স দেখুন",
          bgColor: "bg-gradient-to-r from-green-50 to-emerald-50",
          textColor: "text-green-700"
        };
      case "bottom":
        return {
          title: "📱 মোবাইল অ্যাপ ডাউনলোড করুন",
          description: "SmartToolkit মোবাইল অ্যাপ দিয়ে যেকোনো সময় টুলস ব্যবহার করুন।",
          cta: "ডাউনলোড করুন",
          bgColor: "bg-gradient-to-r from-purple-50 to-pink-50",
          textColor: "text-purple-700"
        };
      case "sidebar":
        return {
          title: "🎯 বিজ্ঞাপন দিন",
          description: "আপনার পণ্য এখানে দেখান",
          cta: "যোগাযোগ করুন",
          bgColor: "bg-gradient-to-r from-orange-50 to-red-50",
          textColor: "text-orange-700"
        };
      default:
        return {
          title: "📢 বিজ্ঞাপন",
          description: "এখানে আপনার বিজ্ঞাপন দিতে পারেন",
          cta: "যোগাযোগ করুন",
          bgColor: "bg-gradient-to-r from-gray-50 to-slate-50",
          textColor: "text-gray-700"
        };
    }
  };

  const adContent = getAdContent();

  return (
    <div className={cn("relative", className)}>
      <Card className={cn(
        "relative overflow-hidden border-2 border-dashed border-muted-foreground/20",
        adContent.bgColor
      )}>
        <button
          onClick={() => setIsVisible(false)}
          className="absolute top-2 right-2 p-1 rounded-full bg-white/80 hover:bg-white text-muted-foreground hover:text-foreground transition-colors z-10"
          aria-label="বিজ্ঞাপন বন্ধ করুন"
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
            >
              {adContent.cta}
              <ExternalLink className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
        {/* Watermark */}
        <div className="absolute bottom-1 right-2 text-xs text-muted-foreground/50">
          বিজ্ঞাপন
        </div>
      </Card>
    </div>
  );
};

export default Advertisement;