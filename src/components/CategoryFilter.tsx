
import { useState } from "react";
import { Button } from "@/components/ui/button";

interface CategoryFilterProps {
  onFilterChange: (category: string) => void;
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({ onFilterChange }) => {
  const [activeCategory, setActiveCategory] = useState<string>("all");

  const handleCategoryClick = (category: string) => {
    setActiveCategory(category);
    onFilterChange(category);
  };

  return (
    <div className="flex flex-wrap gap-2 mb-6">
      <Button
        variant={activeCategory === "all" ? "default" : "outline"}
        onClick={() => handleCategoryClick("all")}
        className={activeCategory === "all" ? "bg-farm-green hover:bg-farm-green/90" : ""}
      >
        All
      </Button>
      <Button
        variant={activeCategory === "vegetable" ? "default" : "outline"}
        onClick={() => handleCategoryClick("vegetable")}
        className={activeCategory === "vegetable" ? "bg-farm-green hover:bg-farm-green/90" : ""}
      >
        Vegetables
      </Button>
      <Button
        variant={activeCategory === "fruit" ? "default" : "outline"}
        onClick={() => handleCategoryClick("fruit")}
        className={activeCategory === "fruit" ? "bg-farm-green hover:bg-farm-green/90" : ""}
      >
        Fruits
      </Button>
    </div>
  );
};

export default CategoryFilter;
