import React, { useState, useEffect } from 'react';
import NavigationMenu from '@/components/layout/NavigationMenu';
import Footer from '@/components/layout/Footer';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, TableCaption } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Link, useNavigate } from 'react-router-dom';
import { Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  imageUrl: string;
  variant?: string; // e.g., "Size: M, Color: Blue"
}

const initialCartItems: CartItem[] = [
  { id: 'prod-1', name: 'Stylish T-Shirt', price: 29.99, quantity: 2, imageUrl: 'https://via.placeholder.com/100x100/87CEEB/FFFFFF?text=T-Shirt', variant: 'Blue, M' },
  { id: 'prod-2', name: 'Modern Jeans', price: 59.99, quantity: 1, imageUrl: 'https://via.placeholder.com/100x100/4682B4/FFFFFF?text=Jeans', variant: 'Black, 32W' },
];

const CartPage = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>(initialCartItems);
  const [specialInstructions, setSpecialInstructions] = useState('');
  const navigate = useNavigate();

  console.log('CartPage loaded');

  const updateQuantity = (id: string, newQuantity: number) => {
    const quantity = Math.max(1, newQuantity); // Ensure quantity is at least 1
    setCartItems(items => items.map(item => item.id === id ? { ...item, quantity } : item));
  };

  const removeItem = (id: string) => {
    setCartItems(items => items.filter(item => item.id !== id));
    toast({
        title: "Item Removed",
        description: "The item has been removed from your cart.",
    });
  };

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shippingCost = cartItems.length > 0 ? 5.00 : 0; // Example flat shipping
  const total = subtotal + shippingCost;

  const handleCheckout = () => {
    if (cartItems.length === 0) {
        toast({
            title: "Cart Empty",
            description: "Please add items to your cart before proceeding to checkout.",
            variant: "destructive",
        });
        return;
    }
    console.log("Proceeding to checkout with items:", cartItems, "Instructions:", specialInstructions);
    navigate('/checkout');
  };
  
  const totalCartItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);


  return (
    <div className="flex flex-col min-h-screen bg-background">
      <NavigationMenu siteTitle="E-Commerce Pro" cartItemCount={totalCartItems} />
      <main className="flex-grow container mx-auto px-4 py-8">
        <header className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground flex items-center">
            <ShoppingBag className="mr-3 h-8 w-8" /> Your Shopping Cart
          </h1>
        </header>

        {cartItems.length === 0 ? (
          <div className="text-center py-16">
            <ShoppingBag className="mx-auto h-24 w-24 text-muted-foreground opacity-50 mb-4" />
            <p className="text-xl text-muted-foreground mb-4">Your cart is currently empty.</p>
            <Link to="/products">
              <Button variant="default" size="lg">Continue Shopping</Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items Table */}
            <section className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Cart Items ({cartItems.length})</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[120px] hidden sm:table-cell">Image</TableHead>
                        <TableHead>Product</TableHead>
                        <TableHead className="text-center">Quantity</TableHead>
                        <TableHead className="text-right">Price</TableHead>
                        <TableHead className="text-right">Total</TableHead>
                        <TableHead className="text-center">Remove</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {cartItems.map(item => (
                        <TableRow key={item.id}>
                          <TableCell className="hidden sm:table-cell">
                            <img src={item.imageUrl} alt={item.name} className="w-20 h-20 object-cover rounded-md" />
                          </TableCell>
                          <TableCell>
                            <p className="font-medium">{item.name}</p>
                            {item.variant && <p className="text-xs text-muted-foreground">{item.variant}</p>}
                          </TableCell>
                          <TableCell className="text-center">
                            <Input
                              type="number"
                              min="1"
                              value={item.quantity}
                              onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
                              className="w-20 mx-auto text-center"
                              aria-label={`Quantity for ${item.name}`}
                            />
                          </TableCell>
                          <TableCell className="text-right">${item.price.toFixed(2)}</TableCell>
                          <TableCell className="text-right font-medium">${(item.price * item.quantity).toFixed(2)}</TableCell>
                          <TableCell className="text-center">
                            <Button variant="ghost" size="icon" onClick={() => removeItem(item.id)} aria-label={`Remove ${item.name}`}>
                              <Trash2 className="h-5 w-5 text-destructive" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
              <div className="mt-6">
                <Label htmlFor="special-instructions" className="text-sm font-medium">Special Instructions for Seller</Label>
                <Textarea
                    id="special-instructions"
                    placeholder="Add any notes for your order..."
                    value={specialInstructions}
                    onChange={(e) => setSpecialInstructions(e.target.value)}
                    className="mt-1 min-h-[100px]"
                />
              </div>
            </section>

            {/* Order Summary Card */}
            <aside className="lg:col-span-1">
              <Card className="sticky top-24"> {/* Sticky for desktop */}
                <CardHeader>
                  <CardTitle>Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal:</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Shipping:</span>
                    <span>${shippingCost.toFixed(2)}</span>
                  </div>
                  {/* Add discount/coupon code input here if needed */}
                  <hr />
                  <div className="flex justify-between font-bold text-lg">
                    <span>Total:</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </CardContent>
                <CardFooter className="flex-col space-y-3">
                  <Button size="lg" className="w-full" onClick={handleCheckout}>
                    Proceed to Checkout <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                  <Link to="/products" className="w-full">
                    <Button variant="outline" className="w-full">Continue Shopping</Button>
                  </Link>
                </CardFooter>
              </Card>
            </aside>
          </div>
        )}
      </main>
      <Footer siteName="E-Commerce Pro" />
    </div>
  );
};

export default CartPage;