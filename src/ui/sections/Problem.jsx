import React from 'react';
import { TrendingUp, AlertCircle, Clock } from 'lucide-react';

const Problem = () => {
  const problems = [
    {
      icon: TrendingUp,
      stat: '30-40%',
      title: 'Sobrecostos energéticos',
      description: 'Las empresas pierden miles de dólares al año por ineficiencias que no detectan a tiempo.'
    },
    {
      icon: AlertCircle,
      stat: '70%',
      title: 'Sin visibilidad real',
      description: 'La mayoría de empresas no saben dónde, cuándo ni por qué se desperdicia su energía.'
    },
    {
      icon: Clock,
      stat: '48hrs',
      title: 'Respuesta lenta',
      description: 'Las anomalías se descubren días después, cuando ya generaron pérdidas significativas.'
    }
  ];

  return (
    <section className="relative py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            ¿Tu factura eléctrica sube
            <span className="block" style={{ color: '#DC0F1A' }}>
              sin control?
            </span>
          </h2>
          <p className="text-xl text-gray-600">
            No estás solo. La gestión energética tradicional tiene puntos ciegos críticos.
          </p>
        </div>

        {/* Problems Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {problems.map((problem, idx) => {
            const Icon = problem.icon;
            return (
              <div
                key={idx}
                className="bg-white rounded-xl p-8 border-2 border-gray-200 hover:border-gray-300 transition-all duration-300 hover:shadow-xl"
              >
                {/* Icon & Stat */}
                <div className="flex items-center justify-between mb-6">
                  <div 
                    className="w-12 h-12 rounded-xl flex items-center justify-center"
                    style={{ backgroundColor: 'rgba(220, 15, 26, 0.1)' }}
                  >
                    <Icon className="w-6 h-6" style={{ color: '#DC0F1A' }} />
                  </div>
                  <span 
                    className="text-3xl font-bold"
                    style={{ color: '#DC0F1A' }}
                  >
                    {problem.stat}
                  </span>
                </div>

                {/* Content */}
                <h3 className="text-2xl font-bold text-gray-900 mb-3">
                  {problem.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {problem.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <div className="inline-block bg-white rounded-2xl border-2 border-gray-200 px-8 py-6 shadow-lg">
            <p className="text-lg text-gray-700 mb-4">
              <span className="font-bold text-gray-900">El resultado:</span> decisiones lentas, costos elevados y oportunidades de ahorro perdidas.
            </p>
            <p className="text-gray-600">
              Pero hay una manera mejor de gestionar tu energía →
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Problem;