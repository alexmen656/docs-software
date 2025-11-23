export interface Product {
  id: string
  name: string
  description: string
  logo: string
  slug: string
}

export interface Doc {
  id: string
  productId: string
  title: string
  description: string
  image: string
  content?: string
  createdAt: Date
  updatedAt: Date
  category: 'guide' | 'tutorial' | 'reference' | 'blog'
}
