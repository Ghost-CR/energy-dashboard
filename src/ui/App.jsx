import React, { useState, useMemo } from 'react';
import { Zap, TrendingUp, TrendingDown, DollarSign, Activity, AlertTriangle, Download, FileText, Calendar } from 'lucide-react';
import { LineChart, Line, AreaChart, Area, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { DashboardService } from '../domain/services/DashboardService';
import { MockEnergyRepository } from '../infraestructure/mock/EnergyMockRepository';
import { EnergyMetricsService } from '../domain/services/EnergyMetricsService';
import EnergyDashboard from './Dashboard';

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Landing / Hero / CTA */}
      <section className="max-w-7xl mx-auto px-6 py-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Gestión energética inteligente para empresas.
          </h1>
        <p className="text-gray-600 max-w-2xl">
          Visualiza consumos, costos y eficiencia en tiempo real.
        </p>
      </section>
        
        {/* Dashboard embebido */}
        <section className="max-w-7xl mx-auto px-6 pb-12">
        <div className="border rounded-xl shadow-lg overflow-hidden">
          <EnergyDashboard />
        </div>
      </section>
    </div>
  )
}

export default App;
