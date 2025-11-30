import axiosInstance from '@/axios'
import type { Doc, Chapter, DocItem } from '@/types'

export const docsService = {
  async getAllDocs(): Promise<Doc[]> {
    try {
      const response = await axiosInstance.get<Doc[]>('/api/docs')
      return response.data.map(doc => ({
        ...doc,
        createdAt: new Date(doc.createdAt),
        updatedAt: new Date(doc.updatedAt),
      }))
    } catch (error) {
      console.error('Error fetching docs:', error)
      throw error
    }
  },

  async getAllChapters(): Promise<Chapter[]> {
    try {
      const response = await axiosInstance.get<Chapter[]>('/api/chapters')
      return response.data.map(chapter => ({
        ...chapter,
        createdAt: new Date(chapter.createdAt),
        updatedAt: new Date(chapter.updatedAt),
      }))
    } catch (error) {
      console.error('Error fetching chapters:', error)
      throw error
    }
  },

  async getAllDocItems(): Promise<DocItem[]> {
    try {
      const [docs, chapters] = await Promise.all([
        this.getAllDocs(),
        this.getAllChapters(),
      ])
      return [...docs, ...chapters] as DocItem[]
    } catch (error) {
      console.error('Error fetching doc items:', error)
      throw error
    }
  },

  async getDocById(id: string): Promise<Doc | undefined> {
    try {
      const docs = await this.getAllDocs()
      return docs.find(doc => doc.id === id)
    } catch (error) {
      console.error('Error fetching doc by ID:', error)
      throw error
    }
  },

  async getChapterById(id: string): Promise<Chapter | undefined> {
    try {
      const chapters = await this.getAllChapters()
      return chapters.find(chapter => chapter.id === id)
    } catch (error) {
      console.error('Error fetching chapter by ID:', error)
      throw error
    }
  },

  async getDocsByProductId(productId: string): Promise<DocItem[]> {
    try {
      const items = await this.getAllDocItems()
      return items.filter(item => item.productId === productId && !item.parentId)
    } catch (error) {
      console.error('Error fetching docs by product:', error)
      throw error
    }
  },

  async getDocsByChapterId(chapterId: string): Promise<DocItem[]> {
    try {
      const items = await this.getAllDocItems()
      return items.filter(item => item.parentId === chapterId)
    } catch (error) {
      console.error('Error fetching docs by chapter:', error)
      throw error
    }
  },
}
