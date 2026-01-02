import React from 'react';
import { Clock, DollarSign, Shield, Zap, TrendingUp, Bell, BarChart3, CheckCircle, ArrowRight } from 'lucide-react';

const Benefits = () => {
  const mainBenefits = [
    {
      icon: DollarSign,
      title: 'Reduce costos hasta 40%',
      description: 'Identifica desperdicios energéticos y optimiza tu consumo para ahorrar miles de dólares al año.',
      stats: ['Ahorro promedio $15k/año', 'ROI en 6 meses', 'Sin inversión inicial']
    },
    {
      icon: Clock,
      title: 'Implementación en 48 horas',
      description: 'Instalación rápida sin interrumpir tus operaciones. Dashboard funcionando en menos de 2 días.',
      stats: ['Sin obras civiles', 'Plug & play', 'Soporte 24/7']
    },
    {
      icon: Shield,
      title: 'Toma decisiones con confianza',
      description: 'Datos precisos en tiempo real para decisiones estratégicas basadas en información real, no suposiciones.',
      stats: ['99.7% precisión', 'Actualización instantánea', 'Histórico completo']
    }
  ];

  const features = [
    {
      icon: Zap,
      title: 'Monitoreo en tiempo real',
      description: 'Visualiza tu consumo segundo a segundo desde cualquier dispositivo.'
    },
    {
      icon: Bell,
      title: 'Alertas automáticas',
      description: 'Recibe notificaciones instantáneas ante anomalías o picos de consumo.'
    },
    {
      icon: BarChart3,
      title: 'Reportes inteligentes',
      description: 'Análisis detallados y exportables para tomar decisiones informadas.'
    },
    {
      icon: TrendingUp,
      title: 'Análisis predictivo',
      description: 'Proyecciones de consumo y recomendaciones para optimizar eficiencia.'
    }
  ];

  const comparison = {
    traditional: [
      { text: 'Reportes manuales semanales', available: false },
      { text: 'Detección de anomalías en días', available: false },
      { text: 'Datos dispersos y sin contexto', available: false },
      { text: 'Decisiones reactivas', available: false },
      { text: 'Alto costo de implementación', available: false }
    ],
    iotomato: [
      { text: 'Dashboard en tiempo real 24/7', available: true },
      { text: 'Alertas instantáneas automáticas', available: true },
      { text: 'Datos centralizados e inteligentes', available: true },
      { text: 'Decisiones proactivas', available: true },
      { text: 'Implementación en 48 horas', available: true }
    ]
  };

  return (
    <section className="relative py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-2 bg-red-50 rounded-full px-4 py-2 mb-6">
            <TrendingUp className="w-4 h-4" style={{ color: '#DC0F1A' }} />
            <span className="text-sm font-semibold" style={{ color: '#DC0F1A' }}>
              Beneficios reales
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Por qué empresas líderes
            <span className="block" style={{ color: '#DC0F1A' }}>
              eligen iotomato
            </span>
          </h2>
          <p className="text-xl text-gray-600">
            No solo es tecnología avanzada, son resultados medibles que impactan tu bottom line.
          </p>
        </div>

        {/* Main Benefits */}
        <div className="grid md:grid-cols-3 gap-8 mb-20">
          {mainBenefits.map((benefit, idx) => {
            const Icon = benefit.icon;
            return (
              <div
                key={idx}
                className="bg-gray-50 rounded-2xl p-8 border-2 border-gray-200 hover:border-gray-300 transition-all duration-300 hover:shadow-xl"
              >
                <div 
                  className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6"
                  style={{ backgroundColor: '#DC0F1A' }}
                >
                  <Icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">
                  {benefit.title}
                </h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {benefit.description}
                </p>
                <ul className="space-y-2">
                  {benefit.stats.map((stat, sIdx) => (
                    <li key={sIdx} className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 flex-shrink-0" style={{ color: '#DC0F1A' }} />
                      <span className="text-sm text-gray-700 font-medium">{stat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        {/* Features Grid */}
        <div className="bg-gray-50 rounded-2xl p-8 md:p-12 mb-20">
          <h3 className="text-3xl font-bold text-gray-900 text-center mb-12">
            Todo lo que necesitas en una plataforma
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            {features.map((feature, idx) => {
              const Icon = feature.icon;
              return (
                <div
                  key={idx}
                  className="bg-white rounded-xl p-6 border-2 border-gray-200 flex items-start space-x-4 hover:border-gray-300 transition-all duration-300"
                >
                  <div 
                    className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: 'rgba(220, 15, 26, 0.1)' }}
                  >
                    <Icon className="w-6 h-6" style={{ color: '#DC0F1A' }} />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-gray-900 mb-2">
                      {feature.title}
                    </h4>
                    <p className="text-sm text-gray-600">
                      {feature.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Comparison Table */}
        <div className="mb-20">
          <h3 className="text-3xl font-bold text-gray-900 text-center mb-12">
            Gestión tradicional vs iotomato
          </h3>
          <div className="grid md:grid-cols-2 gap-8">
            {/* Traditional */}
            <div className="bg-white rounded-2xl border-2 border-gray-200 p-8">
              <div className="text-center mb-6">
                <h4 className="text-2xl font-bold text-gray-900 mb-2">
                  Gestión Tradicional
                </h4>
                <p className="text-sm text-gray-500">
                  Métodos antiguos y lentos
                </p>
              </div>
              <ul className="space-y-4">
                {comparison.traditional.map((item, idx) => (
                  <li key={idx} className="flex items-start space-x-3">
                    <div className="w-5 h-5 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                    </div>
                    <span className="text-gray-600 line-through">{item.text}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* iotomato */}
            <div 
              className="rounded-2xl p-8 relative overflow-hidden"
              style={{ 
                background: 'linear-gradient(135deg, rgba(220, 15, 26, 0.05) 0%, rgba(220, 15, 26, 0.1) 100%)',
                border: '2px solid #DC0F1A'
              }}
            >
              <div className="absolute top-4 right-4">
                <div 
                  className="px-3 py-1 rounded-full text-xs font-bold text-white"
                  style={{ backgroundColor: '#DC0F1A' }}
                >
                  Recomendado
                </div>
              </div>
              <div className="text-center mb-6">
                <h4 className="text-2xl font-bold text-gray-900 mb-2">
                  Con iotomato
                </h4>
                <p className="text-sm" style={{ color: '#DC0F1A' }}>
                  Tecnología del futuro, hoy
                </p>
              </div>
              <ul className="space-y-4">
                {comparison.iotomato.map((item, idx) => (
                  <li key={idx} className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: '#DC0F1A' }} />
                    <span className="text-gray-900 font-medium">{item.text}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Final CTA */}
        <div 
          className="rounded-2xl p-12 text-center relative overflow-hidden"
          style={{ background: 'linear-gradient(135deg, #DC0F1A 0%, #B00D16 100%)' }}
        >
          <div className="relative z-10">
            <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Empieza a ahorrar hoy
            </h3>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Únete a las +500 empresas que ya están optimizando su consumo energético con iotomato.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                className="px-8 py-4 bg-white text-gray-900 rounded-xl font-semibold text-lg shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 flex items-center justify-center space-x-2"
              >
                <span>Solicitar Servicio</span>
                <ArrowRight className="w-5 h-5" />
              </button>
              <button 
                className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white rounded-xl font-semibold text-lg border-2 border-white/30 hover:bg-white/20 transition-all duration-300 flex items-center justify-center space-x-2"
              >
                <span>Agendar Demo</span>
              </button>
            </div>
            <p className="text-sm text-white/70 mt-6">
              Sin tarjeta de crédito • Implementación en 48 horas • Soporte 24/7
            </p>
          </div>

          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full blur-3xl"></div>
        </div>
      </div>
    </section>
  );
};

export default Benefits;