"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Pencil, Trash2, Plus } from "lucide-react";
import { toast } from "sonner";
import { Loader } from "@/components/Loader";
import { getAllProducts } from "@/lib/data";

const AdminPage = () => {
  const router = useRouter();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated, router]);

  useEffect(() => {
    setLoading(true);
    const fetchProducts = async () => {
      try {
        const data = await getAllProducts();
        setProducts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleAdd = () => {
    setCurrentProduct({
      title: "",
      price: 0,
      description: "",
      category: "",
      image: "https://fakestoreapi.com/img/placeholder.jpg",
    });
    setIsDialogOpen(true);
  };

  const handleEdit = (product) => {
    setCurrentProduct(product);
    setIsDialogOpen(true);
  };

  const handleDelete = (product) => {
    setCurrentProduct(product);
    setIsDeleteDialogOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!currentProduct) return;

    setIsSubmitting(true);
    try {
      const isNewProduct = !currentProduct.id;
      const url = isNewProduct
        ? "https://fakestoreapi.com/products"
        : `https://fakestoreapi.com/products/${currentProduct.id}`;

      const method = isNewProduct ? "POST" : "PUT";

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          ...(token && { Authorization: `Bearer ${token}` }),
        },
        body: JSON.stringify(currentProduct),
      });

      if (!res.ok) {
        throw new Error(
          `Failed to ${isNewProduct ? "create" : "update"} product`
        );
      }

      const updatedProduct = await res.json();

      if (isNewProduct) {
        setProducts([...products, updatedProduct]);
      } else {
        setProducts(
          products.map((p) => (p.id === updatedProduct.id ? updatedProduct : p))
        );
      }

      setIsDialogOpen(false);
      toast("Success!", {
        title: `Product ${isNewProduct ? "created" : "updated"}`,
        description: `${updatedProduct.title} has been ${
          isNewProduct ? "created" : "updated"
        } successfully.`,
      });
    } catch (error) {
      console.error("Error saving product:", error);
      toast("Success!", {
        variant: "destructive",
        title: "Error",
        description: `Failed to ${
          currentProduct.id ? "update" : "create"
        } product. Please try again.`,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleConfirmDelete = async () => {
    if (!currentProduct || !currentProduct.id) return;

    setIsSubmitting(true);
    try {
      const res = await fetch(
        `https://fakestoreapi.com/products/${currentProduct.id}`,
        {
          method: "DELETE",
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        }
      );

      if (!res.ok) {
        throw new Error("Failed to delete product");
      }

      setProducts(products.filter((p) => p.id !== currentProduct.id));
      setIsDeleteDialogOpen(false);
      toast("Success!", {
        title: "Product deleted",
        description: `${currentProduct.title} has been deleted successfully.`,
      });
    } catch (error) {
      console.error("Error deleting product:", error);
      toast("Success!", {
        variant: "destructive",
        title: "Error",
        description: "Failed to delete product. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="page-container">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Product Management</h1>
        <Button variant="secondary" onClick={handleAdd}>
          <Plus className="mr-2 h-4 w-4" /> Add Product
        </Button>
      </div>

      <div className="rounded-md border overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Image</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Category</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product.id}>
                <TableCell>
                  <div className="relative h-12 w-12 rounded bg-white">
                    <Image
                      src={product.image || "/placeholderImage.svg"}
                      alt={product.title}
                      fill
                      className="object-contain p-1"
                    />
                  </div>
                </TableCell>
                <TableCell className="place-items-center font-medium line-clamp-1">
                  {product.title}
                </TableCell>
                <TableCell>${product.price.toFixed(2)}</TableCell>
                <TableCell className="capitalize">{product.category}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handleEdit(product)}
                    >
                      <Pencil className="h-4 w-4" />
                      <span className="sr-only">Edit</span>
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handleDelete(product)}
                    >
                      <Trash2 className="h-4 w-4" />
                      <span className="sr-only">Delete</span>
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Edit/Add Product Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[500px] rounded-xl">
          <DialogHeader>
            <DialogTitle>
              {currentProduct?.id ? "Edit Product" : "Add New Product"}
            </DialogTitle>
            <DialogDescription>
              {currentProduct?.id
                ? "Make changes to the product here."
                : "Fill in the details for the new product."}
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  value={currentProduct?.title || ""}
                  onChange={(e) =>
                    setCurrentProduct({
                      ...currentProduct,
                      title: e.target.value,
                    })
                  }
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="price">Price</Label>
                <Input
                  id="price"
                  type="number"
                  step="0.01"
                  value={currentProduct?.price || ""}
                  onChange={(e) =>
                    setCurrentProduct({
                      ...currentProduct,
                      price: Number.parseFloat(e.target.value),
                    })
                  }
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="category">Category</Label>
                <Input
                  id="category"
                  value={currentProduct?.category || ""}
                  onChange={(e) =>
                    setCurrentProduct({
                      ...currentProduct,
                      category: e.target.value,
                    })
                  }
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="image">Image URL</Label>
                <Input
                  id="image"
                  value={currentProduct?.image || ""}
                  onChange={(e) =>
                    setCurrentProduct({
                      ...currentProduct,
                      image: e.target.value,
                    })
                  }
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={currentProduct?.description || ""}
                  onChange={(e) =>
                    setCurrentProduct({
                      ...currentProduct,
                      description: e.target.value,
                    })
                  }
                  rows={4}
                  required
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting
                  ? "Saving..."
                  : currentProduct?.id
                  ? "Save Changes"
                  : "Create Product"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="sm:max-w-[425px] rounded-xl">
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete {currentProduct?.title}? This
              action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsDeleteDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleConfirmDelete}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Deleting..." : "Delete"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminPage;
