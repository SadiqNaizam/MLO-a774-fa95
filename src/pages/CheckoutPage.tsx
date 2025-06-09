import React, { useState } from 'react';
import NavigationMenu from '@/components/layout/NavigationMenu';
import Footer from '@/components/layout/Footer';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, SelectGroup, SelectLabel } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { toast } from '@/components/ui/use-toast';
import { useNavigate } from 'react-router-dom';
import { CreditCard, Lock, ShoppingBag } from 'lucide-react';

// Mock cart summary data
const orderSummary = {
  subtotal: 89.98,
  shipping: 5.00,
  tax: 7.20, // Example tax
  total: 102.18,
  items: [
    { id: 'prod-1', name: 'Stylish T-Shirt (Blue, M)', quantity: 2, price: 29.99 },
    { id: 'prod-2', name: 'Modern Jeans (Black, 32W)', quantity: 1, price: 59.99 },
  ]
};

const shippingSchema = z.object({
  email: z.string().email({ message: "Invalid email address." }),
  fullName: z.string().min(2, { message: "Full name must be at least 2 characters." }),
  address: z.string().min(5, { message: "Address is too short." }),
  apartment: z.string().optional(),
  city: z.string().min(2, { message: "City is too short." }),
  country: z.string().min(2, { message: "Country is required." }),
  postalCode: z.string().min(3, { message: "Postal code is too short." }),
  phone: z.string().optional(),
});

const paymentSchema = z.object({
  cardNumber: z.string().regex(/^\d{16}$/, { message: "Invalid card number (must be 16 digits)." }),
  cardName: z.string().min(2, { message: "Name on card is required." }),
  expiryDate: z.string().regex(/^(0[1-9]|1[0-2])\/\d{2}$/, { message: "Invalid expiry date (MM/YY)." }),
  cvc: z.string().regex(/^\d{3,4}$/, { message: "Invalid CVC (3 or 4 digits)." }),
});

type ShippingFormData = z.infer<typeof shippingSchema>;
type PaymentFormData = z.infer<typeof paymentSchema>;

const CheckoutPage = () => {
  const [shippingMethod, setShippingMethod] = useState('standard');
  const [currentStep, setCurrentStep] = useState<'shipping' | 'payment'>('shipping');
  const navigate = useNavigate();

  console.log('CheckoutPage loaded');

  const { control: shippingControl, handleSubmit: handleShippingSubmit, formState: { errors: shippingErrors } } = useForm<ShippingFormData>({
    resolver: zodResolver(shippingSchema),
    defaultValues: { country: "USA" }
  });

  const { control: paymentControl, handleSubmit: handlePaymentSubmit, formState: { errors: paymentErrors } } = useForm<PaymentFormData>({
    resolver: zodResolver(paymentSchema)
  });

  const onShippingSubmit: SubmitHandler<ShippingFormData> = (data) => {
    console.log("Shipping Data:", data);
    setCurrentStep('payment');
    toast({ title: "Shipping Information Saved", description: "Proceed to payment."});
  };

  const onPaymentSubmit: SubmitHandler<PaymentFormData> = (data) => {
    console.log("Payment Data:", data);
    // Simulate order placement
    toast({ title: "Order Placed!", description: "Thank you for your purchase. Redirecting..."});
    setTimeout(() => navigate('/order-confirmation'), 2000); // Redirect to a confirmation page
  };

  const renderErrorMessage = (error: any) => error && <p className="text-sm text-destructive mt-1">{error.message}</p>;

  return (
    <div className="flex flex-col min-h-screen bg-muted/40">
      <NavigationMenu siteTitle="E-Commerce Pro" cartItemCount={0} /> {/* No cart icon needed on checkout */}
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <header className="mb-8 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground">Checkout</h1>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Checkout Form Section */}
          <section className="lg:col-span-2 space-y-8">
            {/* Shipping Information Form */}
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Shipping Information</CardTitle>
                <CardDescription>Where should we send your order?</CardDescription>
              </CardHeader>
              <CardContent>
                <form id="shipping-form" onSubmit={handleShippingSubmit(onShippingSubmit)} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="email">Email Address</Label>
                      <Controller name="email" control={shippingControl} render={({ field }) => <Input id="email" type="email" placeholder="you@example.com" {...field} />} />
                      {renderErrorMessage(shippingErrors.email)}
                    </div>
                    <div>
                      <Label htmlFor="fullName">Full Name</Label>
                      <Controller name="fullName" control={shippingControl} render={({ field }) => <Input id="fullName" placeholder="John Doe" {...field} />} />
                      {renderErrorMessage(shippingErrors.fullName)}
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="address">Address</Label>
                    <Controller name="address" control={shippingControl} render={({ field }) => <Input id="address" placeholder="123 Main St" {...field} />} />
                    {renderErrorMessage(shippingErrors.address)}
                  </div>
                  <div>
                    <Label htmlFor="apartment">Apartment, suite, etc. (optional)</Label>
                    <Controller name="apartment" control={shippingControl} render={({ field }) => <Input id="apartment" placeholder="Apt 4B" {...field} />} />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="city">City</Label>
                      <Controller name="city" control={shippingControl} render={({ field }) => <Input id="city" placeholder="Anytown" {...field} />} />
                      {renderErrorMessage(shippingErrors.city)}
                    </div>
                    <div>
                      <Label htmlFor="country">Country</Label>
                       <Controller
                            name="country"
                            control={shippingControl}
                            render={({ field }) => (
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <SelectTrigger id="country"><SelectValue placeholder="Select country" /></SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="USA">United States</SelectItem>
                                        <SelectItem value="CAN">Canada</SelectItem>
                                        <SelectItem value="GBR">United Kingdom</SelectItem>
                                        {/* Add more countries */}
                                    </SelectContent>
                                </Select>
                            )}
                        />
                      {renderErrorMessage(shippingErrors.country)}
                    </div>
                    <div>
                      <Label htmlFor="postalCode">Postal Code</Label>
                      <Controller name="postalCode" control={shippingControl} render={({ field }) => <Input id="postalCode" placeholder="12345" {...field} />} />
                      {renderErrorMessage(shippingErrors.postalCode)}
                    </div>
                  </div>
                  <div>
                      <Label htmlFor="phone">Phone (optional for shipping updates)</Label>
                      <Controller name="phone" control={shippingControl} render={({ field }) => <Input id="phone" type="tel" placeholder="+1 (555) 123-4567" {...field} />} />
                  </div>
                  {currentStep === 'shipping' && (
                     <Button type="submit" size="lg" className="w-full md:w-auto">Continue to Payment</Button>
                  )}
                </form>
              </CardContent>
            </Card>

            {/* Shipping Method */}
             {currentStep === 'payment' && (
                <Card>
                    <CardHeader>
                        <CardTitle className="text-2xl">Shipping Method</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <RadioGroup defaultValue="standard" value={shippingMethod} onValueChange={setShippingMethod} className="space-y-2">
                            <div className="flex items-center space-x-2 p-3 border rounded-md has-[:checked]:bg-primary/10 has-[:checked]:border-primary">
                                <RadioGroupItem value="standard" id="standard-shipping" />
                                <Label htmlFor="standard-shipping" className="flex justify-between w-full cursor-pointer">
                                    <span>Standard Shipping (3-5 business days)</span>
                                    <span>$5.00</span>
                                </Label>
                            </div>
                            <div className="flex items-center space-x-2 p-3 border rounded-md has-[:checked]:bg-primary/10 has-[:checked]:border-primary">
                                <RadioGroupItem value="express" id="express-shipping" />
                                <Label htmlFor="express-shipping" className="flex justify-between w-full cursor-pointer">
                                    <span>Express Shipping (1-2 business days)</span>
                                    <span>$15.00</span>
                                </Label>
                            </div>
                        </RadioGroup>
                    </CardContent>
                </Card>
             )}

            {/* Payment Information Form (Accordion) */}
             {currentStep === 'payment' && (
                <Card>
                    <CardHeader>
                        <CardTitle className="text-2xl">Payment Details</CardTitle>
                        <CardDescription>All transactions are secure and encrypted.</CardDescription>
                    </CardHeader>
                    <CardContent>
                    <form id="payment-form" onSubmit={handlePaymentSubmit(onPaymentSubmit)} className="space-y-4">
                        <Accordion type="single" collapsible defaultValue="credit-card" className="w-full">
                        <AccordionItem value="credit-card">
                            <AccordionTrigger className="font-medium text-lg">
                                <div className="flex items-center"><CreditCard className="mr-2 h-5 w-5" /> Pay with Credit Card</div>
                            </AccordionTrigger>
                            <AccordionContent className="pt-4 space-y-4">
                            <div>
                                <Label htmlFor="cardNumber">Card Number</Label>
                                <Controller name="cardNumber" control={paymentControl} render={({ field }) => <Input id="cardNumber" placeholder="•••• •••• •••• ••••" {...field} />} />
                                {renderErrorMessage(paymentErrors.cardNumber)}
                            </div>
                            <div>
                                <Label htmlFor="cardName">Name on Card</Label>
                                <Controller name="cardName" control={paymentControl} render={({ field }) => <Input id="cardName" placeholder="John Doe" {...field} />} />
                                {renderErrorMessage(paymentErrors.cardName)}
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                <Label htmlFor="expiryDate">Expiry Date (MM/YY)</Label>
                                <Controller name="expiryDate" control={paymentControl} render={({ field }) => <Input id="expiryDate" placeholder="MM/YY" {...field} />} />
                                {renderErrorMessage(paymentErrors.expiryDate)}
                                </div>
                                <div>
                                <Label htmlFor="cvc">CVC</Label>
                                <Controller name="cvc" control={paymentControl} render={({ field }) => <Input id="cvc" placeholder="123" {...field} />} />
                                {renderErrorMessage(paymentErrors.cvc)}
                                </div>
                            </div>
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="paypal">
                            <AccordionTrigger className="font-medium text-lg">
                                <div className="flex items-center"><img src="https://www.paypalobjects.com/webstatic/mktg/Logo/pp-logo-100px.png" alt="PayPal" className="h-6 mr-2"/> Pay with PayPal</div>
                            </AccordionTrigger>
                            <AccordionContent className="pt-4">
                            <p className="text-muted-foreground">You will be redirected to PayPal to complete your purchase securely.</p>
                            <Button variant="outline" className="mt-4 w-full" onClick={() => toast({title: "Redirecting to PayPal...", description: "This is a placeholder."})}>
                                Continue with PayPal
                            </Button>
                            </AccordionContent>
                        </AccordionItem>
                        </Accordion>
                         <Button type="submit" size="lg" className="w-full mt-6 bg-green-600 hover:bg-green-700">
                            <Lock className="mr-2 h-5 w-5" /> Place Order Securely
                        </Button>
                    </form>
                    </CardContent>
                </Card>
             )}
          </section>

          {/* Order Summary Section */}
          <aside className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle className="text-2xl flex items-center">
                  <ShoppingBag className="mr-2 h-6 w-6 text-primary" /> Order Summary
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {orderSummary.items.map(item => (
                    <div key={item.id} className="flex justify-between items-center text-sm">
                        <div>
                            <p className="font-medium">{item.name}</p>
                            <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
                        </div>
                        <p>${(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                ))}
                <hr/>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal:</span>
                  <span>${orderSummary.subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Shipping:</span>
                  <span>${orderSummary.shipping.toFixed(2)}</span>
                </div>
                 <div className="flex justify-between">
                  <span className="text-muted-foreground">Estimated Tax:</span>
                  <span>${orderSummary.tax.toFixed(2)}</span>
                </div>
                <hr />
                <div className="flex justify-between font-bold text-xl">
                  <span>Total:</span>
                  <span>${orderSummary.total.toFixed(2)}</span>
                </div>
              </CardContent>
              <CardFooter>
                 <p className="text-xs text-muted-foreground">By placing your order, you agree to our Terms of Service and Privacy Policy.</p>
              </CardFooter>
            </Card>
          </aside>
        </div>
      </main>
      <Footer siteName="E-Commerce Pro" />
    </div>
  );
};

export default CheckoutPage;