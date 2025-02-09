import React, { useEffect, useRef } from 'react';
import { BrowserMultiFormatReader, BarcodeFormat } from '@zxing/browser';
import { DecodeHintType } from '@zxing/library';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle, Camera } from 'lucide-react';
import { Button } from './ui/button';

interface BarcodeScannerProps {
  onResult: (product: any) => void;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function BarcodeScanner({
  onResult,
  open,
  onOpenChange,
}: BarcodeScannerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [error, setError] = React.useState<string>('');
  const [scanning, setScanning] = React.useState(false);
  const [hasDetectedBarcode, setHasDetectedBarcode] = React.useState(false);
  const [cameraPermission, setCameraPermission] =
    React.useState<boolean>(false);
  console.log(`Open = ${open}`);
  // Keep track of the barcode reader instance
  const codeReaderRef = useRef<BrowserMultiFormatReader | null>(null);
  // Limit barcode formats to common food item types
  const hints = new Map();
  hints.set(DecodeHintType.POSSIBLE_FORMATS, [
    BarcodeFormat.EAN_13,
    BarcodeFormat.UPC_A,
    BarcodeFormat.QR_CODE,
  ]);
  hints.set(DecodeHintType.TRY_HARDER, true);

  const startScanning = async () => {
    console.log('Start scanning');
    setTimeout(async () => {
      if (!videoRef.current) {
        console.error('Video element not ready');
        return;
      }

      console.log('Hello');
      try {
        setError('');
        setScanning(true);

        // Request camera permission and start the video stream
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: 'environment' },
        });

        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          await videoRef.current.play();
          setCameraPermission(true);
          console.log('Camera access granted');
          // Initialize barcode reader
          codeReaderRef.current = new BrowserMultiFormatReader();
          codeReaderRef.current.decodeFromVideoDevice(
            undefined,
            videoRef.current,
            async (result, err) => {
              if (result && !hasDetectedBarcode) {
                setHasDetectedBarcode(true);
                const barcodeValue = result.getText();
                console.log('Barcode detected:', barcodeValue);

                try {
                  const response = await getProductFromBarcode(barcodeValue);
                  if (response.product) {
                    onResult(response.product);
                    onOpenChange(false);

                    // Cleanup
                    stopCamera();
                    setScanning(false);
                  }
                } catch (err) {
                  setError('Error fetching product details. Please try again.');
                  setHasDetectedBarcode(false); // Reset on error to allow retry
                }
              }
            }
          );
        }
      } catch (err) {
        console.error('Camera access error:', err);
        setError(
          'Failed to access the camera. Please check permissions or try again.'
        );
        setScanning(false);
      }
    }, 100); // Wait for 100ms to ensure rendering
  };

  const stopCamera = () => {
    if (videoRef.current?.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach((track) => track.stop());
      videoRef.current.srcObject = null;
    }

    // Reset barcode reader
    if (codeReaderRef.current) {
      // codeReaderRef.current?.reset();
      codeReaderRef.current = null;
    }
    setHasDetectedBarcode(false); // Reset the flag
    setScanning(false);
    setCameraPermission(false);
  };

  useEffect(() => {
    if (open && !scanning) {
      startScanning();
    }

    return () => {
      // Cleanup when dialog closes
      console.log('Cleanup');
      stopCamera();
    };
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-background">
        <DialogHeader>
          <DialogTitle>Scan Barcode</DialogTitle>
        </DialogHeader>

        <div className="relative w-full aspect-square rounded-lg overflow-hidden bg-muted">
          {!cameraPermission && !error && (
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <Camera className="w-8 h-8 mb-2 text-muted-foreground" />
              <p className="text-sm text-muted-foreground">
                Requesting camera access...
              </p>
            </div>
          )}
          <video
            ref={videoRef}
            className="w-full h-full object-cover"
            playsInline
            muted
          />
        </div>

        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
            <Button
              variant="outline"
              size="sm"
              onClick={startScanning}
              className="mt-2"
            >
              Try Again
            </Button>
          </Alert>
        )}

        {scanning && (
          <div className="text-center text-sm text-muted-foreground">
            Position the barcode within the camera view
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}

// Helper function to get product from barcode - implement this in your API
async function getProductFromBarcode(barcode: string) {
  try {
    const response = await fetch(
      `https://world.openfoodfacts.org/api/v3/product/${barcode}.json`
    );
    if (!response.ok) throw new Error('Failed to fetch product');
    return await response.json();
  } catch (error) {
    throw new Error('Error fetching product details');
  }
}
