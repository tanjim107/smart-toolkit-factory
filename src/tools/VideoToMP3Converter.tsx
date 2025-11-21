import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Upload, Download, Music } from "lucide-react";
import { toast } from "sonner";
import { FFmpeg } from "@ffmpeg/ffmpeg";
import { fetchFile, toBlobURL } from "@ffmpeg/util";

const VideoToMP3Converter = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isConverting, setIsConverting] = useState(false);
  const [convertedAudio, setConvertedAudio] = useState<string | null>(null);
  const [isFFmpegLoaded, setIsFFmpegLoaded] = useState(false);
  const [progress, setProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const ffmpegRef = useRef(new FFmpeg());

  useEffect(() => {
    const loadFFmpeg = async () => {
      const ffmpeg = ffmpegRef.current;
      
      // Set up progress listener
      ffmpeg.on('progress', ({ progress: prog }) => {
        setProgress(Math.round(prog * 100));
      });
      
      try {
        const baseURL = 'https://unpkg.com/@ffmpeg/core@0.12.6/dist/umd';
        await ffmpeg.load({
          coreURL: await toBlobURL(`${baseURL}/ffmpeg-core.js`, 'text/javascript'),
          wasmURL: await toBlobURL(`${baseURL}/ffmpeg-core.wasm`, 'application/wasm'),
        });
        setIsFFmpegLoaded(true);
      } catch (error) {
        console.error("Failed to load FFmpeg:", error);
        toast.error("Failed to initialize converter");
      }
    };
    loadFFmpeg();
  }, []);

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
    if (!selectedFile || !isFFmpegLoaded) return;

    setIsConverting(true);
    setProgress(0);
    toast.info("Converting video to MP3...");

    try {
      const ffmpeg = ffmpegRef.current;
      
      // Write input file
      await ffmpeg.writeFile("input.video", await fetchFile(selectedFile));
      
      // Convert to MP3
      await ffmpeg.exec(["-i", "input.video", "-q:a", "0", "-map", "a", "output.mp3"]);
      
      // Read output file
      const data = await ffmpeg.readFile("output.mp3");
      const blob = new Blob([new Uint8Array(data as Uint8Array)], { type: "audio/mp3" });
      const url = URL.createObjectURL(blob);
      
      setConvertedAudio(url);
      setProgress(100);
      toast.success("Conversion complete!");
    } catch (error) {
      console.error("Conversion error:", error);
      toast.error("Failed to convert video. Please try again.");
      setProgress(0);
    } finally {
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
    setProgress(0);
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
            <>
              {isConverting && (
                <div className="space-y-2">
                  <Progress value={progress} className="w-full" />
                  <p className="text-sm text-center text-muted-foreground">
                    Converting... {progress}%
                  </p>
                </div>
              )}
              <Button
                onClick={convertToMP3}
                disabled={isConverting || !isFFmpegLoaded}
                className="w-full"
              >
                {!isFFmpegLoaded ? "Loading converter..." : isConverting ? "Converting..." : "Convert to MP3"}
              </Button>
            </>
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
