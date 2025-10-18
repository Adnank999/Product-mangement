export interface Product {
  category: Category
  createdAt: string
  description: string
  id: string
  images: string[]
  name: string
  price: number
  slug: string
  updatedAt: string
}


export interface Category {
  createdAt: string
  description: any
  id: string
  image: string
  name: string
  updatedAt: string
}
