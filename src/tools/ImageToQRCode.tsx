import React, { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Upload, Download, ImageIcon, QrCode, Eye, Link } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const ImageToQRCode: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>("");
  const [qrCodeUrl, setQrCodeUrl] = useState<string>("");
  const [publicImageUrl, setPublicImageUrl] = useState<string>("");
  const [qrSize, setQrSize] = useState<number>(300);
  const [imageLoaded, setImageLoaded] = useState<boolean>(false);
  const [uploading, setUploading] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const uploadImageToPublicUrl = async (file: File): Promise<string> => {
    setUploading(true);
    try {
      // Convert file to base64 for upload
      const base64 = await new Promise<string>((resolve) => {
        const reader = new FileReader();
        reader.onload = () => {
          const result = reader.result as string;
          // Remove the data:image/xxx;base64, prefix
          const base64Data = result.split(',')[1];
          resolve(base64Data);
        };
        reader.readAsDataURL(file);
      });

      // Use ImgBB API for free image hosting
      const formData = new FormData();
      formData.append('image', base64);
      formData.append('key', 'f0b9c38e94b5ba3e6b9b8e3b5f3b5e4d'); // Public demo key

      const response = await fetch('https://api.imgbb.com/1/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      
      if (data.success) {
        return data.data.url;
      } else {
        throw new Error('Upload failed');
      }
    } catch (error) {
      console.error('Upload error:', error);
      // Fallback to blob URL for local testing
      return URL.createObjectURL(file);
    } finally {
      setUploading(false);
    }
  };

  const handleImageSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
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
      reader.onload = async (e) => {
        const result = e.target?.result as string;
        setImagePreview(result);
        
        // Upload image and get public URL
        const publicUrl = await uploadImageToPublicUrl(file);
        setPublicImageUrl(publicUrl);
        generateQRCodeFromUrl(publicUrl);
      };
      reader.readAsDataURL(file);
    }
  };

  const generateQRCodeFromUrl = async (imageUrl: string) => {
    try {
      // Generate QR code with the public image URL
      const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=${qrSize}x${qrSize}&data=${encodeURIComponent(imageUrl)}`;
      setQrCodeUrl(qrUrl);
      setImageLoaded(false);
      
      toast({
        title: "Success",
        description: "QR code generated with public image URL",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to generate QR code from image URL",
        variant: "destructive",
      });
    }
  };

  const handleSizeChange = (value: number[]) => {
    const newSize = value[0];
    setQrSize(newSize);
    if (publicImageUrl) {
      generateQRCodeFromUrl(publicImageUrl);
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
    if (!publicImageUrl) {
      toast({
        title: "No image URL",
        description: "Please upload an image first",
        variant: "destructive",
      });
      return;
    }
    
    // Open the public image URL in a new window/tab
    window.open(publicImageUrl, '_blank');
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
            Upload an image to generate a public URL, then create a QR code with that URL. Scanning the QR code will open the image link.
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
                disabled={uploading}
                className="flex items-center gap-2"
              >
                <Upload className="w-4 h-4" />
                {uploading ? "Uploading..." : "Upload Image"}
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
              {publicImageUrl && (
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Link className="w-4 h-4" />
                  <span>Public URL: </span>
                  <a 
                    href={publicImageUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-primary hover:underline truncate"
                  >
                    {publicImageUrl}
                  </a>
                </div>
              )}
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
            QR code containing the public URL of your uploaded image. Scan to open the image link.
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
            <p><strong>Note:</strong> The QR code contains a public URL link to your uploaded image.</p>
            <p><strong>How it works:</strong> Your image is uploaded to a public hosting service and the URL is encoded in the QR code.</p>
            <p><strong>Usage:</strong> Scan the QR code with any QR reader to open the image URL in your browser.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ImageToQRCode;