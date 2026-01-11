import React, { useState, useEffect } from 'react';
import { Zap, TrendingDown, Eye, ArrowRight, CheckCircle, Play } from 'lucide-react';

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeMetric, setActiveMetric] = useState(0);

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setActiveMetric((prev) => (prev + 1) % 3);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const metrics = [
    { value: '40%', label: 'Reducción de costos energéticos', icon: TrendingDown },
    { value: '24/7', label: 'Monitoreo en tiempo real', icon: Eye },
    { value: '<5min', label: 'Detección de anomalías', icon: Zap }
  ];

  const benefits = [
    'Monitoreo en tiempo real',
    'Dashboard intuitivo',
    'Alertas automáticas'
  ];

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 overflow-hidden">
      {/* Background animated elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute w-96 h-96 bg-red-500/10 rounded-full blur-3xl -top-48 -left-48 animate-pulse"></div>
        <div className="absolute w-96 h-96 bg-gray-300/30 rounded-full blur-3xl -bottom-48 -right-48 animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.02)_1px,transparent_1px)] bg-[size:64px_64px]"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
          {/* Left Column - Content */}
          <div className={`space-y-8 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>

            {/* Headline */}
            <div>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 leading-tight mb-6">
                Controla tu
                <span className="block" style={{ color: '#DC0F1A' }}>
                  energía en
                </span>
                <span className="block text-gray-900">
                  tiempo real
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-600 leading-relaxed">
                Reduce costos hasta <span className="font-bold" style={{ color: '#DC0F1A' }}>40%</span> con visibilidad total, 
                alertas inteligentes y optimización automática de tu consumo energético.
              </p>
            </div>

            {/* Benefits list */}
            <div className="space-y-3">
              {benefits.map((benefit, idx) => (
                <div 
                  key={idx}
                  className="flex items-center space-x-3 text-gray-700"
                  style={{ 
                    animation: `fadeInUp 0.6s ease-out ${0.2 + idx * 0.1}s both` 
                  }}
                >
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-green-100 flex items-center justify-center">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                  </div>
                  <span className="text-lg font-medium">{benefit}</span>
                </div>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button 
                className="group relative px-8 py-4 text-white rounded-xl font-semibold text-lg shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 flex items-center justify-center space-x-2"
                style={{ 
                  backgroundColor: '#DC0F1A',
                  boxShadow: '0 10px 40px rgba(220, 15, 26, 0.3)'
                }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#B00D16'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#DC0F1A'}
              >
                <span>Solicitar Servicio</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              
              <button className="group px-8 py-4 bg-white text-gray-900 rounded-xl font-semibold text-lg border-2 border-gray-300 hover:border-gray-400 hover:bg-gray-50 transition-all duration-300 flex items-center justify-center space-x-2 shadow-md">
                <Play className="w-5 h-5" />
                <span>Ver Demo</span>
              </button>
            </div>
          </div>

          {/* Right Column - Dashboard Preview */}
          <div className={`relative transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
            {/* Floating metrics cards */}
            <div className="relative">
              {/* Main dashboard mockup */}
              <div className="relative bg-white rounded-2xl border-2 border-gray-200 p-6 shadow-2xl">
                {/* Dashboard header */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#DC0F1A' }}></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
                    <span className="text-xs text-gray-600 font-medium">En vivo</span>
                  </div>
                </div>

                {/* Animated metrics */}
                <div className="space-y-4">
                  {metrics.map((metric, idx) => {
                    const Icon = metric.icon;
                    const isActive = activeMetric === idx;
                    
                    return (
                      <div 
                        key={idx}
                        className={`p-4 rounded-xl transition-all duration-500 ${
                          isActive 
                            ? 'border-2 scale-105 shadow-lg' 
                            : 'bg-gray-50 border border-gray-200'
                        }`}
                        style={isActive ? {
                          backgroundColor: 'rgba(220, 15, 26, 0.05)',
                          borderColor: '#DC0F1A'
                        } : {}}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <div 
                              className="p-2 rounded-lg"
                              style={isActive ? {
                                backgroundColor: 'rgba(220, 15, 26, 0.1)'
                              } : {
                                backgroundColor: '#f3f4f6'
                              }}
                            >
                              <Icon 
                                className="w-5 h-5"
                                style={isActive ? { color: '#DC0F1A' } : { color: '#6b7280' }}
                              />
                            </div>
                            <div>
                              <p className={`text-2xl font-bold ${isActive ? 'text-gray-900' : 'text-gray-700'}`}>
                                {metric.value}
                              </p>
                              <p className="text-xs text-gray-500">{metric.label}</p>
                            </div>
                          </div>
                          {isActive && (
                            <div className="flex items-center space-x-1">
                              <TrendingDown className="w-4 h-4 text-green-500" />
                              <span className="text-sm text-green-600 font-semibold">-12%</span>
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Mini chart animation */}
                <div className="mt-6 h-24 bg-gray-50 rounded-lg p-3 border border-gray-200">
                  <div className="flex items-end justify-between h-full space-x-1">
                    {Array.from({ length: 12 }).map((_, idx) => {
                      const height = 20 + Math.random() * 60;
                      return (
                        <div 
                          key={idx}
                          className="flex-1 rounded-t transition-all duration-500"
                          style={{ 
                            height: `${height}%`,
                            background: `linear-gradient(to top, #DC0F1A, rgba(220, 15, 26, 0.5))`,
                            animation: `grow 1s ease-out ${idx * 0.1}s both`
                          }}
                        ></div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Floating badge - Alert */}
              <div 
                className="absolute -top-6 -right-6 text-white px-4 py-2 rounded-full shadow-lg animate-bounce flex items-center space-x-2"
                style={{ backgroundColor: '#DC0F1A' }}
              >
                <Zap className="w-4 h-4" />
                <span className="text-sm font-semibold">Alerta detectada</span>
              </div>

              {/* Floating badge - Savings */}
              <div className="absolute -bottom-6 -left-6 bg-green-500 text-white px-6 py-3 rounded-xl shadow-lg flex items-center space-x-2">
                <TrendingDown className="w-5 h-5" />
                <div>
                  <p className="text-xs opacity-90">Ahorro este mes</p>
                  <p className="text-xl font-bold">$2,450</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Animated CSS */}
      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes grow {
          from {
            height: 0%;
          }
        }
      `}</style>
    </section>
  );
};

export default Hero;