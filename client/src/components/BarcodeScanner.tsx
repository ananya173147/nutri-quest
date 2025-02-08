import { useEffect, useState } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';
import { Button } from './ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { getProductFromBarcode } from '@/api/barcode';

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
  const [error, setError] = useState<string>('');

  useEffect(() => {
    if (open) {
      const scanner = new Html5QrcodeScanner(
        'reader',
        {
          fps: 10,
          qrbox: { width: 250, height: 250 },
          showTorchButtonIfSupported: true,
          aspectRatio: 1.0,
        },
        false
      );

      scanner.render(
        async (decodedText) => {
          try {
            const result = await getProductFromBarcode(decodedText);
            if (result.product) {
              onResult(result.product);
              scanner.clear();
              onOpenChange(false);
            }
          } catch (error) {
            setError('Error scanning barcode. Please try again.');
          }
        },
        (errorMessage) => {
          console.log('Scan error:', errorMessage);
        }
      );

      return () => {
        scanner.clear();
      };
    }
  }, [open]); // Re-run when `open` changes

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-background">
        <DialogHeader>
          <DialogTitle>Scan Barcode</DialogTitle>
        </DialogHeader>
        <div id="reader" className="w-full"></div>
        {error && <p className="text-red-500">{error}</p>}
      </DialogContent>
    </Dialog>
  );
}
