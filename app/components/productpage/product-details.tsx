"use client"

import { useState } from "react"
import { useGetProductBySlugQuery } from "@/app/redux/product/productApi"
import { Button } from "@/components/ui/button"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Image from "next/image"
import { Skeleton } from "@/components/ui/skeleton"
import { Heart, Share2, ShoppingCart, Minus, Plus } from "lucide-react"

const ProductDetails = ({ slug }: { slug: string }) => {
    const { data, error, isLoading } = useGetProductBySlugQuery(slug)
    const [quantity, setQuantity] = useState(1)
    const [isWishlisted, setIsWishlisted] = useState(false)

    if (isLoading) {
        return (
            <div className="min-h-screen bg-background">
                <div className="container mx-auto px-4 py-12">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                        <Skeleton className="w-full h-[500px] rounded-2xl" />
                        <div className="space-y-6">
                            <Skeleton className="h-8 w-3/4" />
                            <Skeleton className="h-4 w-1/2" />
                            <div className="space-y-3">
                                <Skeleton className="h-4 w-full" />
                                <Skeleton className="h-4 w-full" />
                                <Skeleton className="h-4 w-2/3" />
                            </div>
                            <Skeleton className="h-12 w-1/3" />
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    if (error) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center">
                <div className="text-center">
                    <p className="text-lg font-semibold text-destructive mb-2">Error fetching product</p>
                    <p className="text-muted-foreground">We couldn't load the product details. Please try again.</p>
                </div>
            </div>
        )
    }

    if (!data) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center">
                <div className="text-center">
                    <p className="text-lg font-semibold text-foreground mb-2">Product not found</p>
                    <p className="text-muted-foreground">The product you're looking for doesn't exist.</p>
                </div>
            </div>
        )
    }

    const { name, description, price, images, category } = data

    const handleQuantityChange = (delta: number) => {
        setQuantity(Math.max(1, quantity + delta))
    }

    return (
        <div className="min-h-screen bg-background">
            <div className="container mx-auto px-4 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">

                    <div className="flex flex-col gap-4">
                        <div className="relative group">
                            {images && images.length > 1 ? (
                                <Carousel className="w-full">
                                    <CarouselContent>
                                        {images.map((image: string, index: number) => (
                                            <CarouselItem key={index}>
                                                <div
                                                    className="
                                                            relative w-full 
                                                            h-[240px] sm:h-[300px] md:h-[350px] lg:h-[400px]
                                                            overflow-hidden rounded-xl bg-muted
                                                        "
                                                >
                                                    <Image
                                                        src={image || "/no-image.jpg"}
                                                        alt={`${name} - Image ${index + 1}`}
                                                        fill
                                                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                                                        priority={index === 0}
                                                    />
                                                </div>
                                            </CarouselItem>
                                        ))}
                                    </CarouselContent>
                                    <CarouselPrevious className="absolute left-3 top-1/2 -translate-y-1/2 bg-background/70 backdrop-blur-sm hover:bg-background border-0 shadow-md rounded-full" />
                                    <CarouselNext className="absolute right-3 top-1/2 -translate-y-1/2 bg-background/70 backdrop-blur-sm hover:bg-background border-0 shadow-md rounded-full" />
                                </Carousel>
                            ) : (
                                <div
                                    className="
                                        relative w-full 
                                        h-[240px] sm:h-[300px] md:h-[350px] lg:h-[400px]
                                        overflow-hidden rounded-xl bg-muted
                                    "
                                >
                                    <Image
                                        src={images?.[0] || "/no-image.jpg"}
                                        alt={name}
                                        fill
                                        className="object-cover"
                                        priority
                                    />
                                </div>
                            )}
                        </div>


                        {images && images.length > 1 && (
                            <div className="flex gap-3 overflow-x-auto pb-2">
                                {images.slice(0, 4).map((image: string, index: number) => (
                                    <div
                                        key={index}
                                        className="relative w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden border-2 border-transparent hover:border-primary cursor-pointer transition-colors"
                                    >
                                        <Image
                                            src={image || "/no-image.jpg"}
                                            alt={`Thumbnail ${index + 1}`}
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>


                    <div className="flex flex-col justify-between">

                        <div className="space-y-6">
                            {category && (
                                <div className="flex items-center gap-2">
                                    <Badge variant="secondary" className="text-xs font-medium px-3 py-1">
                                        {category.name || "Product"}
                                    </Badge>
                                    <span className="text-xs text-muted-foreground">In Stock</span>
                                </div>
                            )}

                            <div className="space-y-3">
                                <h1 className="text-4xl lg:text-3xl font-bold text-foreground leading-tight">{name}</h1>
                                <p className="text-lg text-muted-foreground leading-relaxed">{description}</p>
                            </div>

                            <div className="flex items-baseline gap-3 pt-2">
                                <span className="text-xl font-bold text-primary">${price}</span>
                                <span className="text-sm text-muted-foreground">+ applicable tax</span>
                            </div>

                            <div className="flex items-center gap-4 pt-4">
                                <div className="flex items-center border border-border rounded-lg bg-muted/50">
                                    <button
                                        onClick={() => handleQuantityChange(-1)}
                                        className="p-2 hover:bg-background transition-colors"
                                        aria-label="Decrease quantity"
                                    >
                                        <Minus className="w-4 h-4" />
                                    </button>
                                    <span className="px-6 py-2 font-semibold min-w-12 text-center">{quantity}</span>
                                    <button
                                        onClick={() => handleQuantityChange(1)}
                                        className="p-2 hover:bg-background transition-colors"
                                        aria-label="Increase quantity"
                                    >
                                        <Plus className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-4 pt-8">
                            <Button size="lg" className="w-full text-base font-semibold py-6 rounded-lg">
                                <ShoppingCart className="w-5 h-5 mr-2" />
                                Add to Cart
                            </Button>

                            <div className="flex gap-3">
                                <Button
                                    variant="outline"
                                    size="lg"
                                    className="flex-1 rounded-lg bg-transparent"
                                    onClick={() => setIsWishlisted(!isWishlisted)}
                                >
                                    <Heart className={`w-5 h-5 ${isWishlisted ? "fill-current text-destructive" : ""}`} />
                                </Button>
                                <Button variant="outline" size="lg" className="flex-1 rounded-lg bg-transparent">
                                    <Share2 className="w-5 h-5" />
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-20 pt-12 border-t border-border">
                    <Tabs defaultValue="details" className="w-full">
                        <TabsList className="grid w-full max-w-md grid-cols-3 rounded-lg bg-muted p-1">
                            <TabsTrigger value="details" className="rounded">
                                Details
                            </TabsTrigger>
                            <TabsTrigger value="specs" className="rounded">
                                Specifications
                            </TabsTrigger>
                            <TabsTrigger value="shipping" className="rounded">
                                Shipping
                            </TabsTrigger>
                        </TabsList>

                        <TabsContent value="details" className="mt-8 space-y-4">
                            <p className="text-muted-foreground leading-relaxed">{description}</p>
                            <p className="text-muted-foreground leading-relaxed">
                                This premium product is crafted with attention to detail and designed to exceed your expectations. Each
                                item is carefully inspected to ensure the highest quality standards.
                            </p>
                        </TabsContent>

                        <TabsContent value="specs" className="mt-8 space-y-4">
                            <div className="grid grid-cols-2 gap-6">
                                <div>
                                    <p className="text-sm font-semibold text-foreground mb-1">Category</p>
                                    <p className="text-muted-foreground">{category?.name || "General"}</p>
                                </div>
                                <div>
                                    <p className="text-sm font-semibold text-foreground mb-1">Availability</p>
                                    <p className="text-muted-foreground">In Stock</p>
                                </div>
                            </div>
                        </TabsContent>

                        <TabsContent value="shipping" className="mt-8 space-y-4">
                            <p className="text-muted-foreground leading-relaxed">
                                Free shipping on orders over $50. Standard delivery takes 5-7 business days. Express shipping available
                                for an additional fee.
                            </p>
                            <p className="text-muted-foreground leading-relaxed">
                                We offer a 30-day money-back guarantee on all products. If you're not satisfied, simply return it for a
                                full refund.
                            </p>
                        </TabsContent>
                    </Tabs>
                </div>
            </div>
        </div>
    )
}

export default ProductDetails
