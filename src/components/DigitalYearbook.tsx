'use client'

import { useState, useEffect, useCallback } from 'react'
import { GalleryItem } from '@/lib/types'

const CATEGORIES = ['All', 'Academics', 'Sports', 'Candid', 'Events', 'Newspaper'] as const

interface DigitalYearbookProps {
  baseUrl?: string
}

export default function DigitalYearbook({ baseUrl = '' }: DigitalYearbookProps) {
  const [activeCategory, setActiveCategory] = useState<string>('All')
  const [items, setItems] = useState<GalleryItem[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null)

  const fetchGallery = useCallback(async () => {
    setLoading(true)
    try {
      const categoryParam = activeCategory !== 'All' ? `&category=${activeCategory}` : ''
      const response = await fetch(`${baseUrl}/api/gallery?limit=50${categoryParam}`)
      const data = await response.json()

      if (data.success) {
        setItems(data.data.items || [])
      }
    } catch (error) {
      console.error('Failed to fetch gallery:', error)
    } finally {
      setLoading(false)
    }
  }, [activeCategory, baseUrl])

  useEffect(() => {
    fetchGallery()
  }, [fetchGallery])

  return (
    <section className="py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-2 vintage-heading">
          Digital Yearbook
        </h2>
        <p className="text-center text-amber-800/70 mb-8 italic">
          Memories from Creston Community High School — 1970
        </p>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {CATEGORIES.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200
                ${
                  activeCategory === category
                    ? 'bg-panther-red text-white shadow-md'
                    : 'bg-parchment/80 text-amber-900 border border-amber-900/20 hover:border-panther-red/40'
                }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Masonry Gallery */}
        {loading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-panther-red"></div>
          </div>
        ) : items.length === 0 ? (
          <div className="text-center py-12 text-amber-700/70">
            No images found in this category.
          </div>
        ) : (
          <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4">
            {items.map((item) => (
              <GalleryCard
                key={item.id}
                item={item}
                onClick={() => setSelectedItem(item)}
              />
            ))}
          </div>
        )}

        {/* Lightbox Modal */}
        {selectedItem && (
          <Lightbox item={selectedItem} onClose={() => setSelectedItem(null)} baseUrl={baseUrl} />
        )}
      </div>
    </section>
  )
}

function GalleryCard({ item, onClick }: { item: GalleryItem; onClick: () => void }) {
  const imageUrl = item.thumbnail_r2_key
    ? `/api/r2?key=${encodeURIComponent(item.thumbnail_r2_key)}`
    : `/api/r2?key=${encodeURIComponent(item.r2_object_key)}`

  return (
    <div
      className="break-inside-avoid mb-4 bg-parchment/90 rounded-lg border border-amber-900/20 
                 overflow-hidden cursor-pointer group hover:shadow-xl hover:border-panther-red/30 
                 transition-all duration-300"
      onClick={onClick}
    >
      <div className="relative overflow-hidden">
        <img
          src={imageUrl}
          alt={item.title}
          className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent 
                        opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
      <div className="p-3">
        <h3 className="font-semibold text-amber-950 text-sm truncate">{item.title}</h3>
        {item.caption && (
          <p className="text-xs text-amber-800/60 mt-1 line-clamp-2">{item.caption}</p>
        )}
        {item.date_taken && (
          <p className="text-xs text-amber-700/50 mt-1">
            {new Date(item.date_taken).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'short',
            })}
          </p>
        )}
      </div>
    </div>
  )
}

function Lightbox({
  item,
  onClose,
  baseUrl,
}: {
  item: GalleryItem
  onClose: () => void
  baseUrl: string
}) {
  const imageUrl = `/api/r2?key=${encodeURIComponent(item.r2_object_key)}`

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleEsc)
    return () => window.removeEventListener('keydown', handleEsc)
  }, [onClose])

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <div
        className="relative max-w-4xl max-h-[90vh] w-full bg-parchment rounded-lg overflow-hidden shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-black/50 text-white 
                     flex items-center justify-center hover:bg-black/70 transition-colors"
        >
          ✕
        </button>
        <div className="overflow-y-auto max-h-[90vh]">
          <img
            src={imageUrl}
            alt={item.title}
            className="w-full h-auto object-contain"
          />
          <div className="p-6">
            <h3 className="text-xl font-bold text-amber-950">{item.title}</h3>
            <span className="inline-block mt-2 px-3 py-1 text-xs font-medium rounded-full 
                           bg-panther-red/10 text-panther-red">
              {item.category}
            </span>
            {item.caption && (
              <p className="mt-3 text-amber-800/80">{item.caption}</p>
            )}
            {item.date_taken && (
              <p className="mt-2 text-sm text-amber-700/60">
                {new Date(item.date_taken).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </p>
            )}
            {item.tags && (
              <div className="mt-3 flex flex-wrap gap-2">
                {item.tags.split(',').map((tag) => (
                  <span
                    key={tag.trim()}
                    className="px-2 py-1 text-xs rounded-full bg-amber-900/10 text-amber-800/70"
                  >
                    {tag.trim()}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
