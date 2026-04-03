'use client'

import { useState, useEffect, useCallback } from 'react'
import { Classmate } from '@/lib/types'

interface ClassDirectoryProps {
  baseUrl?: string
}

export default function ClassDirectory({ baseUrl = '' }: ClassDirectoryProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [classmates, setClassmates] = useState<Classmate[]>([])
  const [memorials, setMemorials] = useState<Classmate[]>([])
  const [loading, setLoading] = useState(true)
  const [debouncedQuery, setDebouncedQuery] = useState('')

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(searchQuery)
    }, 300)
    return () => clearTimeout(timer)
  }, [searchQuery])

  const fetchClassmates = useCallback(async () => {
    setLoading(true)
    try {
      const url = debouncedQuery
        ? `${baseUrl}/api/search?q=${encodeURIComponent(debouncedQuery)}`
        : `${baseUrl}/api/directory`

      const response = await fetch(url)
      const data = await response.json()

      if (data.success) {
        const allClassmates = data.data.items || data.data || []
        setClassmates(allClassmates.filter((c: Classmate) => c.status !== 'deceased'))
        setMemorials(allClassmates.filter((c: Classmate) => c.status === 'deceased'))
      }
    } catch (error) {
      console.error('Failed to fetch classmates:', error)
    } finally {
      setLoading(false)
    }
  }, [debouncedQuery, baseUrl])

  useEffect(() => {
    fetchClassmates()
  }, [fetchClassmates])

  return (
    <section className="py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-2 vintage-heading">
          Class of 1970 Directory
        </h2>
        <p className="text-center text-amber-800/70 mb-8 italic">
          Creston Community High School — Creston, Iowa
        </p>

        {/* Search Bar */}
        <div className="max-w-md mx-auto mb-10">
          <div className="relative">
            <input
              type="text"
              placeholder="Search by name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-3 pl-12 rounded-lg border-2 border-amber-900/30 
                         bg-parchment/80 text-amber-950 placeholder-amber-700/50
                         focus:outline-none focus:border-panther-red focus:ring-2 focus:ring-panther-red/20
                         transition-all duration-200"
            />
            <svg
              className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-amber-700/60"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>

        {/* In Memoriam Section */}
        {memorials.length > 0 && (
          <div className="mb-12">
            <h3 className="text-2xl font-semibold text-center mb-6 flex items-center justify-center gap-2">
              <span className="text-panther-red">🕯️</span>
              <span className="vintage-heading text-amber-900">In Memoriam</span>
              <span className="text-panther-red">🕯️</span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {memorials.map((classmate) => (
                <MemorialCard key={classmate.id} classmate={classmate} />
              ))}
            </div>
          </div>
        )}

        {/* Classmates Grid */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-4 text-amber-900 vintage-heading">
            {debouncedQuery ? `Search Results` : `All Classmates`}
            {debouncedQuery && (
              <span className="text-sm font-normal text-amber-700 ml-2">
                ({classmates.length} found)
              </span>
            )}
          </h3>

          {loading ? (
            <div className="flex justify-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-panther-red"></div>
            </div>
          ) : classmates.length === 0 ? (
            <div className="text-center py-8 text-amber-700/70">
              {debouncedQuery ? 'No classmates found matching your search.' : 'No classmates in directory.'}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {classmates.map((classmate) => (
                <ClassmateCard key={classmate.id} classmate={classmate} />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

function ClassmateCard({ classmate }: { classmate: Classmate }) {
  return (
    <div className="bg-parchment/90 rounded-lg border border-amber-900/20 p-4 
                    hover:shadow-lg hover:border-panther-red/30 transition-all duration-300
                    group">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-full bg-amber-900/10 flex items-center justify-center
                        border-2 border-amber-900/20 group-hover:border-panther-red/50 transition-colors">
          <span className="text-lg font-bold text-panther-red">
            {classmate.first_name?.[0]}{classmate.last_name?.[0]}
          </span>
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="font-semibold text-amber-950 truncate">
            {classmate.first_name} {classmate.last_name}
            {classmate.maiden_name && (
              <span className="text-amber-700/70 text-sm ml-1">
                ({classmate.maiden_name})
              </span>
            )}
          </h4>
          {classmate.bio && (
            <p className="text-xs text-amber-800/60 line-clamp-2 mt-1">
              {classmate.bio}
            </p>
          )}
        </div>
      </div>
    </div>
  )
}

function MemorialCard({ classmate }: { classmate: Classmate }) {
  return (
    <div className="bg-parchment/90 rounded-lg border border-panther-red/20 p-4 
                    hover:shadow-lg hover:border-panther-red/40 transition-all duration-300
                    relative overflow-hidden">
      {/* Candle icon */}
      <div className="absolute top-2 right-2 text-panther-red/60">
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2C10.5 5 8 7 8 10c0 2.2 1.8 4 4 4s4-1.8 4-4c0-3-2.5-5-4-8zm0 14c-3.3 0-6 2.7-6 6h12c0-3.3-2.7-6-6-6z" />
        </svg>
      </div>
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-full bg-panther-red/10 flex items-center justify-center
                        border-2 border-panther-red/30">
          <span className="text-lg font-bold text-panther-red">
            {classmate.first_name?.[0]}{classmate.last_name?.[0]}
          </span>
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="font-semibold text-amber-950 truncate">
            {classmate.first_name} {classmate.last_name}
          </h4>
          {classmate.bio && (
            <p className="text-xs text-amber-800/60 line-clamp-2 mt-1 italic">
              {classmate.bio}
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
