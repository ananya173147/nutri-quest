import React, { useState } from 'react';
import { BarcodeScanner } from './BarcodeScanner';
import { ProductForm } from './ProductForm';
import { Button } from '@/components/ui/button';
import { Scan } from 'lucide-react';

export const ProductScanner: React.FC = () => {
  const [scannedProduct, setScannedProduct] = useState<Partial<Product> | null>(
    null
  );
  const [open, setOpen] = useState(false);

  const handleScanResult = (product: any) => {
    setScannedProduct(product);
    setOpen(false);
  };

  return (
    <div className="flex flex-col items-center w-full">
      {/* Inventory Header with Scan Button */}
      <div className="w-full flex justify-between items-center mb-6 px-4">
        <h1 className="text-3xl font-bold">Inventory</h1>
        <Button
          onClick={() => setOpen(true)}
          className="bg-black text-white px-4 py-2 rounded-md flex items-center"
        >
          <Scan className="w-4 h-4 mr-2" />
          Scan Product
        </Button>
      </div>

      {/* Barcode Scanner */}
      <BarcodeScanner
        open={open}
        onOpenChange={setOpen}
        onResult={handleScanResult}
      />

      {/* Product Form */}
      {scannedProduct && (
        <div className="w-full flex justify-center mt-6">
          <ProductForm
            scannedProduct={scannedProduct}
            onSuccess={() => setScannedProduct(null)}
          />
        </div>
      )}
    </div>
  );
};
