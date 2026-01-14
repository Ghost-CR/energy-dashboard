import React, { useState } from 'react';
import { Monitor, Bell, FileText, Maximize2, ArrowRight } from 'lucide-react';
import EnergyDashboard from '../Dashboard';
import { useMemo } from 'react';
import { DashboardService } from '../../domain/services/DashboardService';

const DashboardSection = () => {
  const [activeTab, setActiveTab] = useState('live');
  const [isFullscreen, setIsFullscreen] = useState(false);

  const profile = "industrial";

  const dashboardData = useMemo(() => {
    return DashboardService.getDemoDashboard(profile);
  }, [profile]);

  const kpis = useMemo(() => {
    const defaultKpis = {
      powerFactorStatus: "Óptimo",
      energyEfficiency: 92,
      monthlyConsumption: 12450,
      totalConsumption: 12450,
      anomaliesDetected: 1,
      avgPowerFactor: 0.98,
      estimatedCost: 2450.00,
      alerts: []
    };
    return { ...defaultKpis, ...(dashboardData?.kpis || {}) };
  }, [dashboardData]);
  const tabs = [

    {
      id: 'live',
      label: 'Monitoreo en Vivo',
      icon: Monitor,
      description: 'Dashboard en tiempo real con todas tus métricas'
    },
    {
      id: 'alerts',
      label: 'Sistema de Alertas',
      icon: Bell,
      description: 'Detección automática de anomalías'
    },
    {
      id: 'reports',
      label: 'Reportes',
      icon: FileText,
      description: 'Análisis y exportación de datos'
    }
  ];

  return (
    <section id="dashboard" className="relative py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Mira cómo funciona
            <span className="block" style={{ color: '#DC0F1A' }}>
              en tiempo real
            </span>
          </h2>
          <p className="text-xl text-gray-600">
            Explora nuestro dashboard interactivo y descubre el poder del monitoreo energético inteligente.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-3 px-6 py-4 rounded-xl border-2 transition-all duration-300 ${
                  isActive
                    ? 'shadow-lg scale-105'
                    : 'bg-white border-gray-200 hover:border-gray-300 hover:shadow-md'
                }`}
                style={isActive ? {
                  backgroundColor: 'rgba(220, 15, 26, 0.05)',
                  borderColor: '#DC0F1A'
                } : {}}
              >
                <div 
                  className="p-2 rounded-lg"
                  style={isActive ? {
                    backgroundColor: '#DC0F1A'
                  } : {
                    backgroundColor: '#f3f4f6'
                  }}
                >
                  <Icon 
                    className="w-5 h-5"
                    style={{ color: isActive ? '#ffffff' : '#6b7280' }}
                  />
                </div>
                <div className="text-left">
                  <p className={`font-semibold ${isActive ? 'text-gray-900' : 'text-gray-700'}`}>
                    {tab.label}
                  </p>
                  <p className="text-xs text-gray-500 hidden sm:block">
                    {tab.description}
                  </p>
                </div>
              </button>
            );
          })}
        </div>

        {/* Dashboard Container */}
        <div className="relative">
          {/* Browser Chrome */}
          <div className="bg-white rounded-t-2xl border-2 border-b-0 border-gray-200 p-3 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
            </div>
            <div className="flex-1 mx-4">
              <div className="bg-gray-100 rounded-lg px-4 py-2 text-xs text-gray-600 font-mono">
                https://app.iotomato.com/dashboard
              </div>
            </div>
            <button
              onClick={() => setIsFullscreen(!isFullscreen)}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              title="Ver en pantalla completa"
            >
              <Maximize2 className="w-4 h-4 text-gray-600" />
            </button>
          </div>

          {/* Dashboard Embed */}
          <div 
            className={`relative border-2 border-t-0 border-gray-200 rounded-b-2xl overflow-hidden shadow-2xl transition-all duration-500 ${
              isFullscreen ? 'h-screen' : 'h-[700px]'
            }`}
          >

            {/* Dashboard Real */}
            <div className="h-full overflow-auto">
              <EnergyDashboard />
            </div>
          </div>

          {/* Floating Feature Cards */}
          <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 flex gap-4 z-10">
            <div className="bg-white rounded-xl shadow-xl border-2 border-gray-200 px-6 py-3 flex items-center space-x-3">
              <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
              <span className="text-sm font-semibold text-gray-700">Actualización en tiempo real</span>
            </div>
            <div className="bg-white rounded-xl shadow-xl border-2 border-gray-200 px-6 py-3 flex items-center space-x-3">
              <Bell className="w-4 h-4" style={{ color: '#DC0F1A' }} />
              <span className="text-sm font-semibold text-gray-700">3 alertas activas</span>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <div className="inline-block bg-gray-50 rounded-2xl border-2 border-gray-200 px-8 py-6">
            <p className="text-lg text-gray-700 mb-4">
              ¿Listo para tener este nivel de control en tu empresa?
            </p>
            <button 
              onClick={() => document.getElementById('form')?.scrollIntoView({ behavior: 'smooth' })}
              className="inline-flex items-center space-x-2 px-8 py-4 text-white rounded-xl font-semibold text-lg shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
              style={{ 
                backgroundColor: '#DC0F1A',
                boxShadow: '0 10px 40px rgba(220, 15, 26, 0.3)'
              }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#B00D16'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#DC0F1A'}
            >
              <span>Solicitar Demo Personalizada</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};

export default DashboardSection;