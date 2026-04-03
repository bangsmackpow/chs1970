import Header from '@/components/Header'
import ClassDirectory from '@/components/ClassDirectory'
import DigitalYearbook from '@/components/DigitalYearbook'
import Timeline1970 from '@/components/Timeline1970'
import ResourcesFooter from '@/components/ResourcesFooter'

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative py-20 px-4 text-center overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-panther-red/5 via-transparent to-transparent" />
          <div className="relative max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-panther-red/10 text-panther-red text-sm font-medium mb-6">
              <span>🐾</span>
              <span>Go Panthers!</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-4 vintage-heading text-amber-ink">
              Creston Community High School
            </h1>
            <h2 className="text-3xl md:text-5xl font-bold mb-6 vintage-heading text-panther-red">
              Class of 1970
            </h2>
            <p className="text-lg text-amber-800/70 max-w-xl mx-auto leading-relaxed">
              A Digital Time Capsule — Preserving the memories, stories, and spirit 
              of the Panthers who graduated over five decades ago.
            </p>
          </div>
        </section>

        {/* Class Directory */}
        <div id="directory" className="border-t border-amber-900/10">
          <ClassDirectory />
        </div>

        {/* Digital Yearbook */}
        <div id="yearbook" className="border-t border-amber-900/10 bg-parchment-dark/30">
          <DigitalYearbook />
        </div>

        {/* 1970 Timeline */}
        <div id="timeline" className="border-t border-amber-900/10">
          <Timeline1970 />
        </div>
      </main>

      <div id="resources">
        <ResourcesFooter />
      </div>
    </>
  )
}
