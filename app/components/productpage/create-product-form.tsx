"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { toast } from "sonner"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import ImageUpload from "./image-upload"
import { useGetCategoriesQuery } from "@/app/redux/category/categoryApi"
import {
    useCreateProductMutation,
    useGetProductBySlugQuery,
    useUpdateProductMutation,
} from "@/app/redux/product/productApi"
import { useEffect } from "react"
import { useParams, usePathname, useRouter } from "next/navigation"
import { Skeleton } from "@/components/ui/skeleton"


// const formSchema = z.object({
//     name: z.string().min(1, "Name is required").max(50),
//     description: z.string().min(1, "Description is required").max(255),
//     images: z.array(z.string().url()).min(1, "At least one image is required"),
//     price: z.number().min(1, "Price must be positive"),
//     categoryId: z.string(),
// });

export const createProductSchema = z.object({
    name: z.string().min(1, "Name is required").max(50),
    description: z.string().min(1, "Description is required").max(255),
    images: z.array(z.string().url()).min(1, "At least one image is required"),
    price: z.number().min(1, "Price must be positive"),
    categoryId: z.string(),
})

export const updateProductSchema = createProductSchema.partial()

export default function ProductForm() {
    const pathname = usePathname()
    const params = useParams()
    const slug = params?.slug
    const router = useRouter()

    const formTitle = pathname.includes("create") ? "Create  New " : "Edit"
    const formPara = pathname.includes("create") ? "add a new product." : "edit the product"
    const isEditMode = pathname.includes("edit")



    const formSchema = isEditMode ? updateProductSchema : createProductSchema

    const [createProduct, { isLoading: createLoading }] = useCreateProductMutation()
    const [updateProduct, { isLoading: updateLoading }] = useUpdateProductMutation()
    const { data, error, isLoading } = useGetProductBySlugQuery(slug, { skip: !isEditMode })



    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            description: "",
            images: [],
            price: 0,
            categoryId: "",
        },
        resetOptions: {
            keepDirtyValues: true,
            keepErrors: true,
        },
    })

    useEffect(() => {
        if (isEditMode && data) {
            form.reset({
                name: data?.name || "",
                description: data?.description || "",
                images: data?.images || [],
                price: data?.price || 0,
                categoryId: data?.categoryId || "",
            })
        }
    }, [data, isEditMode, form])

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            if (isEditMode) {
                await updateProduct({ id: params.id, updatedProduct: values }).unwrap()
                toast.success("✅ Product updated successfully!")
                router.push("/products")
            } else {
                await createProduct(values).unwrap()
                toast.success("✅ Product created successfully!")
                router.push("/products")
            }

            form.reset()
        } catch (error: any) {
            console.error("Form submission error", error)
            toast.error(error?.data?.message || "Failed to submit the form. Please try again.")
        }
    }

    const { data: allCategories, isSuccess: isAllCategoriesSuccess } = useGetCategoriesQuery({ offset: 0, limit: 50 })

    if (isLoading) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center">
                <Skeleton className="w-full max-w-2xl" />
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

    return (
        <div className="flex justify-center mt-16 px-4">
            <Card className="w-full max-w-2xl shadow-lg">
                <CardHeader>
                    <CardTitle className="text-2xl font-bold text-center">{formTitle} Product</CardTitle>
                    <CardDescription className="text-center text-gray-500">
                        Fill out the details below to {formPara}
                    </CardDescription>
                </CardHeader>

                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Product Name</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="e.g. Wireless Headphones"
                                                className="max-w-sm"
                                                {...form.register("name")}
                                                value={field.value || ""}
                                            />
                                        </FormControl>
                                        <FormDescription>Enter your product name</FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="description"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Description</FormLabel>
                                        <FormControl>
                                            <Textarea
                                                placeholder="Write a short product description..."
                                                className="resize-none"
                                                rows={4}
                                                {...form.register("description")}
                                            />
                                        </FormControl>
                                        <FormDescription>Describe the key features of your product.</FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="images"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Product Images</FormLabel>
                                        <FormControl>
                                            <ImageUpload
                                                maxFiles={5}
                                                maxSize={4 * 1024 * 1024}
                                                onImagesChange={(imgs) => {
                                                    console.log(imgs)
                                                    field.onChange(imgs)
                                                }}
                                            />
                                        </FormControl>
                                        <FormDescription>Upload up to 5 images (max 4 MB each)</FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                {/* Price */}
                                <FormField
                                    control={form.control}
                                    name="price"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Price</FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="number"
                                                    placeholder="e.g. 99.99"
                                                    {...form.register("price",{valueAsNumber : true})}
                                                    value={field.value}
                                                    onChange={(e) => field.onChange(Number(e.target.value))}
                                                />
                                            </FormControl>
                                            <FormDescription>Enter your product price</FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="categoryId"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Category</FormLabel>
                                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select a category" />
                                                    </SelectTrigger>
                                                </FormControl>

                                                <SelectContent>
                                                    {isAllCategoriesSuccess && allCategories?.length > 0 ? (
                                                        allCategories.map((category: any) => (
                                                            <SelectItem key={category.id} value={String(category.id)}>
                                                                {category.name}
                                                            </SelectItem>
                                                        ))
                                                    ) : (
                                                        <SelectItem value="none" disabled>
                                                            No categories available
                                                        </SelectItem>
                                                    )}
                                                </SelectContent>
                                            </Select>
                                            <FormDescription>Choose your product category</FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>

                            <CardFooter className="flex justify-end pt-4">
                                <Button type="submit" className="px-6">
                                    Submit
                                </Button>
                            </CardFooter>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
    )
}
