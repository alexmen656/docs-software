import type { Doc } from '@/types'

export const demoDocuments: Doc[] = [
  {
    id: '1',
    title: 'Vue 3 Getting Started',
    description: 'Learn the basics of Vue 3 and how to build reactive web applications with the Composition API.',
    image: 'https://images.unsplash.com/photo-1633356122544-f134324ef6db?w=500&h=300&fit=crop',
    category: 'guide',
    createdAt: new Date(Date.now() - 14 * 60 * 60 * 1000),
    updatedAt: new Date(Date.now() - 3 * 1000)
  },
  {
    id: '2',
    title: 'TypeScript Best Practices',
    description: 'Master TypeScript fundamentals and learn industry best practices for type-safe development.',
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=500&h=300&fit=crop',
    category: 'reference',
    createdAt: new Date(Date.now() - 14 * 60 * 60 * 1000),
    updatedAt: new Date(Date.now() - 14 * 60 * 60 * 1000)
  },
  {
    id: '3',
    title: 'REST API Design Guide',
    description: 'Comprehensive guide to designing scalable and maintainable REST APIs with best practices.',
    image: 'https://images.unsplash.com/photo-1516534775068-bb57ce32cb20?w=500&h=300&fit=crop',
    category: 'guide',
    createdAt: new Date(Date.now() - 15 * 60 * 60 * 1000),
    updatedAt: new Date(Date.now() - 15 * 60 * 60 * 1000)
  },
  {
    id: '4',
    title: 'Database Optimization Tips',
    description: 'Practical techniques for optimizing database performance and reducing query latency.',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500&h=300&fit=crop',
    category: 'tutorial',
    createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
    updatedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
  },
  {
    id: '5',
    title: 'Docker Container Deployment',
    description: 'Step-by-step tutorial for containerizing applications and deploying with Docker.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=500&h=300&fit=crop',
    category: 'tutorial',
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
    updatedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000)
  },
  {
    id: '6',
    title: 'Testing Strategies in React',
    description: 'Learn unit testing, integration testing, and end-to-end testing for React applications.',
    image: 'https://images.unsplash.com/photo-1516321318423-f06f70d504f0?w=500&h=300&fit=crop',
    category: 'blog',
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    updatedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000)
  }
]
