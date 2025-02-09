import React, { useState } from 'react';
import { useAddProduct } from '@/api/inventory';
import { useToast } from '@/hooks/useToast';

interface ProductFormProps {
  scannedProduct: Partial<Product>;
  onSuccess: () => void;
}

export const ProductForm: React.FC<ProductFormProps> = ({
  scannedProduct,
  onSuccess,
}) => {
  const [formData, setFormData] = useState({
    expiryDate: '',
    quantity: 1,
    category: '',
  });

  const { toast } = useToast();
  const addProductMutation = useAddProduct();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const finalProduct = { ...scannedProduct, ...formData };

    try {
      await addProductMutation.mutateAsync(finalProduct);
      toast({ title: 'Success', description: 'Product added successfully!' });
      onSuccess();
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to add product. Please try again.',
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-lg font-bold">Add Product</h2>
      <p>
        <strong>Name:</strong> {scannedProduct.name || 'N/A'}
      </p>
      <p>
        <strong>Calories:</strong> {scannedProduct.calories || 'N/A'}
      </p>
      <p>
        <strong>Ingredients:</strong> {scannedProduct.ingredients || 'N/A'}
      </p>

      <label>
        Expiry Date:
        <input
          type="date"
          name="expiryDate"
          value={formData.expiryDate}
          onChange={handleChange}
          required
        />
      </label>

      <label>
        Quantity:
        <input
          type="number"
          name="quantity"
          value={formData.quantity}
          onChange={handleChange}
          required
          min="1"
        />
      </label>

      <label>
        Category:
        <input
          type="text"
          name="category"
          value={formData.category}
          onChange={handleChange}
          required
        />
      </label>

      <button
        type="submit"
        className="bg-blue-500 text-white p-2 rounded"
        disabled={addProductMutation.isLoading}
      >
        {addProductMutation.isLoading ? 'Adding...' : 'Add to Inventory'}
      </button>
    </form>
  );
};
