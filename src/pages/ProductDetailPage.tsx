import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import NavigationMenu from '@/components/layout/NavigationMenu';
import CustomCarousel from '@/components/Carousel';
import Footer from '@/components/layout/Footer';
import ColorSwatchSelectorComponent from '@/components/ColorSwatchSelector'; // Renamed to avoid conflict
import StarRatingComponent from '@/components/StarRating'; // Renamed
import ReviewItemComponent from '@/components/ReviewItem'; // Renamed
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, SelectGroup, SelectLabel } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from '@/components/ui/use-toast'; // Using shadcn toast
import { ShoppingCart, CheckCircle } from 'lucide-react';

const sampleProduct = {
  id: 'prod-123',
  name: 'Premium Quality Hoodie',
  price: 79.99,
  description: "Experience ultimate comfort and style with our Premium Quality Hoodie. Made from a soft and durable cotton blend, this hoodie features a modern fit, adjustable drawstring hood, and a spacious kangaroo pocket. Perfect for casual outings or cozy days at home.",
  images: [
    { id: 'img1', imageUrl: 'https://via.placeholder.com/600x600/6495ED/FFFFFF?text=Hoodie+Front', altText: 'Hoodie Front View' },
    { id: 'img2', imageUrl: 'https://via.placeholder.com/600x600/B0C4DE/FFFFFF?text=Hoodie+Back', altText: 'Hoodie Back View' },
    { id: 'img3', imageUrl: 'https://via.placeholder.com/600x600/778899/FFFFFF?text=Hoodie+Detail', altText: 'Hoodie Fabric Detail' },
  ],
  sizes: ['S', 'M', 'L', 'XL', 'XXL'],
  colors: [
    { id: 'c1', name: 'Ocean Blue', hex: '#6495ED', isAvailable: true },
    { id: 'c2', name: 'Charcoal Gray', hex: '#36454F', isAvailable: true },
    { id: 'c3', name: 'Forest Green', hex: '#228B22', isAvailable: false },
    { id: 'c4', name: 'Crimson Red', hex: '#DC143C', isAvailable: true },
  ],
  specifications: [
    { title: 'Material', value: '80% Cotton, 20% Polyester' },
    { title: 'Fit', value: 'Modern Fit' },
    { title: 'Care', value: 'Machine wash cold, tumble dry low' },
  ],
  avgRating: 4.7,
  totalReviews: 125,
};

const sampleReviews = [
  { id: 'rev1', authorName: 'Alice Wonderland', authorAvatarUrl: 'https://via.placeholder.com/40/FFD700/000000?text=AW', rating: 5, date: 'June 15, 2024', title: 'Absolutely love it!', comment: 'This hoodie is so comfortable and fits perfectly. The color is exactly as shown. Highly recommend!', verifiedPurchase: true, helpfulVotes: 10, notHelpfulVotes: 0 },
  { id: 'rev2', authorName: 'Bob The Builder', authorInitials: 'BB', rating: 4, date: 'June 10, 2024', title: 'Great quality, slightly snug', comment: 'Really good quality material. I found it a bit snug for an L, might want to size up if you prefer a looser fit.', verifiedPurchase: true, helpfulVotes: 5, notHelpfulVotes: 1 },
  { id: 'rev3', authorName: 'Charlie Brown', authorAvatarUrl: 'https://via.placeholder.com/40/DEB887/000000?text=CB', rating: 5, date: 'May 28, 2024', title: 'My new favorite!', comment: 'Warm, stylish, and the pockets are huge. What more could you ask for?', verifiedPurchase: false, helpfulVotes: 8, notHelpfulVotes: 0 },
];

const ProductDetailPage = () => {
  const { productId } = useParams<{ productId: string }>(); // In a real app, fetch product by productId
  const [selectedSize, setSelectedSize] = useState<string>(sampleProduct.sizes[0]);
  const [selectedColorId, setSelectedColorId] = useState<string | number | null>(sampleProduct.colors.find(c => c.isAvailable)?.id || null);
  const [quantity, setQuantity] = useState<number>(1);
  const [addingToCart, setAddingToCart] = useState(false);

  console.log('ProductDetailPage loaded for productId:', productId);

  const handleAddToCart = () => {
    if (!selectedSize || !selectedColorId) {
        toast({
            title: "Selection Incomplete",
            description: "Please select a size and color.",
            variant: "destructive",
        });
        return;
    }
    console.log(`Adding to cart: ${quantity} of ${sampleProduct.name} (Size: ${selectedSize}, Color ID: ${selectedColorId})`);
    setAddingToCart(true);
    // Simulate API call
    setTimeout(() => {
        setAddingToCart(false);
        toast({
            title: "Added to Cart!",
            description: `${quantity} x ${sampleProduct.name} successfully added.`,
            action: <CheckCircle className="text-green-500" />,
        });
        // Update cart icon in NavigationMenu (this would typically involve global state)
    }, 1500);
  };
  
  const product = sampleProduct; // Using sample product directly

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <NavigationMenu siteTitle="E-Commerce Pro" cartItemCount={0} /> {/* Update cartItemCount from global state */}
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <Breadcrumb className="mb-6">
          <BreadcrumbList>
            <BreadcrumbItem><BreadcrumbLink href="/">Home</BreadcrumbLink></BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem><BreadcrumbLink href="/products">Products</BreadcrumbLink></BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem><BreadcrumbPage>{product.name}</BreadcrumbPage></BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {/* Product Images Carousel */}
          <section aria-labelledby="product-images">
             <h2 id="product-images" className="sr-only">Product Images</h2>
            <CustomCarousel slides={product.images} showArrows={true} aspectRatio="aspect-square" />
          </section>

          {/* Product Information & Actions */}
          <section aria-labelledby="product-information" className="space-y-6">
            <h1 id="product-information" className="text-3xl lg:text-4xl font-bold text-foreground">{product.name}</h1>
            
            <div className="flex items-center space-x-2">
              <StarRatingComponent rating={product.avgRating} size={20} showLabel={false} />
              <a href="#reviews" className="text-sm text-muted-foreground hover:text-primary">({product.totalReviews} reviews)</a>
            </div>

            <p className="text-3xl font-semibold text-primary">${product.price.toFixed(2)}</p>
            
            <p className="text-muted-foreground leading-relaxed">{product.description.substring(0,150)}...</p> {/* Short description */}

            {/* Size Selector */}
            <div>
              <Label htmlFor="size-select" className="text-sm font-medium">Size:</Label>
              <Select value={selectedSize} onValueChange={setSelectedSize}>
                <SelectTrigger id="size-select" className="w-full md:w-[200px] mt-1">
                  <SelectValue placeholder="Select size" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {product.sizes.map(size => (
                      <SelectItem key={size} value={size}>{size}</SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            {/* Color Selector */}
            <ColorSwatchSelectorComponent
              options={product.colors}
              selectedColorId={selectedColorId}
              onColorSelect={setSelectedColorId}
              label="Color:"
            />

            {/* Quantity Input */}
            <div className="flex items-center space-x-3">
              <Label htmlFor="quantity" className="text-sm font-medium">Quantity:</Label>
              <Input
                id="quantity"
                type="number"
                min="1"
                value={quantity}
                onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                className="w-20"
              />
            </div>

            {/* Add to Cart Button */}
            <Button size="lg" className="w-full md:w-auto" onClick={handleAddToCart} disabled={addingToCart}>
              {addingToCart ? (
                <>
                  <span className="animate-spin rounded-full h-5 w-5 border-b-2 border-current mr-2"></span>
                  Adding...
                </>
              ) : (
                <>
                  <ShoppingCart className="mr-2 h-5 w-5" /> Add to Cart
                </>
              )}
            </Button>
          </section>
        </div>

        {/* Detailed Info: Tabs (Description, Specs) & Accordion (FAQ/Shipping) */}
        <section className="mt-12 lg:mt-16">
          <Tabs defaultValue="description" className="w-full">
            <TabsList className="grid w-full grid-cols-2 md:grid-cols-3 mb-4">
              <TabsTrigger value="description">Full Description</TabsTrigger>
              <TabsTrigger value="specifications">Specifications</TabsTrigger>
              <TabsTrigger value="shipping">Shipping & Returns</TabsTrigger>
            </TabsList>
            <TabsContent value="description" className="prose prose-sm sm:prose lg:prose-lg max-w-none p-4 border rounded-md">
              <p>{product.description}</p>
              {/* Add more descriptive content here */}
            </TabsContent>
            <TabsContent value="specifications" className="p-4 border rounded-md">
              <ul className="space-y-2">
                {product.specifications.map(spec => (
                  <li key={spec.title} className="flex justify-between">
                    <span className="font-medium text-foreground">{spec.title}:</span>
                    <span className="text-muted-foreground">{spec.value}</span>
                  </li>
                ))}
              </ul>
            </TabsContent>
            <TabsContent value="shipping" className="p-4 border rounded-md">
                <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="item-1">
                        <AccordionTrigger>How long does shipping take?</AccordionTrigger>
                        <AccordionContent>
                        Standard shipping typically takes 3-5 business days. Expedited options are available at checkout.
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-2">
                        <AccordionTrigger>What is your return policy?</AccordionTrigger>
                        <AccordionContent>
                        We offer a 30-day return policy for unused items in their original packaging. Please visit our returns page for more details.
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </TabsContent>
          </Tabs>
        </section>

        {/* Customer Reviews Section */}
        <section id="reviews" className="mt-12 lg:mt-16">
            <Card>
                <CardHeader>
                    <CardTitle className="text-2xl">Customer Reviews</CardTitle>
                    <div className="flex items-center mt-2">
                        <StarRatingComponent rating={product.avgRating} size={24} />
                        <span className="ml-3 text-lg text-muted-foreground">Based on {product.totalReviews} reviews</span>
                    </div>
                </CardHeader>
                <CardContent>
                    {/* Placeholder for review submission - Textarea and Button */}
                    <div className="mb-8 p-4 border rounded-md">
                        <h3 className="text-lg font-semibold mb-2">Write a Review</h3>
                        <Textarea placeholder="Share your thoughts about this product..." className="mb-3 min-h-[100px]"/>
                        {/* Add star rating input here if desired */}
                        <Button>Submit Review</Button>
                    </div>
                    
                    <div className="space-y-6">
                        {sampleReviews.map(review => (
                            <ReviewItemComponent 
                                key={review.id} 
                                review={review} 
                                onHelpfulVote={(reviewId, voteType) => console.log(`Voted ${voteType} on review ${reviewId}`)}
                            />
                        ))}
                    </div>
                    {/* Add Pagination for reviews if many */}
                </CardContent>
            </Card>
        </section>
      </main>
      <Footer siteName="E-Commerce Pro" />
    </div>
  );
};

export default ProductDetailPage;