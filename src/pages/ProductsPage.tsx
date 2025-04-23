
import { useState, useEffect } from "react";
import ProductCard from "@/components/ProductCard";
import CategoryFilter from "@/components/CategoryFilter";
import { mockProducts } from "@/data/mockData";
import { Product } from "@/types";
import { Input } from "@/components/ui/input";
import { SearchIcon } from "lucide-react";

const ProductsPage = () => {
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(mockProducts);
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState<string>("");

  useEffect(() => {
    // Filter products based on category and search term
    let result = mockProducts;

    if (activeCategory !== "all") {
      result = result.filter(product => product.category === activeCategory);
    }

    if (searchTerm) {
      const lowercaseSearch = searchTerm.toLowerCase();
      result = result.filter(product => 
        product.name.toLowerCase().includes(lowercaseSearch) || 
        product.description.toLowerCase().includes(lowercaseSearch) ||
        product.farmerName.toLowerCase().includes(lowercaseSearch)
      );
    }

    setFilteredProducts(result);
  }, [activeCategory, searchTerm]);

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Fresh Products</h1>

      <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 mb-8">
        <CategoryFilter onFilterChange={handleCategoryChange} />
        
        <div className="relative max-w-md">
          <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
          <Input
            type="text"
            placeholder="Search products, farms..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="pl-9"
          />
        </div>
      </div>

      {filteredProducts.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-xl text-gray-500">No products found matching your criteria.</p>
        </div>
      ) : (
        <div className="product-grid">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductsPage;
