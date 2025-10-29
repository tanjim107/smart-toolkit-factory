import React, { useState, useEffect, useRef } from "react";
import { Html5QrcodeScanner, Html5QrcodeSupportedFormats } from "html5-qrcode";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";
import { Copy, ExternalLink } from "lucide-react";

const QRBarcodeScanner = () => {
  const [scanResult, setScanResult] = useState<string>("");
  const [isScanning, setIsScanning] = useState(false);
  const scannerRef = useRef<Html5QrcodeScanner | null>(null);
  const scannerDivId = "qr-barcode-reader";

  useEffect(() => {
    return () => {
      if (scannerRef.current) {
        scannerRef.current.clear().catch(console.error);
      }
    };
  }, []);

  const startScanning = () => {
    if (scannerRef.current) {
      scannerRef.current.clear().catch(console.error);
    }

    setIsScanning(true);
    
    // Delay initialization to ensure DOM element is rendered
    setTimeout(() => {
      const scanner = new Html5QrcodeScanner(
        scannerDivId,
        {
          fps: 10,
          qrbox: { width: 250, height: 250 },
          formatsToSupport: [
            Html5QrcodeSupportedFormats.QR_CODE,
            Html5QrcodeSupportedFormats.EAN_13,
            Html5QrcodeSupportedFormats.EAN_8,
            Html5QrcodeSupportedFormats.CODE_128,
            Html5QrcodeSupportedFormats.CODE_39,
            Html5QrcodeSupportedFormats.UPC_A,
            Html5QrcodeSupportedFormats.UPC_E,
          ],
          showTorchButtonIfSupported: true,
        },
        true
      );

      scanner.render(
        (decodedText) => {
          setScanResult(decodedText);
          setIsScanning(false);
          scanner.clear().catch(console.error);
          toast({
            title: "Scan Successful",
            description: "Code detected and decoded",
          });
        },
        (errorMessage) => {
          // Silent fail for continuous scanning
        }
      );

      scannerRef.current = scanner;
    }, 100);
  };

  const stopScanning = () => {
    if (scannerRef.current) {
      scannerRef.current.clear().catch(console.error);
      scannerRef.current = null;
    }
    setIsScanning(false);
  };

  const copyToClipboard = () => {
    if (scanResult) {
      navigator.clipboard.writeText(scanResult);
      toast({
        title: "Copied",
        description: "Scan result copied to clipboard",
      });
    }
  };

  const openLink = () => {
    if (scanResult && (scanResult.startsWith("http://") || scanResult.startsWith("https://"))) {
      window.open(scanResult, "_blank");
    }
  };

  const isUrl = scanResult.startsWith("http://") || scanResult.startsWith("https://");

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold mb-2">Scanner</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Scan QR codes and barcodes using your device camera
            </p>
          </div>

          {!isScanning && !scanResult && (
            <Button onClick={startScanning} className="w-full">
              Start Scanning
            </Button>
          )}

          {isScanning && (
            <div className="space-y-4">
              <div id={scannerDivId} className="w-full" />
              <Button onClick={stopScanning} variant="outline" className="w-full">
                Stop Scanning
              </Button>
            </div>
          )}

          {scanResult && (
            <div className="space-y-4">
              <div className="p-4 bg-muted rounded-lg">
                <p className="text-sm font-medium mb-2">Scan Result:</p>
                <p className="text-sm break-all">{scanResult}</p>
              </div>

              <div className="flex gap-2">
                <Button onClick={copyToClipboard} variant="outline" className="flex-1">
                  <Copy className="w-4 h-4 mr-2" />
                  Copy
                </Button>
                {isUrl && (
                  <Button onClick={openLink} variant="outline" className="flex-1">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Open Link
                  </Button>
                )}
              </div>

              <Button
                onClick={() => {
                  setScanResult("");
                  startScanning();
                }}
                className="w-full"
              >
                Scan Again
              </Button>
            </div>
          )}
        </div>
      </Card>

      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-2">Supported Formats</h3>
        <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
          <li>QR Code</li>
          <li>EAN-13 (Product barcodes)</li>
          <li>EAN-8</li>
          <li>Code 128</li>
          <li>Code 39</li>
          <li>UPC-A</li>
          <li>UPC-E</li>
        </ul>
      </Card>
    </div>
  );
};

export default QRBarcodeScanner;
