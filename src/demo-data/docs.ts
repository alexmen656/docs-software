import type { Product, Doc } from '@/types'

export const products: Product[] = [
  {
    id: 'shop',
    name: 'Shop Management',
    description: 'Verwaltung eines Online-Shops',
    icon: '🛒',
    slug: 'shop'
  },
  {
    id: 'website',
    name: 'Website Management',
    description: 'Verwaltung einer Website',
    icon: '🌐',
    slug: 'website'
  },
  {
    id: 'representative',
    name: 'Digitale Vertretung',
    description: 'Digitálne zastupiteľstvo',
    icon: '👤',
    slug: 'representative'
  },
  {
    id: 'publishing',
    name: 'Veröffentlichung',
    description: 'Zverejňovanie',
    icon: '📄',
    slug: 'publishing'
  },
  {
    id: 'analytics',
    name: 'Analytik & Berichte',
    description: 'Analytics and Reporting',
    icon: '📊',
    slug: 'analytics'
  },
  {
    id: 'security',
    name: 'Sicherheit',
    description: 'Security & Compliance',
    icon: '🔐',
    slug: 'security'
  }
]

export const demoDocuments: Doc[] = [
  // Shop Management Docs
  {
    id: 'shop-1',
    productId: 'shop',
    title: 'Shop Grundlagen',
    description: 'Lernen Sie die Grundlagen der Shop-Verwaltung kennen.',
    image: 'https://images.unsplash.com/photo-1633356122544-f134324ef6db?w=500&h=300&fit=crop',
    category: 'guide',
    createdAt: new Date(Date.now() - 14 * 60 * 60 * 1000),
    updatedAt: new Date(Date.now() - 3 * 1000)
  },
  {
    id: 'shop-2',
    productId: 'shop',
    title: 'Produkte hinzufügen',
    description: 'Schritt-für-Schritt Anleitung zum Hinzufügen von Produkten.',
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=500&h=300&fit=crop',
    category: 'tutorial',
    createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
    updatedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000)
  },
  {
    id: 'shop-3',
    productId: 'shop',
    title: 'Bestellungen verwalten',
    description: 'Best Practices für die Verwaltung von Bestellungen.',
    image: 'https://images.unsplash.com/photo-1516534775068-bb57ce32cb20?w=500&h=300&fit=crop',
    category: 'reference',
    createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
    updatedAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000)
  },

  // Website Management Docs
  {
    id: 'website-1',
    productId: 'website',
    title: 'Website erstellen',
    description: 'Anfänger-Guide zur Website-Erstellung.',
    image: 'https://images.unsplash.com/photo-1633356122544-f134324ef6db?w=500&h=300&fit=crop',
    category: 'guide',
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
    updatedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000)
  },
  {
    id: 'website-2',
    productId: 'website',
    title: 'SEO Optimierung',
    description: 'Tipps zur Suchmaschinen-Optimierung.',
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=500&h=300&fit=crop',
    category: 'blog',
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
    updatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000)
  },
  {
    id: 'website-3',
    productId: 'website',
    title: 'Design-Richtlinien',
    description: 'Best Practices im Web-Design.',
    image: 'https://images.unsplash.com/photo-1516534775068-bb57ce32cb20?w=500&h=300&fit=crop',
    category: 'reference',
    createdAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000),
    updatedAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000)
  },

  // Digitale Vertretung Docs
  {
    id: 'representative-1',
    productId: 'representative',
    title: 'Profil einrichten',
    description: 'Anleitung zum Erstellen eines digitalen Profils.',
    image: 'https://images.unsplash.com/photo-1633356122544-f134324ef6db?w=500&h=300&fit=crop',
    category: 'guide',
    createdAt: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000),
    updatedAt: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000)
  },
  {
    id: 'representative-2',
    productId: 'representative',
    title: 'Verfügbarkeit verwalten',
    description: 'Wie man seine Verfügbarkeit einstellt.',
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=500&h=300&fit=crop',
    category: 'tutorial',
    createdAt: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000),
    updatedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000)
  },

  // Veröffentlichung Docs
  {
    id: 'publishing-1',
    productId: 'publishing',
    title: 'Inhalte veröffentlichen',
    description: 'Schritt-für-Schritt Anleitung zur Veröffentlichung.',
    image: 'https://images.unsplash.com/photo-1633356122544-f134324ef6db?w=500&h=300&fit=crop',
    category: 'guide',
    createdAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000),
    updatedAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000)
  },
  {
    id: 'publishing-2',
    productId: 'publishing',
    title: 'Planung & Zeitplanung',
    description: 'Best Practices für Content-Planung.',
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=500&h=300&fit=crop',
    category: 'reference',
    createdAt: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000),
    updatedAt: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000)
  },

  // Analytics Docs
  {
    id: 'analytics-1',
    productId: 'analytics',
    title: 'Analytics Einführung',
    description: 'Grundlagen der Datenanalyse.',
    image: 'https://images.unsplash.com/photo-1633356122544-f134324ef6db?w=500&h=300&fit=crop',
    category: 'guide',
    createdAt: new Date(Date.now() - 9 * 24 * 60 * 60 * 1000),
    updatedAt: new Date(Date.now() - 9 * 24 * 60 * 60 * 1000)
  },
  {
    id: 'analytics-2',
    productId: 'analytics',
    title: 'Berichte generieren',
    description: 'Wie man automatisierte Berichte erstellt.',
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=500&h=300&fit=crop',
    category: 'tutorial',
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    updatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000)
  },

  // Security Docs
  {
    id: 'security-1',
    productId: 'security',
    title: 'Sicherheit Grundlagen',
    description: 'Einführung in Sicherheitsmaßnahmen.',
    image: 'https://images.unsplash.com/photo-1633356122544-f134324ef6db?w=500&h=300&fit=crop',
    category: 'guide',
    createdAt: new Date(Date.now() - 11 * 24 * 60 * 60 * 1000),
    updatedAt: new Date(Date.now() - 11 * 24 * 60 * 60 * 1000)
  },
  {
    id: 'security-2',
    productId: 'security',
    title: 'Zugriff kontrollieren',
    description: 'Verwaltung von Benutzerrollen und Zugriffen.',
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=500&h=300&fit=crop',
    category: 'reference',
    createdAt: new Date(Date.now() - 13 * 24 * 60 * 60 * 1000),
    updatedAt: new Date(Date.now() - 13 * 24 * 60 * 60 * 1000)
  }
]
