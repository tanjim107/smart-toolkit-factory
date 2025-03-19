
import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Download } from "lucide-react";

const QRCodeGenerator = () => {
  const { toast } = useToast();
  
  const [qrContent, setQrContent] = useState<string>("");
  const [qrType, setQrType] = useState<string>("text");
  const [qrSize, setQrSize] = useState<number>(200);
  const [qrColor, setQrColor] = useState<string>("#000000");
  const [bgColor, setBgColor] = useState<string>("#FFFFFF");
  
  const [qrCodeUrl, setQrCodeUrl] = useState<string>("");
  const [isGenerating, setIsGenerating] = useState<boolean>(false);

  // Generate QR code using Google Chart API
  const generateQRCode = () => {
    if (!qrContent) {
      toast({
        title: "Input Error",
        description: "Please enter content for the QR code",
        variant: "destructive",
      });
      return;
    }
    
    setIsGenerating(true);
    
    // Prepare content based on type
    let finalContent = qrContent;
    
    if (qrType === "url" && !qrContent.startsWith("http")) {
      finalContent = "https://" + qrContent;
    } else if (qrType === "email") {
      finalContent = "mailto:" + qrContent;
    } else if (qrType === "phone") {
      finalContent = "tel:" + qrContent;
    }
    
    // Encode content for URL
    const encodedContent = encodeURIComponent(finalContent);
    
    // Google Chart API for QR code generation
    const apiUrl = `https://chart.googleapis.com/chart?cht=qr&chs=${qrSize}x${qrSize}&chl=${encodedContent}&chco=${qrColor.substring(1)}&chf=bg,s,${bgColor.substring(1)}`;
    
    setQrCodeUrl(apiUrl);
    setIsGenerating(false);
  };

  // Generate QR code when component mounts with default values
  useEffect(() => {
    if (qrContent) {
      generateQRCode();
    }
  }, [qrSize, qrColor, bgColor]);

  // Handle content input change based on type
  const handleContentChange = (value: string) => {
    setQrContent(value);
  };

  // Handle QR code download
  const downloadQRCode = () => {
    if (!qrCodeUrl) return;
    
    const a = document.createElement("a");
    a.href = qrCodeUrl;
    a.download = `qrcode-${Date.now()}.png`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    
    toast({
      title: "Downloaded!",
      description: "QR code has been downloaded",
    });
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <Tabs value={qrType} onValueChange={setQrType} className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="text">Text</TabsTrigger>
              <TabsTrigger value="url">URL</TabsTrigger>
              <TabsTrigger value="email">Email</TabsTrigger>
              <TabsTrigger value="phone">Phone</TabsTrigger>
            </TabsList>
            
            <TabsContent value="text" className="space-y-4 pt-4">
              <Textarea
                placeholder="Enter text for QR code"
                value={qrContent}
                onChange={(e) => handleContentChange(e.target.value)}
                className="min-h-[100px]"
              />
            </TabsContent>
            
            <TabsContent value="url" className="space-y-4 pt-4">
              <Input
                type="text"
                placeholder="Enter URL (e.g., example.com)"
                value={qrContent}
                onChange={(e) => handleContentChange(e.target.value)}
              />
            </TabsContent>
            
            <TabsContent value="email" className="space-y-4 pt-4">
              <Input
                type="email"
                placeholder="Enter email address"
                value={qrContent}
                onChange={(e) => handleContentChange(e.target.value)}
              />
            </TabsContent>
            
            <TabsContent value="phone" className="space-y-4 pt-4">
              <Input
                type="tel"
                placeholder="Enter phone number"
                value={qrContent}
                onChange={(e) => handleContentChange(e.target.value)}
              />
            </TabsContent>
          </Tabs>
          
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-2 block">QR Size (px)</label>
              <input
                type="range"
                min="100"
                max="500"
                step="50"
                value={qrSize}
                onChange={(e) => setQrSize(parseInt(e.target.value))}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>100px</span>
                <span>{qrSize}px</span>
                <span>500px</span>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium mb-2 block">QR Color</label>
                <div className="flex">
                  <input
                    type="color"
                    value={qrColor}
                    onChange={(e) => setQrColor(e.target.value)}
                    className="w-10 h-10 rounded-l-md border border-border"
                  />
                  <Input
                    type="text"
                    value={qrColor}
                    onChange={(e) => setQrColor(e.target.value)}
                    className="rounded-l-none"
                  />
                </div>
              </div>
              
              <div>
                <label className="text-sm font-medium mb-2 block">Background Color</label>
                <div className="flex">
                  <input
                    type="color"
                    value={bgColor}
                    onChange={(e) => setBgColor(e.target.value)}
                    className="w-10 h-10 rounded-l-md border border-border"
                  />
                  <Input
                    type="text"
                    value={bgColor}
                    onChange={(e) => setBgColor(e.target.value)}
                    className="rounded-l-none"
                  />
                </div>
              </div>
            </div>
          </div>
          
          <Button 
            onClick={generateQRCode} 
            className="w-full"
            disabled={!qrContent || isGenerating}
          >
            Generate QR Code
          </Button>
        </div>
        
        <div className="flex flex-col items-center justify-center">
          {qrCodeUrl ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="space-y-4 text-center"
            >
              <div className="p-4 bg-white rounded-md inline-block">
                <img
                  src={qrCodeUrl}
                  alt="Generated QR Code"
                  className="max-w-full h-auto"
                />
              </div>
              
              <Button 
                onClick={downloadQRCode}
                className="gap-2"
              >
                <Download className="w-4 h-4" />
                <span>Download QR Code</span>
              </Button>
            </motion.div>
          ) : (
            <div className="text-center text-muted-foreground p-8 border border-dashed border-border rounded-md">
              QR code will appear here after generation
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default QRCodeGenerator;
