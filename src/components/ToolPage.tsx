
import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getToolById } from "@/data/tools";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft } from "lucide-react";
import { Button } from "./ui/button";
import SEOHead from "./SEOHead";
import UsageInstructions from "./UsageInstructions";
import AdSpace from "./AdSpace";

// Import all tool components
import PercentageCalculator from "@/tools/PercentageCalculator";
import GSTCalculator from "@/tools/GSTCalculator";
import EMICalculator from "@/tools/EMICalculator";
import ImprovedAgeCalculator from "@/tools/ImprovedAgeCalculator";
import ImprovedDateDifferenceCalculator from "@/tools/ImprovedDateDifferenceCalculator";
import ProfitLossCalculator from "@/tools/ProfitLossCalculator";
import AreaCalculator from "@/tools/AreaCalculator";
import EcommerceProfitCalculator from "@/tools/EcommerceProfitCalculator";
import GmailGenerator from "@/tools/GmailGenerator";
import QRCodeGenerator from "@/tools/QRCodeGenerator";
import PasswordGenerator from "@/tools/PasswordGenerator";
import ImageConverter from "@/tools/ImageConverter";
import ImageCompressor from "@/tools/ImageCompressor";
import WordCounter from "@/tools/WordCounter";
import ImageToQRCode from "@/tools/ImageToQRCode";
import FileCompressor from "@/tools/FileCompressor";
import VideoToMP3Converter from "@/tools/VideoToMP3Converter";
import Calculator from "@/pages/Calculator";

const ToolPage: React.FC = () => {
  const { toolId } = useParams<{ toolId: string }>();
  const navigate = useNavigate();
  const tool = getToolById(toolId || "");
  const { toast } = useToast();

  // If tool not found, show message
  if (!tool) {
    React.useEffect(() => {
      toast({
        title: "Tool not found",
        description: "The requested tool does not exist.",
        variant: "destructive",
      });
    }, [toast]);

    return (
      <div className="flex flex-col items-center justify-center h-[50vh]">
        <div className="text-center max-w-md">
          <h1 className="text-9xl font-bold text-primary/20">404</h1>
          <h2 className="text-2xl font-bold mt-6 mb-3">Page not found</h2>
          <p className="text-muted-foreground mb-8">
            The page you are looking for doesn't exist or has been moved.
          </p>
          
          <Button onClick={() => navigate("/")} className="flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" />
            <span>Back to homepage</span>
          </Button>
        </div>
      </div>
    );
  }

  // Render different tool components based on the tool ID
  const renderToolContent = () => {
    switch (tool.id) {
      case "calculator":
        return <Calculator />;
      case "percentage-calculator":
        return <PercentageCalculator />;
      case "gst-calculator":
        return <GSTCalculator />;
      case "emi-calculator":
        return <EMICalculator />;
      case "age-calculator":
        return <ImprovedAgeCalculator />;
      case "date-difference":
        return <ImprovedDateDifferenceCalculator />;
      case "profit-loss":
        return <ProfitLossCalculator />;
      case "area-calculator":
        return <AreaCalculator />;
      case "ecommerce-profit":
        return <EcommerceProfitCalculator />;
      case "gmail-generator":
        return <GmailGenerator />;
      case "qr-code-generator":
        return <QRCodeGenerator />;
      case "password-generator":
        return <PasswordGenerator />;
      case "image-converter":
        return <ImageConverter />;
      case "image-compressor":
        return <ImageCompressor />;
      case "word-counter":
        return <WordCounter />;
      case "image-to-qr":
        return <ImageToQRCode />;
      case "file-compressor":
        return <FileCompressor />;
      case "video-to-mp3":
        return <VideoToMP3Converter />;
      default:
        return (
          <div className="flex items-center justify-center p-12">
            <p className="text-center">
              This tool is currently under development.
            </p>
          </div>
        );
    }
  };

  return (
    <>
      {/* SEO Head Component */}
      <SEOHead tool={tool} />
      
      <div className="container mx-auto py-8 max-w-4xl">
        <AdSpace 
          position="top" 
          className="mb-6 flex justify-center"
          adCode={`<script type="text/javascript">
            atOptions = {
              'key' : 'ec4628848dbefce1f8db6f8fc0976c19',
              'format' : 'iframe',
              'height' : 90,
              'width' : 728,
              'params' : {}
            };
          </script>
          <script type="text/javascript" src="//www.highperformanceformat.com/ec4628848dbefce1f8db6f8fc0976c19/invoke.js"></script>`}
        />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-6"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className={cn("p-2 rounded-md", tool.color)}>
              <tool.icon className="w-5 h-5" />
            </div>
            <h1 className="text-2xl font-bold">{tool.name}</h1>
          </div>
          <p className="text-muted-foreground">{tool.description}</p>
          <Separator className="mt-4" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="glass-darker p-6 rounded-xl shadow-glass border border-border/10"
        >
          {renderToolContent()}
        </motion.div>

        <AdSpace 
          position="middle" 
          className="my-6 flex justify-center"
          adCode={`<script type="text/javascript">
            atOptions = {
              'key' : '4950b1c28a30463619127963ce9ed6d9',
              'format' : 'iframe',
              'height' : 50,
              'width' : 320,
              'params' : {}
            };
          </script>
          <script type="text/javascript" src="//www.highperformanceformat.com/4950b1c28a30463619127963ce9ed6d9/invoke.js"></script>`}
        />

        {/* Usage Instructions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          <UsageInstructions tool={tool} />
        </motion.div>

        <AdSpace 
          position="bottom" 
          className="mt-6 flex justify-center"
          adCode={`<script type='text/javascript' src='//pl25599361.profitableratecpm.com/79/b2/89/79b289f9f560997b3a7e4def6618b167.js'></script>`}
        />
      </div>
    </>
  );
};

export default ToolPage;
