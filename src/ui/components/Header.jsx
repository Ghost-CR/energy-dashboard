import { Link, useNavigate, useLocation } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowRight, ChevronDown } from 'lucide-react';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Dashboard', href: '#dashboard', isExternal: false },
    { label: 'Reconocimientos', href: '#SocialProof', isExternal: false },
    { label: 'Nosotros', href: '/nosotros', isExternal: true }
  ];

  const handleLinkClick = (href) => {
    setIsMobileMenuOpen(false);
    setActiveDropdown(null);
    // Scroll suave
    if (location.pathname !== '/') {
      navigate('/');
      // Esperamos un poco a que cargue la home para scrollear
      setTimeout(() => {
        const element = document.querySelector(href);
        if (element) element.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const element = document.querySelector(href);
      if (element) element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white shadow-lg py-3' 
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a 
            href="#home" 
            className="flex items-center space-x-2 group"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          >
            <div 
              className="w-15 h-15 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110"
            >
              <img 
                src="https://www.iotomato.com/static/logoWhite-80887a111b4c9651ebc5e91128ab9a5d.svg" 
                alt="iotomato logo" 
                className="w-15 h-15" 
              />
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navLinks.map((link, idx) => {
              // Verificamos si es el enlace a la página nueva
              const isExternal = link.href.startsWith('/');

              return (
                <div 
                  key={idx}
                  className="relative"
                  onMouseEnter={() => link.dropdown && setActiveDropdown(idx)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  {isExternal ? (
                    /* USAMOS LINK PARA NAVEGAR A /NOSOTROS */
                    <Link
                      to={link.href}
                      className={`flex items-center space-x-1 font-medium transition-colors ${
                        isScrolled 
                          ? 'text-gray-700 hover:text-gray-900' 
                          : 'text-white/90 hover:text-white'
                      }`}
                    >
                      <span>{link.label}</span>
                    </Link>
                  ) : (
                    /* USAMOS UN BOTÓN (O <a> CON PREVENT) PARA EL SCROLL SUAVE */
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        if (!link.dropdown) handleLinkClick(link.href);
                      }}
                      className={`flex items-center space-x-1 font-medium transition-colors ${
                        isScrolled 
                          ? 'text-gray-700 hover:text-gray-900' 
                          : 'text-white/90 hover:text-white'
                      }`}
                    >
                      <span>{link.label}</span>
                      {link.dropdown && (
                        <ChevronDown className={`w-4 h-4 transition-transform ${activeDropdown === idx ? 'rotate-180' : ''}`} />
                      )}
                    </button>
                  )}

                  {/* Dropdown Menu (se mantiene igual) */}
                  {link.dropdown && activeDropdown === idx && (
                    <div className="absolute top-full left-0 mt-2 w-56 bg-white rounded-xl shadow-2xl border-2 border-gray-100 py-2">
                      {link.dropdown.map((item, dropIdx) => (
                        <button
                          key={dropIdx}
                          onClick={() => handleLinkClick(item.href)}
                          className="w-full text-left block px-4 py-3 text-gray-700 hover:bg-gray-50 transition-colors"
                        >
                          {item.label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </nav>

          {/* CTA Buttons */}
          <div className="hidden lg:flex items-center space-x-4">
            <button
              onClick={() => handleLinkClick('#form')}
              className="flex items-center space-x-2 px-6 py-3 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              style={{ backgroundColor: '#DC0F1A' }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#B00D16'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#DC0F1A'}
            >
              <span>Solicitar Demo</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg transition-colors"
            style={{ 
              backgroundColor: isMobileMenuOpen ? 'rgba(220, 15, 26, 0.1)' : 'transparent',
              color: isScrolled ? '#1f2937' : '#ffffff'
            }}
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden mt-4 pb-4 border-t border-gray-200">
            <nav className="space-y-2 pt-4">
              {navLinks.map((link, idx) => (
                <div key={idx}>
                  <a
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      if (link.dropdown) {
                        setActiveDropdown(activeDropdown === idx ? null : idx);
                      } else {
                        handleLinkClick(link.href);
                      }
                    }}
                    className={`flex items-center justify-between px-4 py-3 rounded-lg font-medium transition-colors ${
                      isScrolled
                        ? 'text-gray-700 hover:bg-gray-100'
                        : 'text-gray-900 hover:bg-white/10'
                    }`}
                    style={!isScrolled ? { color: '#1f2937' } : {}}
                  >
                    <span>{link.label}</span>
                    {link.dropdown && (
                      <ChevronDown className={`w-4 h-4 transition-transform ${activeDropdown === idx ? 'rotate-180' : ''}`} />
                    )}
                  </a>

                  {/* Mobile Dropdown */}
                  {link.dropdown && activeDropdown === idx && (
                    <div className="ml-4 mt-2 space-y-2">
                      {link.dropdown.map((item, dropIdx) => (
                        <a
                          key={dropIdx}
                          href={item.href}
                          onClick={(e) => {
                            e.preventDefault();
                            handleLinkClick(item.href);
                          }}
                          className="block px-4 py-2 text-sm text-gray-600 hover:text-gray-900 transition-colors"
                        >
                          {item.label}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              ))}

              {/* Mobile CTA Buttons */}
              <div className="space-y-2 pt-4 border-t border-gray-200">
                <button
                  onClick={() => handleLinkClick('#cta')}
                  className="w-full flex items-center justify-center space-x-2 px-4 py-3 text-white rounded-lg font-semibold shadow-lg"
                  style={{ backgroundColor: '#DC0F1A' }}
                >
                  <span>Solicitar Demo</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </nav>
          </div>
        )}
      </div>

      {/* Backdrop for mobile menu */}
      {isMobileMenuOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black/20 backdrop-blur-sm -z-10"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </header>
  );
};

export default Header;