export interface Doc {
  id: string
  title: string
  description: string
  image: string
  createdAt: Date
  updatedAt: Date
  category: 'guide' | 'tutorial' | 'reference' | 'blog'
}
