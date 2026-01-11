import React, { useState } from 'react';
import { Eye, Bell, BarChart3, Zap, CheckCircle } from 'lucide-react';

const Solution = () => {
  const [activeFeature, setActiveFeature] = useState(0);

  const features = [
    {
      icon: Eye,
      title: 'Monitoreo en Tiempo Real',
      description: 'Visualiza tu consumo energético al instante con datos precisos y actualizados cada segundo.',
      benefits: [
        'Dashboard intuitivo 24/7',
        'Métricas clave en un vistazo',
        'Histórico completo de consumo'
      ],
      color: '#DC0F1A'
    },
    {
      icon: Bell,
      title: 'Alertas Automáticas',
      description: 'Detecta anomalías y picos de consumo antes de que se conviertan en sobrecostos.',
      benefits: [
        'Notificaciones instantáneas',
        'Análisis de patrones anormales',
        'Prevención de pérdidas'
      ],
      color: '#DC0F1A'
    },
    {
      icon: BarChart3,
      title: 'Reportes de datos',
      description: 'Exporta los reportes de tus datos a PDF y Excel.',
      benefits: [
        'Análisis predictivo',
        'Oportunidades de ahorro',
        'ROI medible'
      ],
      color: '#DC0F1A'
    }
  ];

  return (
    <section className="relative py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-2 bg-red-50 rounded-full px-4 py-2 mb-6">
            <Zap className="w-4 h-4" style={{ color: '#DC0F1A' }} />
            <span className="text-sm font-semibold" style={{ color: '#DC0F1A' }}>
              La solución
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Monitoreo energético
            <span className="block" style={{ color: '#DC0F1A' }}>
              inteligente y automatizado
            </span>
          </h2>
          <p className="text-xl text-gray-600">
            iotomato te da control total de tu energía con tecnología de punta y análisis en tiempo real.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          {features.map((feature, idx) => {
            const Icon = feature.icon;
            const isActive = activeFeature === idx;
            
            return (
              <div
                key={idx}
                onMouseEnter={() => setActiveFeature(idx)}
                className={`relative bg-white rounded-2xl p-8 border-2 transition-all duration-300 cursor-pointer ${
                  isActive 
                    ? 'shadow-2xl scale-105' 
                    : 'border-gray-200 hover:border-gray-300 shadow-lg'
                }`}
                style={isActive ? { borderColor: '#DC0F1A' } : {}}
              >
                {/* Icon */}
                <div 
                  className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6 transition-all duration-300"
                  style={isActive ? {
                    backgroundColor: '#DC0F1A'
                  } : {
                    backgroundColor: 'rgba(220, 15, 26, 0.1)'
                  }}
                >
                  <Icon 
                    className="w-8 h-8 transition-all duration-300" 
                    style={{ color: isActive ? '#ffffff' : '#DC0F1A' }}
                  />
                </div>

                {/* Content */}
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  {feature.title}
                </h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {feature.description}
                </p>

                {/* Benefits list */}
                <ul className="space-y-3">
                  {feature.benefits.map((benefit, bIdx) => (
                    <li key={bIdx} className="flex items-start space-x-2">
                      <CheckCircle 
                        className="w-5 h-5 flex-shrink-0 mt-0.5" 
                        style={{ color: '#DC0F1A' }}
                      />
                      <span className="text-sm text-gray-700">{benefit}</span>
                    </li>
                  ))}
                </ul>

                {/* Active indicator */}
                {isActive && (
                  <div 
                    className="absolute -top-2 -right-2 w-6 h-6 rounded-full flex items-center justify-center animate-pulse"
                    style={{ backgroundColor: '#DC0F1A' }}
                  >
                    <Zap className="w-4 h-4 text-white" />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* How it works */}
        <div className="bg-gray-50 rounded-2xl p-12 border-2 border-gray-200">
          <h3 className="text-3xl font-bold text-gray-900 text-center mb-12">
            ¿Cómo funciona?
          </h3>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: '1',
                title: 'Envío de parámetros a la nube',
                description: 'Instalamos sensores iotomato para monitorear los parámetros eléctricos. Después, estos sensores envían la data a la nube 24/7.'
              },
              {
                step: '2',
                title: 'Transformación de datos',
                description: 'Nuestra plataforma los procesa, los analiza y los transforma en indicadores fáciles de entender.'
              },
              {
                step: '3',
                title: 'Manejo de información',
                description: 'La información generada es presentada mediante reportes, alertas, dashboards, mensajes de correo, sms y mucho más. Esto permte anticipar fallas y optimizar el consumo energético.'
              }
            ].map((item, idx) => (
              <div key={idx} className="text-center">
                <div 
                  className="w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold text-white mx-auto mb-4"
                  style={{ backgroundColor: '#DC0F1A' }}
                >
                  {item.step}
                </div>
                <h4 className="text-xl font-bold text-gray-900 mb-3">
                  {item.title}
                </h4>
                <p className="text-gray-600">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Solution;