import React from 'react';
import NavigationMenu from '@/components/layout/NavigationMenu';
import CustomCarousel from '@/components/Carousel'; // Renamed to avoid conflict with shadcn if any
import Footer from '@/components/layout/Footer';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const placeholderSlides = [
  { id: 1, imageUrl: 'https://via.placeholder.com/1200x500/FFA07A/FFFFFF?text=Hero+Banner+1:+Summer+Collection', altText: 'Summer Collection Banner' },
  { id: 2, imageUrl: 'https://via.placeholder.com/1200x500/20B2AA/FFFFFF?text=Hero+Banner+2:+New+Arrivals', altText: 'New Arrivals Banner' },
  { id: 3, imageUrl: 'https://via.placeholder.com/1200x500/778899/FFFFFF?text=Hero+Banner+3:+Limited+Time+Offer', altText: 'Limited Time Offer Banner' },
];

const featuredProducts = [
  { id: 'fp1', name: 'Stylish T-Shirt', description: 'Comfortable cotton t-shirt, available in various colors.', price: '$29.99', imageUrl: 'https://via.placeholder.com/300x300/87CEEB/FFFFFF?text=T-Shirt', link: '/product/stylish-t-shirt' },
  { id: 'fp2', name: 'Modern Jeans', description: 'Durable and fashionable jeans for everyday wear.', price: '$59.99', imageUrl: 'https://via.placeholder.com/300x300/4682B4/FFFFFF?text=Jeans', link: '/product/modern-jeans' },
  { id: 'fp3', name: 'Elegant Sneakers', description: 'Lightweight sneakers perfect for any occasion.', price: '$89.99', imageUrl: 'https://via.placeholder.com/300x300/32CD32/FFFFFF?text=Sneakers', link: '/product/elegant-sneakers' },
];

const Homepage = () => {
  console.log('Homepage loaded');
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <NavigationMenu siteTitle="E-Commerce Pro" cartItemCount={0} />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="w-full">
          <CustomCarousel slides={placeholderSlides} autoplayDelay={5000} aspectRatio="h-[300px] md:h-[400px] lg:h-[500px]" />
        </section>

        {/* Featured Products Section */}
        <section className="py-12 md:py-16 lg:py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center text-foreground mb-10">Featured Products</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredProducts.map((product) => (
                <Card key={product.id} className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <CardHeader className="p-0">
                    <img src={product.imageUrl} alt={product.name} className="w-full h-60 object-cover" />
                  </CardHeader>
                  <CardContent className="p-6">
                    <CardTitle className="text-xl mb-2">{product.name}</CardTitle>
                    <CardDescription className="text-muted-foreground mb-4 h-16 overflow-hidden">{product.description}</CardDescription>
                    <p className="text-lg font-semibold text-primary mb-4">{product.price}</p>
                  </CardContent>
                  <CardFooter className="p-6 pt-0">
                    <Link to={product.link} className="w-full">
                      <Button className="w-full" variant="default">View Product</Button>
                    </Link>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Call to Action Section */}
        <section className="py-12 md:py-16 bg-muted">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold text-foreground mb-4">Discover Our Full Collection</h2>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              Explore a wide range of high-quality products tailored to your needs. Find your next favorite item today!
            </p>
            <Link to="/products">
              <Button size="lg" variant="secondary">Shop All Products</Button>
            </Link>
          </div>
        </section>
      </main>
      <Footer siteName="E-Commerce Pro" />
    </div>
  );
};

export default Homepage;