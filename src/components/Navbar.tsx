const navigation = [
  { name: 'Home', href: '/' },
  { name: 'Services', href: '/services' },
  { name: 'About', href: '/about' },
  { name: 'Testimonials', href: '/testimonials' },
  { name: 'Contact', href: '/contact' },
  { name: 'Pricing', href: '/pricing' },
  
]; 

const Navbar = () => {
  return (
    <nav className="fixed top-4 left-1/2 -translate-x-1/2 z-50 bg-theme-bg-primary/80 backdrop-blur-lg border border-theme-border-primary/10 rounded-full shadow-lg px-4 py-2 w-auto max-w-[95vw] flex items-center transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo and Brand */}
          <a href="/" className="flex items-center space-x-2 sm:space-x-3">
            {/* Logo from public directory with fallback alt and style */}
            <picture>
              <source srcSet="/logo.webp" type="image/webp" />
              <img 
                src="/logo.png" 
                alt="TopEdge AI Logo" 
                className="w-10 h-10 sm:w-12 sm:h-12 flex-shrink-0" 
                style={{ minWidth: 40, minHeight: 40, objectFit: 'contain' }} 
                onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => { e.currentTarget.src = '/favicon.ico'; }}
              />
            </picture>
            <span className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-theme-text-accent to-primary-dark bg-clip-text text-transparent">
              TopEdge AI
            </span>
          </a>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-theme-text-secondary hover:text-theme-text-accent transition-colors duration-200"
              >
                {item.name}
              </a>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden p-2 rounded-lg hover:bg-theme-bg-secondary/20 transition-colors duration-200">
            <svg className="w-6 h-6 text-theme-text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
    </nav>
  );
}; 

export default Navbar; 