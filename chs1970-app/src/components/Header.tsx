import Link from 'next/link'

export default function Header() {
  return (
    <header className="sticky top-0 z-40 bg-parchment/95 backdrop-blur-sm border-b border-amber-900/20">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-panther-red flex items-center justify-center">
            <span className="text-white font-bold text-lg">70</span>
          </div>
          <div>
            <h1 className="text-lg font-bold text-amber-950 leading-tight vintage-heading">
              Creston CCHS
            </h1>
            <p className="text-xs text-amber-800/60">Class of 1970</p>
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          <Link href="#directory" className="text-sm text-amber-900 hover:text-panther-red transition-colors">
            Directory
          </Link>
          <Link href="#yearbook" className="text-sm text-amber-900 hover:text-panther-red transition-colors">
            Yearbook
          </Link>
          <Link href="#timeline" className="text-sm text-amber-900 hover:text-panther-red transition-colors">
            Timeline
          </Link>
          <Link href="#resources" className="text-sm text-amber-900 hover:text-panther-red transition-colors">
            Resources
          </Link>
        </nav>

        {/* Mobile menu button */}
        <button className="md:hidden p-2 text-amber-900 hover:text-panther-red transition-colors">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
    </header>
  )
}
