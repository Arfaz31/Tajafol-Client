import { Button } from "@/components/ui/button"
import { categories } from "@/lib/data/categories"

interface CategoryFiltersProps {
  filters: {
    category: string | null
  }
  handleCategoryFilter: (category: string | null) => void
}

export function CategoryFilters({ filters, handleCategoryFilter }: CategoryFiltersProps) {
  return (
    <div className="flex flex-wrap gap-2 mb-6">
      <Button 
        variant="outline" 
        className={`rounded-full ${!filters.category ? 'bg-primary text-white hover:bg-primary-hover' : ''}`}
        onClick={() => handleCategoryFilter(null)}
      >
        All Fruits
      </Button>
      
      {categories.map((category) => (
        <Button 
          key={category.id}
          variant="outline" 
          className={`rounded-full ${filters.category === category.slug ? 'bg-primary text-white hover:bg-primary-hover' : ''}`}
          onClick={() => handleCategoryFilter(category.slug)}
        >
          {category.name}
        </Button>
      ))}
    </div>
  )
}