"use client"

import { useState } from "react"
import { useGetProductsQuery, useGetProductsByCategoryQuery, useSearchProductsQuery, useDeleteProductMutation } from "@/app/redux/product/productApi"
import { Skeleton } from "@/components/ui/skeleton"
import { Input } from "@/components/ui/input"
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"
import ProductCard from "./product-card"
import { FilterDrawer } from "./filter-drawer"
import type { Product } from "@/types/Product"
import useDebounce from "@/app/hooks/useDebounce"
import {  Search } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { DeleteDialog } from "./delete-dialog"
import { toast } from "sonner"


const ProductList = () => {
    const [offset, setOffset] = useState(0)
    const [limit, setLimit] = useState(12)
    const [selectedCategories, setSelectedCategories] = useState<number[]>([])
    const [searchText, setSearchText] = useState("")

    const debouncedSearch = useDebounce(searchText, 400)

    const {
        data: productsByCategory,
        isLoading: isCategoryLoading,
        error: categoryError,
    } = useGetProductsByCategoryQuery(selectedCategories, {
        skip: selectedCategories.length === 0,
    })

    const {
        data: allProducts,
        isLoading: isAllLoading,
        error: allError,
    } = useGetProductsQuery({ offset, limit }, { skip: selectedCategories.length > 0 })

    const {
        data: searchedProducts,
        isLoading: isSearchLoading,
        error: searchError,
    } = useSearchProductsQuery(debouncedSearch, {
        skip: !debouncedSearch,
    })

    const [deleteProduct, { isLoading: deleteLoading }] = useDeleteProductMutation()


    const data =
        debouncedSearch && searchedProducts
            ? searchedProducts
            : selectedCategories.length > 0
                ? productsByCategory
                : allProducts

    const isLoading =
        debouncedSearch && isSearchLoading
            ? true
            : selectedCategories.length > 0
                ? isCategoryLoading
                : isAllLoading

    const error =
        debouncedSearch && searchError
            ? searchError
            : selectedCategories.length > 0
                ? categoryError
                : allError



    const handleCategoryChange = (ids: number[]) => setSelectedCategories(ids)


    const handleDelete = async (id: string) => {
        try {
            await deleteProduct(id).unwrap()
            toast.success("✅ Product deleted successfully!", {
                description: "The product has been permanently removed."
            })
        
     

        } catch (error) {
            console.error("❌ Failed to delete product:", error)

        }
    }

    if (isLoading) {
        return (
            <div className="w-full px-4 py-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                    {[...Array(10)].map((_, idx) => (
                        <div key={idx} className="flex flex-col gap-3">
                            <Skeleton className="w-full h-48 rounded-lg" />
                            <Skeleton className="w-3/4 h-4" />
                            <Skeleton className="w-1/2 h-4" />
                        </div>
                    ))}
                </div>
            </div>
        )
    }

    if (error) {
        return (
            <div className="w-full px-4 py-8 text-center">
                <p className="text-red-600 font-medium">Failed to load products. Please try again later.</p>
            </div>
        )
    }

    return (
        <div className="w-full px-4 py-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
                <FilterDrawer onCategoryChange={handleCategoryChange} />

                <div className="relative w-full md:w-1/3">
                    <Search className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                    <Input
                        type="text"
                        placeholder="Search products..."
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                        className="pl-10 pr-4 py-2 border border-border rounded-lg shadow-sm focus:ring-2 focus:ring-primary"
                    />
                </div>
            </div>

            {data && data.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                    {data.map((product: Product) => (
                        <div
                            key={product.id}
                            className="flex flex-col justify-between bg-card rounded-lg shadow-md p-3 h-full"
                        >
                            {/* Product Card */}
                            <Link href={`/products/${product.slug}`} passHref>
                                <div className="flex-1">
                                    <ProductCard
                                        id={product.id}
                                        name={product.name}
                                        description={product.description}
                                        price={product.price}
                                        image={product.images?.[0]}
                                    />
                                </div>
                            </Link>


                            <div className="flex justify-start gap-3 mt-4">
                                <Link href={`/products/edit/${product.id}/${product.slug}`} passHref>
                                    <Button variant="default" className="rounded-full w-full">
                                        Edit
                                    </Button>
                                </Link>

                                <DeleteDialog productId={product.id} handleDelete={handleDelete} deleteLoading={deleteLoading} />
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="text-center text-muted-foreground py-16 text-sm">
                    No products found.
                </div>
            )}





            {!debouncedSearch && selectedCategories.length === 0 && (
                <div className="mt-8 flex justify-center">
                    <Pagination>
                        <PaginationContent>
                            <PaginationItem>
                                <PaginationPrevious
                                    onClick={() => setOffset(Math.max(0, offset - limit))}
                                    className={offset === 0 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                                />
                            </PaginationItem>
                            <PaginationItem>
                                <span className="px-4 py-2 text-sm">Page {Math.floor(offset / limit) + 1}</span>
                            </PaginationItem>
                            <PaginationItem>
                                <PaginationNext
                                    onClick={() => setOffset(offset + limit)}
                                    className="cursor-pointer"
                                />
                            </PaginationItem>
                        </PaginationContent>
                    </Pagination>
                </div>
            )}
        </div>
    )
}

export default ProductList
