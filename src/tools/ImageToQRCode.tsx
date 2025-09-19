import React, { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Upload, Download, ImageIcon, QrCode, Eye } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const ImageToQRCode: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>("");
  const [qrCodeUrl, setQrCodeUrl] = useState<string>("");
  const [imageDataForQR, setImageDataForQR] = useState<string>("");
  const [qrSize, setQrSize] = useState<number>(300);
  const [imageLoaded, setImageLoaded] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleImageSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        toast({
          title: "File too large",
          description: "Please select an image under 5MB",
          variant: "destructive",
        });
        return;
      }

      setSelectedImage(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setImagePreview(result);
        generateQRCodeFromImage(result);
      };
      reader.readAsDataURL(file);
    }
  };

  const generateQRCodeFromImage = async (imageDataUrl: string) => {
    try {
      // Create a canvas to compress the image for QR code compatibility
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const img = new Image();
      
      img.onload = () => {
        // Compress image to fit QR code data limitations
        // QR codes can handle up to ~2,900 characters for binary data
        const maxDimension = 100; // Smaller size for better QR code compatibility
        let { width, height } = img;
        
        // Calculate aspect ratio and resize
        if (width > height) {
          if (width > maxDimension) {
            height = (height * maxDimension) / width;
            width = maxDimension;
          }
        } else {
          if (height > maxDimension) {
            width = (width * maxDimension) / height;
            height = maxDimension;
          }
        }
        
        canvas.width = width;
        canvas.height = height;
        ctx?.drawImage(img, 0, 0, width, height);
        
        // Convert to compressed base64 data URL
        const compressedDataUrl = canvas.toDataURL('image/jpeg', 0.4);
        
        // Check if data URL is too large for QR code (approximate limit)
        let finalImageData = compressedDataUrl;
        if (compressedDataUrl.length > 2500) {
          // If still too large, compress further
          const furtherCompressed = canvas.toDataURL('image/jpeg', 0.2);
          if (furtherCompressed.length > 2500) {
            toast({
              title: "Image too large",
              description: "Image is too large for QR code. Please use a smaller image.",
              variant: "destructive",
            });
            return;
          }
          finalImageData = furtherCompressed;
        }
        
        setImageDataForQR(finalImageData);
        
        // Generate QR code with the compressed image data
        const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=${qrSize}x${qrSize}&data=${encodeURIComponent(finalImageData)}`;
        setQrCodeUrl(qrUrl);
        setImageLoaded(false);
      };
      
      img.onerror = () => {
        toast({
          title: "Error",
          description: "Failed to process image for QR code generation",
          variant: "destructive",
        });
      };
      
      img.src = imageDataUrl;
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to generate QR code from image",
        variant: "destructive",
      });
    }
  };

  const handleSizeChange = (value: number[]) => {
    const newSize = value[0];
    setQrSize(newSize);
    if (selectedImage && imagePreview) {
      generateQRCodeFromImage(imagePreview);
    }
  };

  const handleImageLoaded = () => {
    setImageLoaded(true);
  };

  const handleImageError = () => {
    toast({
      title: "Error",
      description: "Failed to load QR code image",
      variant: "destructive",
    });
  };

  const downloadQRCode = async () => {
    if (!qrCodeUrl) {
      toast({
        title: "No QR Code",
        description: "Please upload an image first to generate a QR code",
        variant: "destructive",
      });
      return;
    }

    try {
      const response = await fetch(qrCodeUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `image-qr-code-${qrSize}x${qrSize}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);

      toast({
        title: "Success",
        description: "QR code downloaded successfully!",
      });
    } catch (error) {
      toast({
        title: "Download Failed",
        description: "Could not download the QR code. Please try again.",
        variant: "destructive",
      });
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const previewImageFromQR = () => {
    if (!imageDataForQR) {
      toast({
        title: "No image data",
        description: "Please upload an image first",
        variant: "destructive",
      });
      return;
    }
    
    // Open the image data in a new window/tab
    const newWindow = window.open();
    if (newWindow) {
      newWindow.document.write(`
        <html>
          <head><title>Image from QR Code</title></head>
          <body style="margin:0; padding:20px; background:#f0f0f0; display:flex; justify-content:center; align-items:center; min-height:100vh;">
            <img src="${imageDataForQR}" style="max-width:100%; max-height:100%; object-fit:contain;" alt="Image from QR Code" />
          </body>
        </html>
      `);
      newWindow.document.close();
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ImageIcon className="w-5 h-5" />
            Upload Image
          </CardTitle>
          <CardDescription>
            Select an image file to encode directly into a QR code. When scanned, the QR code will display your uploaded image.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="image-upload">Choose Image</Label>
            <div className="flex items-center gap-4">
              <Input
                id="image-upload"
                type="file"
                accept="image/*"
                onChange={handleImageSelect}
                ref={fileInputRef}
                className="hidden"
              />
              <Button
                type="button"
                variant="outline"
                onClick={triggerFileInput}
                className="flex items-center gap-2"
              >
                <Upload className="w-4 h-4" />
                Upload Image
              </Button>
              {selectedImage && (
                <span className="text-sm text-muted-foreground">
                  {selectedImage.name}
                </span>
              )}
            </div>
          </div>

          {imagePreview && (
            <div className="space-y-2">
              <Label>Image Preview</Label>
              <div className="border rounded-lg p-4 bg-muted/50">
                <img
                  src={imagePreview}
                  alt="Selected image"
                  className="max-w-full max-h-48 object-contain mx-auto rounded"
                />
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <QrCode className="w-5 h-5" />
            QR Code Settings
          </CardTitle>
          <CardDescription>
            Customize the size of your QR code
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="size">Size: {qrSize}x{qrSize} pixels</Label>
            <Slider
              id="size"
              min={200}
              max={500}
              step={50}
              value={[qrSize]}
              onValueChange={handleSizeChange}
              className="w-full"
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Generated QR Code</CardTitle>
          <CardDescription>
            QR code containing your uploaded image data. Scan to view the original image.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {qrCodeUrl ? (
            <div className="space-y-4">
              <div className="flex justify-center">
                <div className="border rounded-lg p-4 bg-white">
                  {!imageLoaded && (
                    <div 
                      className="flex items-center justify-center bg-muted rounded"
                      style={{ width: qrSize, height: qrSize }}
                    >
                      <span className="text-muted-foreground">Loading...</span>
                    </div>
                  )}
                  <img
                    src={qrCodeUrl}
                    alt="Generated QR Code"
                    onLoad={handleImageLoaded}
                    onError={handleImageError}
                    className={`max-w-full h-auto ${!imageLoaded ? 'hidden' : ''}`}
                    style={{ width: qrSize, height: qrSize }}
                  />
                </div>
              </div>
              
              <div className="flex justify-center gap-3">
                <Button 
                  onClick={previewImageFromQR} 
                  variant="outline" 
                  className="flex items-center gap-2"
                >
                  <Eye className="w-4 h-4" />
                  Preview Image from QR
                </Button>
                <Button onClick={downloadQRCode} className="flex items-center gap-2">
                  <Download className="w-4 h-4" />
                  Download QR Code
                </Button>
              </div>
            </div>
          ) : (
            <div className="text-center py-12 text-muted-foreground">
              <ImageIcon className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>Upload an image to generate a QR code</p>
            </div>
          )}
        </CardContent>
      </Card>

      <Card className="bg-muted/50">
        <CardContent className="pt-6">
          <div className="text-sm text-muted-foreground space-y-2">
            <p><strong>Note:</strong> The QR code contains the actual image data encoded as base64. Scanning it will display your uploaded image.</p>
            <p><strong>Size Limit:</strong> Images are automatically compressed to fit QR code limitations. Very large images may not work.</p>
            <p><strong>Usage:</strong> Scan the QR code with any QR reader to view the original uploaded image directly.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ImageToQRCode;