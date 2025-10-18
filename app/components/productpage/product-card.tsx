"use client"

import { Card, CardHeader, CardFooter } from "@/components/ui/card"
import { useState } from "react"
import Image from "next/image"

type ProductCardProps = {
  id: string
  name: string
  description: string
  price: number
  image?: string
}

const ProductCard = ({ id, name, description, price, image }: ProductCardProps) => {
  const isValidImage = image && /^https?:\/\/.*\.(jpg|jpeg|png|webp|gif|svg)$/i.test(image)
  const productImage = isValidImage ? image : "/no-image.jpg"

  const [isExpanded, setIsExpanded] = useState(false)

  const trimmedTitle = name.length > 25 ? name.slice(0, 25) + "..." : name
  const trimmedDescription = description.length > 60 ? description.slice(0, 60) + "..." : description

  return (
    <Card
      className="flex flex-col overflow-hidden rounded-lg border shadow-sm hover:shadow-lg transition-shadow duration-300 bg-white bg-opacity-30 backdrop-blur-md h-[400px]" // 👈 fixed height
      style={{ paddingBlock: 0, gap: 0 }}
    >
      {/* Image Section */}
      <div className="relative w-full h-48 overflow-hidden flex-shrink-0">
        <Image
          src={productImage}
          alt={name}
          fill
          className="object-cover w-full h-full"
          sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
        />
      </div>

      {/* Content Section */}
      <CardHeader className="flex-1 flex flex-col p-4 overflow-hidden">
        <h3 className="text-base font-semibold line-clamp-2">{isExpanded ? name : trimmedTitle}</h3>
        <p className="mt-2 text-sm text-gray-700 line-clamp-2">
          {isExpanded ? description : trimmedDescription}
        </p>

        {description.length > 60 && (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-blue-600 hover:text-blue-700 mt-2 text-xs font-medium transition-colors"
          >
            {isExpanded ? "See less" : "See more"}
          </button>
        )}
      </CardHeader>

      {/* Footer Section */}
      <CardFooter className="p-4 border-t border-gray-100 flex items-center justify-between">
        <p className="text-lg font-bold">${price.toFixed(2)}</p>
      </CardFooter>
    </Card>
  )
}

export default ProductCard
