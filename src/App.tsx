import { Toaster as Sonner } from "@/components/ui/sonner"; // Using Sonner for non-blocking notifications
import { Toaster } from "@/components/ui/toaster"; // Using shadcn Toaster for more prominent alerts
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Homepage from "./pages/Homepage";
import ProductListingPage from "./pages/ProductListingPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import NotFound from "./pages/NotFound"; // Assuming NotFound.tsx exists

const queryClient = new QueryClient();

// A simple Order Confirmation Page placeholder
const OrderConfirmationPage = () => {
    console.log('OrderConfirmationPage loaded');
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-background p-4">
            <div className="bg-card p-8 rounded-lg shadow-xl text-center max-w-md">
                <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
                <h1 className="text-3xl font-bold text-foreground mb-2">Thank You for Your Order!</h1>
                <p className="text-muted-foreground mb-6">Your order has been placed successfully. You will receive an email confirmation shortly.</p>
                <Link to="/">
                    <Button variant="default">Continue Shopping</Button>
                </Link>
            </div>
        </div>
    );
};


const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster /> {/* For shadcn toasts */}
      <Sonner /> {/* For Sonner toasts */}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/products" element={<ProductListingPage />} />
          <Route path="/product/:productId" element={<ProductDetailPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/order-confirmation" element={<OrderConfirmationPage />} /> {/* Added placeholder confirmation page */}
          
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} /> {/* Always Include This Line As It Is. */}
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;