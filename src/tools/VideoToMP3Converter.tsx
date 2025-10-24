import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Upload, Download, Music } from "lucide-react";
import { toast } from "sonner";

const VideoToMP3Converter = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isConverting, setIsConverting] = useState(false);
  const [convertedAudio, setConvertedAudio] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Check if it's a video file
      if (!file.type.startsWith("video/")) {
        toast.error("Please select a valid video file");
        return;
      }
      
      // Check file size (max 100MB)
      if (file.size > 100 * 1024 * 1024) {
        toast.error("File size must be less than 100MB");
        return;
      }
      
      setSelectedFile(file);
      setConvertedAudio(null);
      toast.success("Video file selected");
    }
  };

  const convertToMP3 = async () => {
    if (!selectedFile) return;

    setIsConverting(true);
    toast.info("Converting video to MP3...");

    try {
      // Create a video element to extract audio
      const video = document.createElement("video");
      video.src = URL.createObjectURL(selectedFile);

      await new Promise((resolve) => {
        video.onloadedmetadata = resolve;
      });

      // Create audio context
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      const source = audioContext.createMediaElementSource(video);
      const destination = audioContext.createMediaStreamDestination();
      source.connect(destination);

      // Record the audio
      const mediaRecorder = new MediaRecorder(destination.stream);
      const chunks: BlobPart[] = [];

      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          chunks.push(e.data);
        }
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(chunks, { type: "audio/mp3" });
        const url = URL.createObjectURL(blob);
        setConvertedAudio(url);
        setIsConverting(false);
        toast.success("Conversion complete!");
      };

      mediaRecorder.start();
      video.play();

      // Stop recording when video ends
      video.onended = () => {
        mediaRecorder.stop();
        audioContext.close();
      };
    } catch (error) {
      console.error("Conversion error:", error);
      toast.error("Failed to convert video. Please try again.");
      setIsConverting(false);
    }
  };

  const downloadMP3 = () => {
    if (!convertedAudio) return;

    const link = document.createElement("a");
    link.href = convertedAudio;
    link.download = `${selectedFile?.name.replace(/\.[^/.]+$/, "") || "audio"}.mp3`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success("MP3 downloaded successfully!");
  };

  const resetConverter = () => {
    setSelectedFile(null);
    setConvertedAudio(null);
    setIsConverting(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <div className="space-y-4">
          <div className="flex flex-col items-center justify-center border-2 border-dashed border-border rounded-lg p-8 text-center">
            <Music className="w-12 h-12 text-muted-foreground mb-4" />
            <input
              ref={fileInputRef}
              type="file"
              accept="video/*"
              onChange={handleFileSelect}
              className="hidden"
              id="video-input"
            />
            <label htmlFor="video-input">
              <Button variant="outline" className="cursor-pointer" asChild>
                <span>
                  <Upload className="w-4 h-4 mr-2" />
                  Select Video File
                </span>
              </Button>
            </label>
            {selectedFile && (
              <div className="mt-4 text-sm">
                <p className="font-medium">{selectedFile.name}</p>
                <p className="text-muted-foreground">
                  {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB
                </p>
              </div>
            )}
          </div>

          {selectedFile && !convertedAudio && (
            <Button
              onClick={convertToMP3}
              disabled={isConverting}
              className="w-full"
            >
              {isConverting ? "Converting..." : "Convert to MP3"}
            </Button>
          )}

          {convertedAudio && (
            <div className="space-y-4">
              <audio controls className="w-full">
                <source src={convertedAudio} type="audio/mp3" />
                Your browser does not support the audio element.
              </audio>
              
              <div className="flex gap-2">
                <Button onClick={downloadMP3} className="flex-1">
                  <Download className="w-4 h-4 mr-2" />
                  Download MP3
                </Button>
                <Button onClick={resetConverter} variant="outline" className="flex-1">
                  Convert Another
                </Button>
              </div>
            </div>
          )}
        </div>
      </Card>

      <Card className="p-6 bg-muted/50">
        <h3 className="font-semibold mb-2">Supported Formats</h3>
        <p className="text-sm text-muted-foreground mb-3">
          MP4, AVI, MOV, MKV, WebM, and other common video formats
        </p>
        <h3 className="font-semibold mb-2">Features</h3>
        <ul className="text-sm text-muted-foreground space-y-1">
          <li>• Extract audio from video files</li>
          <li>• Convert to MP3 format</li>
          <li>• Maximum file size: 100MB</li>
          <li>• All processing happens in your browser</li>
        </ul>
      </Card>
    </div>
  );
};

export default VideoToMP3Converter;
