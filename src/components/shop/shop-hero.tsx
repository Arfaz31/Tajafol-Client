import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import Image from "next/image"

export function ShopHero() {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Shop Fresh Fruits</h1>
          <p className="text-muted-foreground mb-6">
            Browse our wide selection of fresh seasonal fruits sourced directly from farms across Bangladesh. 
            From sweet mangoes to juicy litchis, we have everything you need.
          </p>
          
          <form className="relative max-w-md">
            <Input
              type="search"
              placeholder="Search for fruits..."
              className="pl-10 pr-4 py-2 w-full rounded-full border-primary/20"
            />
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
          </form>
        </div>
        
        <div className="hidden md:block relative h-64 rounded-lg overflow-hidden">
          <Image
            src="https://images.pexels.com/photos/1132558/pexels-photo-1132558.jpeg"
            alt="Fresh fruits"
            fill
            className="object-cover"
          />
        </div>
      </div>
    </div>
  )
}