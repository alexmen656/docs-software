export interface Product {
  id: string
  name: string
  description: string
  logo: string
  slug: string
}

export interface Chapter {
  id: string
  productId: string
  parentId?: string
  title: string
  description: string
  image?: string
  createdAt: Date
  updatedAt: Date
  type: 'chapter'
}

export interface Doc {
  id: string
  productId: string
  parentId?: string
  title: string
  description: string
  image: string
  content?: string
  createdAt: Date
  updatedAt: Date
  category: 'guide' | 'tutorial' | 'reference' | 'blog'
  type: 'article'
}

export type DocItem = Chapter | Doc
