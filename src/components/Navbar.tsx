const navigation = [
  { name: 'Home', href: '/' },
  { name: 'Services', href: '/services' },
  { name: 'About', href: '/about' },
  { name: 'Testimonials', href: '/testimonials' },
  { name: 'Contact', href: '/contact' },
]; 

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-theme-bg-primary/80 backdrop-blur-lg border-b border-theme-border-primary/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo and Brand */}
          <a href="/" className="flex items-center space-x-2 sm:space-x-3">
            <img 
              src="/logo.png" 
              alt="TopEdge AI" 
              className="w-10 h-10 sm:w-12 sm:h-12" // Increased mobile size
            />
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