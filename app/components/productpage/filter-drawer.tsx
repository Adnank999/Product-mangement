"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerClose } from "@/components/ui/drawer"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { ScrollArea } from "@/components/ui/scroll-area"
import { X } from "lucide-react"
import { useGetCategoriesQuery, useSearchCategoriesQuery } from "@/app/redux/category/categoryApi"

interface FilterDrawerProps {
  onCategoryChange: (selected: number[]) => void
}

export function FilterDrawer({ onCategoryChange }: FilterDrawerProps) {
  const [open, setOpen] = useState(false)
  const [search, setSearch] = useState("")
  const [categories, setCategories] = useState<any[]>([])
  const [selectedCategories, setSelectedCategories] = useState<number[]>([])

  const { data: allCategories, isSuccess: isAllCategoriesSuccess } = useGetCategoriesQuery(
    { offset: 0, limit: 50 },
    { skip: !open },
  )

  const { data: searchedCategories } = useSearchCategoriesQuery(search, { skip: !search })

  useEffect(() => {
    if (search) {
      setCategories(searchedCategories || [])
    } else if (open && isAllCategoriesSuccess) {
      setCategories(allCategories || [])
    }
  }, [open, search, searchedCategories, allCategories, isAllCategoriesSuccess])

  const handleToggleDrawer = () => setOpen(!open)
  const handleClose = () => setOpen(false)

  const handleCheckboxChange = (id: number, checked: boolean) => {
    const updated = checked
      ? [...selectedCategories, id]
      : selectedCategories.filter((catId) => catId !== id)
    setSelectedCategories(updated)
    onCategoryChange(updated) // notify parent
  }

  return (
    <>
      <Button variant="outline" onClick={handleToggleDrawer}>
        Filter
      </Button>

      <Drawer open={open} onOpenChange={setOpen} direction="left">
        <DrawerContent className="left-0 translate-y-1/2 z-50 w-80 max-h-[60vh] bg-background rounded-r-lg shadow-lg border border-border flex flex-col data-[state=open]:animate-in data-[state=closed]:animate-out duration-300">
          <DrawerHeader className="flex flex-row items-center justify-between border-b px-4 py-3 flex-shrink-0">
            <DrawerTitle>Filter Categories</DrawerTitle>
            <DrawerClose asChild>
              <Button variant="ghost" size="icon" onClick={handleClose}>
                <X className="h-5 w-5" />
              </Button>
            </DrawerClose>
          </DrawerHeader>

          <div className="px-4 py-3 flex-shrink-0">
            <Input
              placeholder="Search categories..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <ScrollArea className="flex-1 px-4 pb-4">
            <div className="flex flex-col gap-3">
              {categories.length > 0 ? (
                categories.map((category: any) => (
                  <label
                    key={category.id}
                    className="flex items-center gap-2 text-sm text-muted-foreground cursor-pointer hover:text-foreground transition-colors"
                  >
                    <Checkbox
                      checked={selectedCategories.includes(category.id)}
                      onCheckedChange={(checked) => handleCheckboxChange(category.id, !!checked)}
                      onClick={(e) => e.stopPropagation()}
                    />
                    <span>{category.name}</span>
                  </label>
                ))
              ) : (
                <p className="text-center text-sm text-muted-foreground py-6">
                  No categories found
                </p>
              )}
            </div>
          </ScrollArea>
        </DrawerContent>
      </Drawer>
    </>
  )
}
