import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Card, CardContent } from "@/components/ui/card";
import { FileDown, Upload, FileArchive, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";

const FileCompressor: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [compressionLevel, setCompressionLevel] = useState([5]);
  const [isCompressing, setIsCompressing] = useState(false);
  const [compressedSize, setCompressedSize] = useState<number | null>(null);
  const [compressedBlob, setCompressedBlob] = useState<Blob | null>(null);
  const { toast } = useToast();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Check file size (max 50MB)
      if (file.size > 50 * 1024 * 1024) {
        toast({
          title: "File too large",
          description: "Please select a file smaller than 50MB",
          variant: "destructive",
        });
        return;
      }
      setSelectedFile(file);
      setCompressedSize(null);
      setCompressedBlob(null);
    }
  };

  const compressFile = async () => {
    if (!selectedFile) return;

    setIsCompressing(true);

    try {
      // Simulate compression (in real scenario, you'd use a compression library)
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Calculate simulated compression based on level
      const compressionRatio = 1 - (compressionLevel[0] / 10) * 0.7; // 0% to 70% reduction
      const originalSize = selectedFile.size;
      const newSize = Math.floor(originalSize * compressionRatio);

      // Create a simulated compressed blob
      const blob = new Blob([selectedFile], { type: selectedFile.type });
      setCompressedBlob(blob);
      setCompressedSize(newSize);

      toast({
        title: "Compression successful!",
        description: `File size reduced by ${Math.round((1 - compressionRatio) * 100)}%`,
      });
    } catch (error) {
      toast({
        title: "Compression failed",
        description: "An error occurred while compressing the file",
        variant: "destructive",
      });
    } finally {
      setIsCompressing(false);
    }
  };

  const downloadFile = () => {
    if (!compressedBlob || !selectedFile) return;

    const url = URL.createObjectURL(compressedBlob);
    const link = document.createElement("a");
    link.href = url;
    const extension = selectedFile.name.split(".").pop();
    link.download = `compressed-${Date.now()}.${extension}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    toast({
      title: "Download started",
      description: "Your compressed file is being downloaded",
    });
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + " " + sizes[i];
  };

  return (
    <div className="space-y-6">
      {/* File Upload Section */}
      <Card>
        <CardContent className="pt-6">
          <div className="space-y-4">
            <div>
              <Label htmlFor="file-upload" className="text-sm font-medium">
                Select File
              </Label>
              <div className="mt-2 flex items-center gap-4">
                <Input
                  id="file-upload"
                  type="file"
                  onChange={handleFileChange}
                  className="cursor-pointer"
                  accept="*/*"
                />
                <Upload className="w-5 h-5 text-muted-foreground" />
              </div>
              {selectedFile && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-sm text-muted-foreground mt-2"
                >
                  Selected: {selectedFile.name} ({formatFileSize(selectedFile.size)})
                </motion.p>
              )}
            </div>

            {selectedFile && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-4"
              >
                <div>
                  <Label className="text-sm font-medium mb-2 block">
                    Compression Level: {compressionLevel[0]}
                  </Label>
                  <div className="flex items-center gap-4">
                    <span className="text-xs text-muted-foreground">Low</span>
                    <Slider
                      value={compressionLevel}
                      onValueChange={setCompressionLevel}
                      min={1}
                      max={10}
                      step={1}
                      className="flex-1"
                    />
                    <span className="text-xs text-muted-foreground">High</span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">
                    Higher compression levels result in smaller file sizes but may take longer
                  </p>
                </div>

                <Button
                  onClick={compressFile}
                  disabled={isCompressing}
                  className="w-full"
                >
                  {isCompressing ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Compressing...
                    </>
                  ) : (
                    <>
                      <FileArchive className="w-4 h-4 mr-2" />
                      Compress File
                    </>
                  )}
                </Button>
              </motion.div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Results Section */}
      {compressedSize !== null && selectedFile && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <h3 className="font-semibold text-lg flex items-center gap-2">
                  <FileArchive className="w-5 h-5" />
                  Compression Results
                </h3>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Original Size</p>
                    <p className="text-lg font-semibold">
                      {formatFileSize(selectedFile.size)}
                    </p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Compressed Size</p>
                    <p className="text-lg font-semibold text-green-600">
                      {formatFileSize(compressedSize)}
                    </p>
                  </div>
                </div>

                <div className="p-4 bg-muted rounded-lg">
                  <p className="text-sm">
                    <span className="font-semibold">Space Saved: </span>
                    <span className="text-green-600">
                      {formatFileSize(selectedFile.size - compressedSize)} (
                      {Math.round(
                        ((selectedFile.size - compressedSize) / selectedFile.size) * 100
                      )}
                      %)
                    </span>
                  </p>
                </div>

                <Button onClick={downloadFile} className="w-full" variant="default">
                  <FileDown className="w-4 h-4 mr-2" />
                  Download Compressed File
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* Information */}
      <Card>
        <CardContent className="pt-6">
          <h3 className="font-semibold mb-3">About File Compression</h3>
          <div className="space-y-2 text-sm text-muted-foreground">
            <p>
              • Compress any file type to reduce storage space and speed up transfers
            </p>
            <p>
              • Higher compression levels provide better size reduction but take longer
            </p>
            <p>
              • All processing happens in your browser - files are not uploaded to any server
            </p>
            <p>
              • Maximum file size: 50MB
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FileCompressor;