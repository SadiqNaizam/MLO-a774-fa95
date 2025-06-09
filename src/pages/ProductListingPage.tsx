import React, { useState } from 'react';
import NavigationMenu from '@/components/layout/NavigationMenu';
import CustomSidebar from '@/components/layout/Sidebar'; // Renamed to avoid conflict
import Footer from '@/components/layout/Footer';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, SelectGroup, SelectLabel } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Link } from 'react-router-dom';
import { Filter, SortAsc } from 'lucide-react';

const sampleProducts = Array.from({ length: 12 }, (_, i) => ({
  id: `prod-${i + 1}`,
  name: `Product Name ${i + 1}`,
  description: `This is a brief description for product ${i + 1}. It highlights key features and benefits.`,
  price: (Math.random() * 100 + 20).toFixed(2),
  imageUrl: `https://via.placeholder.com/300x300/FFA500/FFFFFF?text=Product+${i + 1}`,
  category: i % 3 === 0 ? 'Category A' : i % 3 === 1 ? 'Category B' : 'Category C',
  rating: (Math.random() * 2 + 3).toFixed(1), // Rating between 3.0 and 5.0
}));

const ProductListingPage = () => {
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 500]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<string>('relevance');
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 9;
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);

  console.log('ProductListingPage loaded');

  // Placeholder filter logic
  const handleCategoryChange = (category: string, checked: boolean | string) => {
    if (checked) {
      setSelectedCategories(prev => [...prev, category]);
    } else {
      setSelectedCategories(prev => prev.filter(c => c !== category));
    }
  };

  const filteredProducts = sampleProducts.filter(p => {
    const price = parseFloat(p.price);
    const categoryMatch = selectedCategories.length === 0 || selectedCategories.includes(p.category);
    return price >= priceRange[0] && price <= priceRange[1] && categoryMatch;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'price-asc') return parseFloat(a.price) - parseFloat(b.price);
    if (sortBy === 'price-desc') return parseFloat(b.price) - parseFloat(a.price);
    if (sortBy === 'name-asc') return a.name.localeCompare(b.name);
    // Add more sorting options if needed
    return 0;
  });

  const totalPages = Math.ceil(sortedProducts.length / productsPerPage);
  const currentProducts = sortedProducts.slice((currentPage - 1) * productsPerPage, currentPage * productsPerPage);

  const categories = ['Category A', 'Category B', 'Category C'];

  const FilterContent = () => (
    <>
        <div>
          <h3 className="text-lg font-semibold mb-3">Price Range</h3>
          <Slider
            defaultValue={[priceRange[0], priceRange[1]]}
            max={1000}
            min={0}
            step={10}
            onValueChange={(value) => setPriceRange(value as [number, number])}
            className="mb-4"
          />
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>${priceRange[0]}</span>
            <span>${priceRange[1]}</span>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-3">Categories</h3>
          <div className="space-y-2">
            {categories.map(category => (
              <div key={category} className="flex items-center space-x-2">
                <Checkbox
                  id={`cat-${category}`}
                  checked={selectedCategories.includes(category)}
                  onCheckedChange={(checked) => handleCategoryChange(category, checked)}
                />
                <Label htmlFor={`cat-${category}`} className="font-normal">{category}</Label>
              </div>
            ))}
          </div>
        </div>
    </>
  );


  return (
    <div className="flex flex-col min-h-screen bg-background">
      <NavigationMenu siteTitle="E-Commerce Pro" cartItemCount={0} />
      <div className="container mx-auto px-4 py-8 flex-grow">
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-foreground">Our Products</h1>
          <p className="text-muted-foreground mt-2">Browse our extensive collection of high-quality items.</p>
        </header>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Mobile Filter Button */}
          <div className="md:hidden mb-4 flex justify-between items-center">
            <Button variant="outline" onClick={() => setIsMobileFiltersOpen(!isMobileFiltersOpen)} className="w-full">
              <Filter className="mr-2 h-4 w-4" /> {isMobileFiltersOpen ? 'Hide Filters' : 'Show Filters'}
            </Button>
             <div className="ml-4">
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-[180px]">
                    <SortAsc className="mr-2 h-4 w-4 inline-block"/>
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="relevance">Relevance</SelectItem>
                    <SelectItem value="price-asc">Price: Low to High</SelectItem>
                    <SelectItem value="price-desc">Price: High to Low</SelectItem>
                    <SelectItem value="name-asc">Name: A-Z</SelectItem>
                  </SelectContent>
                </Select>
            </div>
          </div>
          
          {/* Sidebar for Filters (Desktop) */}
          <aside className="hidden md:block md:w-1/4 lg:w-1/5">
             <CustomSidebar title="Filters">
                <FilterContent/>
             </CustomSidebar>
          </aside>

           {/* Mobile Filters Drawer/Section */}
          {isMobileFiltersOpen && (
            <div className="md:hidden mb-6 p-4 border rounded-lg shadow-sm">
                 <CustomSidebar title="Filters">
                    <FilterContent/>
                 </CustomSidebar>
            </div>
          )}


          {/* Product Grid and Sorting (Main Content) */}
          <main className="w-full md:w-3/4 lg:w-4/5">
            <div className="hidden md:flex justify-end mb-6">
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-[200px]">
                  <SortAsc className="mr-2 h-4 w-4 inline-block"/>
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Sort Options</SelectLabel>
                    <SelectItem value="relevance">Relevance</SelectItem>
                    <SelectItem value="price-asc">Price: Low to High</SelectItem>
                    <SelectItem value="price-desc">Price: High to Low</SelectItem>
                    <SelectItem value="name-asc">Name: A-Z</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            {currentProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {currentProducts.map(product => (
                  <Card key={product.id} className="overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col">
                    <CardHeader className="p-0 relative">
                      <Link to={`/product/${product.id}`}>
                        <img src={product.imageUrl} alt={product.name} className="w-full h-52 object-cover" />
                      </Link>
                       <div className="absolute top-2 right-2 bg-background/80 px-2 py-1 rounded text-xs font-semibold">
                        {product.category}
                      </div>
                    </CardHeader>
                    <CardContent className="p-4 flex-grow">
                      <CardTitle className="text-lg mb-1">
                        <Link to={`/product/${product.id}`} className="hover:text-primary">{product.name}</Link>
                      </CardTitle>
                      <CardDescription className="text-sm text-muted-foreground mb-2 h-12 overflow-hidden">{product.description}</CardDescription>
                      <div className="flex items-center justify-between">
                        <p className="text-md font-semibold text-primary">${product.price}</p>
                        {/* Placeholder for rating */}
                        <span className="text-sm text-amber-500">{product.rating} ★</span>
                      </div>
                    </CardContent>
                    <CardFooter className="p-4 pt-0">
                      <Link to={`/product/${product.id}`} className="w-full">
                        <Button variant="outline" className="w-full">View Details</Button>
                      </Link>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-10">
                <p className="text-xl text-muted-foreground">No products found matching your criteria.</p>
              </div>
            )}

            {totalPages > 1 && (
              <Pagination className="mt-12">
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious href="#" onClick={(e) => { e.preventDefault(); setCurrentPage(p => Math.max(1, p - 1)); }} aria-disabled={currentPage === 1} />
                  </PaginationItem>
                  {[...Array(totalPages)].map((_, i) => (
                    <PaginationItem key={i}>
                      <PaginationLink href="#" onClick={(e) => { e.preventDefault(); setCurrentPage(i + 1); }} isActive={currentPage === i + 1}>
                        {i + 1}
                      </PaginationLink>
                    </PaginationItem>
                  ))}
                  {/* Add Ellipsis logic if many pages */}
                  <PaginationItem>
                    <PaginationNext href="#" onClick={(e) => { e.preventDefault(); setCurrentPage(p => Math.min(totalPages, p + 1)); }} aria-disabled={currentPage === totalPages} />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            )}
          </main>
        </div>
      </div>
      <Footer siteName="E-Commerce Pro" />
    </div>
  );
};

export default ProductListingPage;