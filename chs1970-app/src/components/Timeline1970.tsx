'use client'

import { useState, useEffect } from 'react'
import { TimelineEvent } from '@/lib/types'

interface Timeline1970Props {
  baseUrl?: string
}

const DEFAULT_EVENTS: TimelineEvent[] = [
  {
    id: 1,
    title: 'Irving/Maple School Building Demolished',
    description:
      'The old Irving/Maple Street school building, which had served Creston students for decades, was demolished to make way for modern educational facilities.',
    event_date: '1970-01-15',
    category: 'School',
    image_r2_key: null,
    source_url: null,
  },
  {
    id: 2,
    title: 'Creston Panthers Basketball Season Opens',
    description:
      'The Creston Community High School Panthers opened their 1970 basketball season with high hopes and a roster full of talented seniors.',
    event_date: '1970-01-20',
    category: 'Sports',
    image_r2_key: null,
    source_url: null,
  },
  {
    id: 3,
    title: 'Earth Day First Observed',
    description:
      'The first Earth Day was celebrated nationwide on April 22, 1970. Creston students participated in local environmental awareness activities.',
    event_date: '1970-04-22',
    category: 'Community',
    image_r2_key: null,
    source_url: null,
  },
  {
    id: 4,
    title: 'Creston News Advertiser Expands Coverage',
    description:
      'The local newspaper expanded its coverage of high school sports and activities, giving the Class of 1970 more visibility in the community.',
    event_date: '1970-05-01',
    category: 'Community',
    image_r2_key: null,
    source_url: null,
  },
  {
    id: 5,
    title: 'Spring Musical Production',
    description:
      'The CCHS drama department presented their spring musical, featuring several Class of 1970 students in leading roles.',
    event_date: '1970-05-15',
    category: 'School',
    image_r2_key: null,
    source_url: null,
  },
  {
    id: 6,
    title: 'Prom Night at the National Guard Armory',
    description:
      'The Class of 1970 held their senior prom at the Creston National Guard Armory, decorated with a "Groovy 70s" theme.',
    event_date: '1970-05-22',
    category: 'School',
    image_r2_key: null,
    source_url: null,
  },
  {
    id: 7,
    title: 'Graduation Ceremony — Class of 1970',
    description:
      'The Creston Community High School Class of 1970 held their commencement ceremony, marking the end of an era and the beginning of new journeys.',
    event_date: '1970-05-31',
    category: 'School',
    image_r2_key: null,
    source_url: null,
  },
  {
    id: 8,
    title: 'Apollo 13 Crisis Captivates Nation',
    description:
      'The Apollo 13 mission crisis in April 1970 captivated the nation. Creston families gathered around their televisions to watch the dramatic rescue unfold.',
    event_date: '1970-04-13',
    category: 'National',
    image_r2_key: null,
    source_url: null,
  },
  {
    id: 9,
    title: 'New Creston Public Library Wing Opens',
    description:
      'The Gibson Memorial Library opened a new wing, expanding resources for Creston residents and students.',
    event_date: '1970-09-01',
    category: 'Civic',
    image_r2_key: null,
    source_url: null,
  },
  {
    id: 10,
    title: 'Homecoming Game & Parade',
    description:
      'The annual Creston Panthers Homecoming celebration featured a parade down Main Street and a memorable football game.',
    event_date: '1970-10-09',
    category: 'Sports',
    image_r2_key: null,
    source_url: null,
  },
]

export default function Timeline1970({ baseUrl = '' }: Timeline1970Props) {
  const [events, setEvents] = useState<TimelineEvent[]>(DEFAULT_EVENTS)
  const [loading, setLoading] = useState(false)
  const [activeFilter, setActiveFilter] = useState<string>('All')

  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true)
      try {
        const filterParam = activeFilter !== 'All' ? `?category=${activeFilter}` : ''
        const response = await fetch(`${baseUrl}/api/timeline${filterParam}`)
        const data = await response.json()

        if (data.success && data.data.length > 0) {
          setEvents(data.data)
        }
      } catch {
        // Fall back to default events
      } finally {
        setLoading(false)
      }
    }

    fetchEvents()
  }, [activeFilter, baseUrl])

  const categories = ['All', 'School', 'Sports', 'Community', 'Civic', 'National']

  const filteredEvents =
    activeFilter === 'All'
      ? events
      : events.filter((e) => e.category === activeFilter)

  return (
    <section className="py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-2 vintage-heading">
          The 1970 Timeline
        </h2>
        <p className="text-center text-amber-800/70 mb-8 italic">
          A year to remember in Creston, Iowa
        </p>

        {/* Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200
                ${
                  activeFilter === cat
                    ? 'bg-panther-red text-white'
                    : 'bg-parchment/80 text-amber-900 border border-amber-900/20 hover:border-panther-red/40'
                }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Timeline */}
        {loading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-panther-red"></div>
          </div>
        ) : (
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-amber-900/20" />

            {filteredEvents.map((event, index) => (
              <TimelineCard key={event.id} event={event} index={index} />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

function TimelineCard({ event, index }: { event: TimelineEvent; index: number }) {
  const isEven = index % 2 === 0

  const categoryColors: Record<string, string> = {
    School: 'bg-panther-red/10 text-panther-red border-panther-red/30',
    Sports: 'bg-amber-900/10 text-amber-900 border-amber-900/30',
    Community: 'bg-green-900/10 text-green-900 border-green-900/30',
    Civic: 'bg-blue-900/10 text-blue-900 border-blue-900/30',
    National: 'bg-purple-900/10 text-purple-900 border-purple-900/30',
  }

  return (
    <div
      className={`relative flex items-center mb-8 md:mb-12 ${
        isEven ? 'md:flex-row' : 'md:flex-row-reverse'
      }`}
    >
      {/* Dot on timeline */}
      <div className="absolute left-4 md:left-1/2 w-3 h-3 rounded-full bg-panther-red 
                      border-2 border-parchment -translate-x-1.5 md:-translate-x-1.5 z-10" />

      {/* Content */}
      <div className={`ml-10 md:ml-0 md:w-5/12 ${isEven ? 'md:pr-8' : 'md:pl-8'}`}>
        <div
          className="bg-parchment/90 rounded-lg border border-amber-900/20 p-4 
                      hover:shadow-lg hover:border-panther-red/30 transition-all duration-300"
        >
          <div className="flex items-center gap-2 mb-2">
            <time className="text-sm font-medium text-panther-red">
              {new Date(event.event_date).toLocaleDateString('en-US', {
                month: 'long',
                day: 'numeric',
                year: 'numeric',
              })}
            </time>
            {event.category && (
              <span
                className={`px-2 py-0.5 text-xs rounded-full border ${
                  categoryColors[event.category] || 'bg-amber-900/10 text-amber-900'
                }`}
              >
                {event.category}
              </span>
            )}
          </div>
          <h3 className="font-bold text-amber-950 mb-1">{event.title}</h3>
          <p className="text-sm text-amber-800/70 leading-relaxed">{event.description}</p>
        </div>
      </div>
    </div>
  )
}
