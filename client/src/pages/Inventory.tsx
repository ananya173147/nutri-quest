import { useState } from "react"
import { useToast } from "@/hooks/useToast"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Plus, Trash2, Scan } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { useForm } from "react-hook-form"
import { Product, getInventory, addProduct, removeProduct } from "@/api/inventory"
import { BarcodeScanner } from "@/components/BarcodeScanner"

export function Inventory() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(false)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isScannerOpen, setIsScannerOpen] = useState(false)
  const { toast } = useToast()
  const { register, handleSubmit, reset, setValue } = useForm()

  const loadInventory = async () => {
    try {
      setLoading(true)
      const { products } = await getInventory()
      setProducts(products)
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: (error as Error).message,
      })
    } finally {
      setLoading(false)
    }
  }

  const onAddProduct = async (data: any) => {
    try {
      const { product } = await addProduct(data)
      setProducts([...products, product])
      setIsAddDialogOpen(false)
      reset()
      toast({
        title: "Success",
        description: "Product added successfully",
      })
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: (error as Error).message,
      })
    }
  }

  const onRemoveProduct = async (id: string) => {
    try {
      await removeProduct(id)
      setProducts(products.filter(p => p._id !== id))
      toast({
        title: "Success",
        description: "Product removed successfully",
      })
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: (error as Error).message,
      })
    }
  }

  const handleScanResult = (product: any) => {
    setValue("name", product.product_name)
    // Set other relevant fields from the scanned product
    setIsScannerOpen(false)
    setIsAddDialogOpen(true)
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Inventory</h1>
        <div className="flex gap-2">
          <Button onClick={() => setIsScannerOpen(true)}>
            <Scan className="w-4 h-4 mr-2" />
            Scan Barcode
          </Button>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Add Product
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-background">
              <DialogHeader>
                <DialogTitle>Add New Product</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit(onAddProduct)} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Product Name</Label>
                  <Input id="name" {...register("name", { required: true })} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Input id="category" {...register("category", { required: true })} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="quantity">Quantity</Label>
                  <Input
                    id="quantity"
                    type="number"
                    {...register("quantity", { required: true, min: 1 })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="expiryDate">Expiry Date</Label>
                  <Input
                    id="expiryDate"
                    type="date"
                    {...register("expiryDate", { required: true })}
                  />
                </div>
                <Button type="submit" className="w-full">Add Product</Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <BarcodeScanner 
        open={isScannerOpen}
        onOpenChange={setIsScannerOpen}
        onResult={handleScanResult}
      />

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
            {products.map((product) => (
              <TableRow key={product._id}>
                <TableCell>{product.name}</TableCell>
                <TableCell>{product.category}</TableCell>
                <TableCell>{product.quantity}</TableCell>
                <TableCell>{new Date(product.expiryDate).toLocaleDateString()}</TableCell>
                <TableCell>
                  <Badge variant={
                    new Date(product.expiryDate) < new Date() ? "destructive" :
                    new Date(product.expiryDate) < new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) ? "secondary" :
                    "default"
                  }>
                    {new Date(product.expiryDate) < new Date() ? "Expired" :
                     new Date(product.expiryDate) < new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) ? "Expiring Soon" :
                     "Good"}
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
  )
}