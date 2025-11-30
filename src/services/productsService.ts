import axiosInstance from '@/axios'
import type { Product } from '@/types'

export const productsService = {
  async getAllProducts(): Promise<Product[]> {
    try {
      const response = await axiosInstance.get<Product[]>('/api/products')
      return response.data
    } catch (error) {
      console.error('Error fetching products:', error)
      throw error
    }
  },

  async getProductBySlug(slug: string): Promise<Product | undefined> {
    try {
      const products = await this.getAllProducts()
      return products.find((p) => p.slug === slug)
    } catch (error) {
      console.error('Error fetching product by slug:', error)
      throw error
    }
  },
}
