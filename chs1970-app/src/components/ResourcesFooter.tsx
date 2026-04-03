import Link from 'next/link'

const RESOURCES = [
  {
    title: 'Archive.org — Secondary School Directories',
    description: 'Historical school directories and yearbooks, including Creston CCHS 1970/71 records.',
    url: 'https://archive.org/details/secondaryschooldirectory',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    ),
  },
  {
    title: 'Creston News Advertiser — Historical Archives',
    description: 'Digitized archives of the Creston News Advertiser, covering local news from 1970 and beyond.',
    url: 'https://www.crestonnews.com/archives',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
      </svg>
    ),
  },
  {
    title: 'Gibson Memorial Library — Microfilm Records',
    description: 'Local microfilm records and historical documents available at the Gibson Memorial Library in Creston.',
    url: 'https://www.gibsonmemoriallibrary.org',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" />
      </svg>
    ),
  },
  {
    title: 'State Historical Society of Iowa',
    description: 'Access to the "Chronicling America" collection for 1970 Iowa historical newspapers.',
    url: 'https://iowaculture.gov/history',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
]

export default function ResourcesFooter() {
  return (
    <footer className="bg-amber-950/90 border-t border-amber-900/30 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <h3 className="text-2xl font-bold text-center mb-2 text-parchment vintage-heading">
          Resources & Archives
        </h3>
        <p className="text-center text-amber-300/60 mb-8 text-sm italic">
          Explore these external archives to discover more about Creston in 1970
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {RESOURCES.map((resource) => (
            <a
              key={resource.title}
              href={resource.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col p-4 rounded-lg bg-parchment/10 border border-amber-800/30 
                         hover:bg-parchment/15 hover:border-panther-red/40 transition-all duration-300"
            >
              <div className="flex items-center gap-2 mb-2 text-panther-red/80 group-hover:text-panther-red transition-colors">
                {resource.icon}
                <span className="text-xs uppercase tracking-wider font-medium">External Link</span>
              </div>
              <h4 className="font-semibold text-parchment text-sm mb-1 group-hover:text-panther-red/90 transition-colors">
                {resource.title}
              </h4>
              <p className="text-xs text-amber-300/50 leading-relaxed">
                {resource.description}
              </p>
            </a>
          ))}
        </div>

        <div className="border-t border-amber-800/30 pt-6 text-center">
          <p className="text-sm text-amber-300/40">
            Creston Community High School — Class of 1970 Digital Time Capsule
          </p>
          <p className="text-xs text-amber-300/30 mt-1">
            Go Panthers! 🐾
          </p>
        </div>
      </div>
    </footer>
  )
}
