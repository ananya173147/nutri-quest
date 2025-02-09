import { useInventory, useAddProduct, useRemoveProduct } from '@/api/inventory';
import { useToast } from '@/hooks/useToast';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Trash2 } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { ProductScanner } from '@/components/ProductScanner';
import { useState, useCallback } from 'react';

export function Inventory() {
  const { data: inventory = [], isLoading, error } = useInventory();
  const addProductMutation = useAddProduct();
  const removeProductMutation = useRemoveProduct();
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [scannerOpen, setScannerOpen] = useState(false);
  const { toast } = useToast();
  const { register, handleSubmit, reset, setValue } = useForm();

  const handleScanResult = useCallback(
    (product: any) => {
      setScannerOpen(false);
      if (product?.product_name) {
        setValue('name', product.product_name);
        setTimeout(() => setAddDialogOpen(true), 100);
      } else {
        toast({
          variant: 'destructive',
          title: 'Error',
          description: 'Invalid product scan result',
        });
      }
    },
    [setValue, toast]
  );

  const onAddProduct = async (data: any) => {
    try {
      await addProductMutation.mutateAsync(data);
      setAddDialogOpen(false);
      reset();
      toast({
        title: 'Success',
        description: 'Product added successfully',
      });
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: (error as Error).message,
      });
    }
  };

  const onRemoveProduct = async (id: string) => {
    try {
      await removeProductMutation.mutateAsync(id);
      toast({
        title: 'Success',
        description: 'Product removed successfully',
      });
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: (error as Error).message,
      });
    }
  };

  if (isLoading) return <div>Loading inventory...</div>;
  if (error)
    return <div className="text-red-500">Error loading inventory.</div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        {/* <h1 className="text-3xl font-bold">Inventory</h1> */}
        {/* <Button
          className="bg-black text-white px-4 py-2 rounded-md flex items-center"
          onClick={() => setScannerOpen(true)}
        >
          <Scan className="w-4 h-4 mr-2" />
          Scan Product BarCode
        </Button> */}
        <ProductScanner
          open={scannerOpen}
          onOpenChange={setScannerOpen}
          onResult={handleScanResult}
        />
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Product</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Quantity</TableHead>
              <TableHead>Expiry Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {inventory.map((product) => (
              <TableRow key={product._id}>
                <TableCell>{product.name}</TableCell>
                <TableCell>{product.category}</TableCell>
                <TableCell>{product.quantity}</TableCell>
                <TableCell>
                  {new Date(product.expiryDate).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  <Badge
                    variant={
                      new Date(product.expiryDate) < new Date()
                        ? 'destructive'
                        : new Date(product.expiryDate) <
                          new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
                        ? 'warning'
                        : 'success'
                    }
                  >
                    {new Date(product.expiryDate) < new Date()
                      ? 'Expired'
                      : new Date(product.expiryDate) <
                        new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
                      ? 'Expiring Soon'
                      : 'Good'}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onRemoveProduct(product._id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
