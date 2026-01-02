import React from 'react';
import { Award, Building2, TrendingUp, TrendingDown, CheckCircle, Star } from 'lucide-react';

const SocialProof = () => {
  const stats = [
    { value: '+500', label: 'Empresas activas', icon: Building2 },
    { value: '40%', label: 'Reducción de costos', icon: TrendingDown },
    { value: '99.7%', label: 'Precisión en alertas', icon: CheckCircle },
    { value: '48hrs', label: 'Implementación', icon: TrendingUp }
  ];

  const achievements = [
    {
      icon: Award,
      title: 'Ganadores Innóvate Perú',
      subtitle: 'Fondo Startup-7G',
      description: 'Reconocidos por el gobierno peruano como una de las startups más innovadoras del país.',
      year: '2023'
    },
    {
      icon: Star,
      title: 'MIT Technology Review',
      subtitle: 'Innovadores menores de 35',
      description: 'Reconocimiento internacional por nuestro impacto tecnológico en Latinoamérica.',
      year: '2020'
    },
    {
      icon: Building2,
      title: 'Respaldados por CIDE PUCP',
      subtitle: 'Incubadora de negocios',
      description: 'Parte del ecosistema de innovación de la Pontificia Universidad Católica del Perú.',
      year: '2019'
    }
  ];

  return (
    <section className="relative py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Nuestros
            <span style={{ color: '#DC0F1A' }}> clientes </span>
          </h2>
          <p className="text-xl text-gray-600">
            Desde startups hasta corporaciones multinacionales, empresas líderes confían en iotomato.
          </p>
        </div>

        {/* Featured Client - Repsol */}
        <div className="bg-white rounded-2xl border-2 border-gray-200 p-8 md:p-12 mb-16 shadow-lg">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <div className="inline-flex items-center space-x-2 bg-red-50 rounded-full px-4 py-2 mb-6">
                <Building2 className="w-4 h-4" style={{ color: '#DC0F1A' }} />
                <span className="text-sm font-semibold" style={{ color: '#DC0F1A' }}>
                  Cliente destacado
                </span>
              </div>
              <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Repsol confía en iotomato
              </h3>
              <p className="text-lg text-gray-600 mb-6">
                Una de las principales empresas energéticas multinacionales utiliza nuestra plataforma para optimizar su consumo energético y reducir costos operativos.
              </p>
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span className="text-sm text-gray-700 font-medium">Monitoreo 24/7</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span className="text-sm text-gray-700 font-medium">Múltiples instalaciones</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span className="text-sm text-gray-700 font-medium">Alertas en tiempo real</span>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <div className="bg-white rounded-2xl border-2 border-gray-200 p-12 shadow-xl">
                <div className="text-6xl font-bold text-gray-900 text-center">
                  REPSOL
                </div>
                <p className="text-center text-sm text-gray-500 mt-4">
                  Energía global • Multinacional
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Awards & Recognition */}
        <div className="mb-12">
          <h3 className="text-3xl font-bold text-gray-900 text-center mb-12">
            Premios y Reconocimientos
          </h3>
          <div className="grid md:grid-cols-3 gap-8">
            {achievements.map((achievement, idx) => {
              const Icon = achievement.icon;
              return (
                <div
                  key={idx}
                  className="bg-white rounded-2xl border-2 border-gray-200 p-8 hover:border-gray-300 transition-all duration-300 hover:shadow-xl relative overflow-hidden"
                >
                  {/* Year badge */}
                  <div 
                    className="absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-bold text-white"
                    style={{ backgroundColor: '#DC0F1A' }}
                  >
                    {achievement.year}
                  </div>

                  {/* Icon */}
                  <div 
                    className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6"
                    style={{ backgroundColor: 'rgba(220, 15, 26, 0.1)' }}
                  >
                    <Icon className="w-8 h-8" style={{ color: '#DC0F1A' }} />
                  </div>

                  {/* Content */}
                  <h4 className="text-xl font-bold text-gray-900 mb-2">
                    {achievement.title}
                  </h4>
                  <p 
                    className="text-sm font-semibold mb-3"
                    style={{ color: '#DC0F1A' }}
                  >
                    {achievement.subtitle}
                  </p>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {achievement.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="bg-white rounded-2xl border-2 border-gray-200 p-8 text-center">
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: 'rgba(220, 15, 26, 0.1)' }}>
                <CheckCircle className="w-6 h-6" style={{ color: '#DC0F1A' }} />
              </div>
              <div className="text-left">
                <p className="text-sm text-gray-500">Certificado por</p>
                <p className="font-bold text-gray-900">Innóvate Perú</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: 'rgba(220, 15, 26, 0.1)' }}>
                <Building2 className="w-6 h-6" style={{ color: '#DC0F1A' }} />
              </div>
              <div className="text-left">
                <p className="text-sm text-gray-500">Incubado en</p>
                <p className="font-bold text-gray-900">CIDE PUCP</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: 'rgba(220, 15, 26, 0.1)' }}>
                <Star className="w-6 h-6" style={{ color: '#DC0F1A' }} />
              </div>
              <div className="text-left">
                <p className="text-sm text-gray-500">Reconocido por</p>
                <p className="font-bold text-gray-900">MIT Tech Review</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <p className="text-lg text-gray-600 mb-6">
            Únete a las empresas que ya están optimizando su energía
          </p>
          <button 
            className="px-8 py-4 text-white rounded-xl font-semibold text-lg shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
            style={{ 
              backgroundColor: '#DC0F1A',
              boxShadow: '0 10px 40px rgba(220, 15, 26, 0.3)'
            }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#B00D16'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#DC0F1A'}
          >
            Solicitar Servicio
          </button>
        </div>
      </div>
    </section>
  );
};

export default SocialProof;