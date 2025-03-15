"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  clearCart,
  removeFromCart,
  updateQuantity,
} from "@/features/cart/cartSlice";
import { ArrowLeft, ShoppingBasket, Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";

const CartPage = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.items);

  const handleQuantityChange = (id, quantity) => {
    if (quantity < 1) return;
    dispatch(updateQuantity({ id, quantity }));
  };

  const handleRemoveItem = (id, title) => {
    dispatch(removeFromCart(id));
    toast("Success!", {
      title: "Item removed",
      description: `${title} has been removed from your cart.`,
    });
  };

  const handleClearCart = () => {
    dispatch(clearCart());
    toast("Success!", {
      title: "Cart cleared",
      description: "All items have been removed from your cart.",
    });
  };

  const subtotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  if (cart.length === 0) {
    return (
      <div className="flex justify-center items-center h-screen px-4">
        <div className="text-center">
          <ShoppingBasket className="mx-auto h-16 w-16 text-muted-foreground mb-4" />
          <h1 className="text-2xl sm:text-3xl font-bold mb-4">
            Your cart is empty
          </h1>
          <p className="text-muted-foreground mb-6">
            Looks like you haven't added anything to your cart yet
          </p>
          <Link href="/products">
            <Button>
              <ArrowLeft className="mr-2 h-4 w-4" /> Continue Shopping
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <h1 className="text-2xl sm:text-4xl font-bold text-center">Cart</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-6">
        <div className="lg:col-span-2">
          <div className="rounded-md border p-4 sm:p-6">
            {/* DESKTOP SCREEN */}
            <div className="hidden md:block">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Product</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Quantity</TableHead>
                    <TableHead>Total</TableHead>
                    <TableHead></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {cart.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <div className="relative h-16 w-16 rounded bg-white">
                            <Image
                              src={item.image || "/images/placeholderImage.svg"}
                              alt={item.title}
                              fill
                              className="object-contain p-4"
                            />
                          </div>
                          <div className="font-medium line-clamp-2">
                            {item.title}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>${item.price.toFixed(2)}</TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8 rounded-r-none"
                            onClick={() =>
                              handleQuantityChange(item.id, item.quantity - 1)
                            }
                            disabled={item.quantity <= 1}
                          >
                            -
                          </Button>
                          <Input
                            // type="number"
                            min="1"
                            value={item.quantity}
                            onChange={(e) =>
                              handleQuantityChange(
                                item.id,
                                Number.parseInt(e.target.value) || 1
                              )
                            }
                            className="h-8 w-14 rounded-none text-center"
                          />
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8 rounded-l-none"
                            onClick={() =>
                              handleQuantityChange(item.id, item.quantity + 1)
                            }
                          >
                            +
                          </Button>
                        </div>
                      </TableCell>
                      <TableCell className="font-medium">
                        ${(item.price * item.quantity).toFixed(2)}
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleRemoveItem(item.id, item.title)}
                        >
                          <Trash2 className="h-4 w-4" />
                          <span className="sr-only">Remove</span>
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {/* MOBILE SCREEN */}
            <div className="md:hidden space-y-4">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="flex flex-col gap-4 border rounded-lg p-4"
                >
                  <div className="flex items-center gap-4">
                    <Image
                      src={item.image || "/images/placeholderImage.svg"}
                      alt={item.title}
                      width={64}
                      height={64}
                      className="rounded bg-white object-contain"
                    />
                    <div className="flex-1">
                      <h2 className="text-sm font-medium line-clamp-2">
                        {item.title}
                      </h2>
                      <p className="text-sm text-muted-foreground">
                        ${item.price.toFixed(2)}
                      </p>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleRemoveItem(item.id, item.title)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row justify-between gap-4 mt-4">
            <Link href="/products">
              <Button variant="outline">
                <ArrowLeft className="mr-2 h-4 w-4" /> Continue Shopping
              </Button>
            </Link>
            <Button variant="outline" onClick={handleClearCart}>
              <Trash2 className="mr-2 h-4 w-4" /> Clear Cart
            </Button>
          </div>
        </div>

        {/* SUMMARY */}
        <div className="rounded-lg border p-6">
          <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
          <div className="space-y-4">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="border-t pt-4 flex justify-between font-semibold">
              <span>Total</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <Button className="w-full">Proceed to Checkout</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
