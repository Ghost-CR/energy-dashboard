import React from 'react';
import { Mail, Phone, MapPin, Linkedin, Twitter, Facebook, Instagram, ArrowRight, X } from 'lucide-react';

const Footer = () => {
  const footerLinks = {
    product: [
      { label: 'Características', href: '#features' },
      { label: 'Dashboard', href: '#dashboard' },
    ],
    company: [
      { label: 'Sobre Nosotros', href: '#about' },
      { label: 'Premios', href: '#premios' },
    ],
  };

  const socialLinks = [
    { icon: Linkedin, href: 'https://linkedin.com/company/iotomato', label: 'LinkedIn' },
    { icon: X, href: 'https://x.com/iotomato1?lang=es', label: 'X' },
    { icon: Facebook, href: 'https://facebook.com/iotomato', label: 'Facebook' },
    { icon: Instagram, href: 'https://instagram.com/iotomato', label: 'Instagram' }
  ];

  const recognitions = [
    'Ganadores Innóvate Perú',
    'MIT Tech Review 2020',
    'Respaldados por CIDE PUCP'
  ];

  return (
    <footer className="bg-gray-900 text-gray-300">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 mb-12">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div 
                className="w-20 h-20 rounded-xl flex items-center justify-center"
              >
                <img 
                  src="https://www.iotomato.com/static/logoWhite-80887a111b4c9651ebc5e91128ab9a5d.svg" 
                  alt="iotomato logo" 
                  className="w-20 h-20" 
                />
              </div>
            </div>
            <p className="text-sm text-gray-400 mb-6 leading-relaxed">
              Monitoreo energético inteligente que reduce costos hasta 40% con tecnología de punta y análisis en tiempo real.
            </p>
          </div>

          {/* Product Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Producto</h4>
            <ul className="space-y-3">
              {footerLinks.product.map((link, idx) => (
                <li key={idx}>
                  <a 
                    href={link.href}
                    className="text-sm hover:text-white transition-colors flex items-center group"
                  >
                    <span>{link.label}</span>
                    <ArrowRight className="w-3 h-3 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Empresa</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link, idx) => (
                <li key={idx}>
                  <a 
                    href={link.href}
                    className="text-sm hover:text-white transition-colors flex items-center group"
                  >
                    <span>{link.label}</span>
                    <ArrowRight className="w-3 h-3 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="lg:col-span-2">
            <h4 className="text-white font-semibold mb-4">Contacto</h4>
            <div className="space-y-3">
              <a 
                href="mailto:contacto@iotomato.com" 
                className="flex items-center space-x-2 text-sm hover:text-white transition-colors"
              >
                <Mail className="w-4 h-4" />
                <span>contacto@iotomato.com</span>
              </a>
              <a 
                href="tel:+51999999999" 
                className="flex items-center space-x-2 text-sm hover:text-white transition-colors"
              >
                <Phone className="w-4 h-4" />
                <span>+51 999 999 999</span>
              </a>
              <div className="flex items-start space-x-2 text-sm">
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span>Lima, Perú</span>
              </div>
            </div>
          </div>
        </div>

        {/* Recognition Badges */}
        <div className="border-t border-gray-800 pt-8 mb-8">
          <div className="flex flex-wrap justify-center md:justify-start gap-6">
            {recognitions.map((recognition, idx) => (
              <div 
                key={idx}
                className="px-4 py-2 bg-gray-800 rounded-lg border border-gray-700 text-xs text-gray-400"
              >
                {recognition}
              </div>
            ))}
          </div>
        </div>

        {/* Social Links & Copyright */}
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          {/* Social Icons */}
          <div className="flex items-center space-x-4">
            {socialLinks.map((social, idx) => {
              const Icon = social.icon;
              return (
                <a
                  key={idx}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="w-10 h-10 rounded-lg bg-gray-800 flex items-center justify-center hover:bg-gray-700 transition-colors group"
                >
                  <Icon className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
                </a>
              );
            })}
          </div>

          {/* Copyright */}
          <div className="text-center md:text-right">
            <p className="text-sm text-gray-400">
              © {new Date().getFullYear()} iotomato. Todos los derechos reservados.
            </p>
          </div>
        </div>
      </div>

      {/* Trusted By Strip */}
      <div className="border-t border-gray-800 bg-gray-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-wrap items-center justify-center gap-8">
            <span className="text-xs text-gray-500">CONFIADO POR:</span>
            <div className="px-4 py-2 bg-gray-900 rounded border border-gray-800">
              <span className="text-sm font-bold text-white">REPSOL</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;