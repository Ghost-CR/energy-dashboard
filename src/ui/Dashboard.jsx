import React, { useState, useMemo } from 'react';
import { Zap, TrendingUp, TrendingDown, DollarSign, Activity, AlertTriangle, Download, FileText, Calendar } from 'lucide-react';
import { LineChart, Line, AreaChart, Area, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { DashboardService } from '../domain/services/DashboardService';
import { MockEnergyRepository } from '../infraestructure/mock/EnergyMockRepository';
import { EnergyMetricsService } from '../domain/services/EnergyMetricsService';

const COLORS = {
  primary: '#E0A25B',
  success: '#5BB46C',
  danger: '#D75B5B',
  info: '#4A9DE8',
  categories: ['#E0A25B', '#5BB46C', '#4A9DE8', '#D75B5B']
};

const generateHistoricalData = (profile) => {
  const now = new Date();
  const historicalData = [];
  
  for (let i = 365; i >= 0; i--) {
    const date = new Date(now);
    date.setDate(date.getDate() - i);
    const samples = MockEnergyRepository.generateSample(profile, 1);
    const kpis = EnergyMetricsService.calculateKPIs(samples);
    
    historicalData.push({
      date: date.toISOString().split('T')[0],
      consumo: samples[0].consumptionKwh,
      costo: kpis.estimatedCost,
      eficiencia: kpis.efficiencyScore
    });
  }
  
  return historicalData;
};

const categoryData = [
  { name: 'HVAC', value: 35 },
  { name: 'Iluminación', value: 25 },
  { name: 'Equipos', value: 20 },
  { name: 'Producción', value: 20 }
];

const KPICard = ({ title, value, unit, trend, trendValue, icon: IconComponent, color, tooltip, alert }) => {
  const [showTooltip, setShowTooltip] = useState(false);
  
  return (
    <div 
      className={`bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow relative ${alert ? 'ring-2 ring-red-400' : ''}`}
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm text-gray-600 mb-1">{title}</p>
          <p className="text-3xl font-bold" style={{ color }}>{value}<span className="text-lg ml-1">{unit}</span></p>
          <div className="flex items-center mt-2">
            {trend === 'up' ? <TrendingUp className="w-4 h-4 mr-1" style={{ color: COLORS.success }} /> : <TrendingDown className="w-4 h-4 mr-1" style={{ color: COLORS.danger }} />}
            <span className={`text-sm ${trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
              {trendValue}% vs período anterior
            </span>
          </div>
        </div>
        <div className="p-3 rounded-full" style={{ backgroundColor: `${color}20` }}>
          <IconComponent className="w-6 h-6" style={{ color }} />
        </div>
      </div>
      
      {alert && (
        <div className="mt-3 flex items-start space-x-2 text-xs text-red-600 bg-red-50 p-2 rounded">
          <AlertTriangle className="w-4 h-4 flex-shrink-0 mt-0.5" />
          <span>{alert}</span>
        </div>
      )}
      
      {showTooltip && (
        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-900 text-white text-xs rounded shadow-lg z-10 whitespace-nowrap">
          {tooltip}
        </div>
      )}
    </div>
  );
};

const EnergyDashboard = () => {
  const [view, setView] = useState('dashboard');
  const [period, setPeriod] = useState('30d');
  const [profile, setProfile] = useState('industrial');
  const [efficiencyChange, setEfficiencyChange] = useState(0);
  const [selectedMetrics, setSelectedMetrics] = useState(['consumo', 'costo']);
  const [dateRange, setDateRange] = useState({ start: '', end: '' });

  const dashboardData = useMemo(() => DashboardService.getDemoDashboard(profile), [profile]);
  const historicalData = useMemo(() => generateHistoricalData(profile), [profile]);
  const filteredData = useMemo(() => {
    const days = period === '7d' ? 7 : period === '30d' ? 30 : period === '6m' ? 180 : 365;
    return historicalData.slice(-days);
  }, [period, historicalData]);

  const kpis = useMemo(() => {
    const baseKpis = dashboardData.kpis;
    const factor = 1 - (efficiencyChange / 100);
    
    return {
      totalConsumption: Math.round(baseKpis.totalConsumption * factor),
      estimatedCost: Math.round(baseKpis.estimatedCost * factor),
      efficiencyScore: Math.min(100, baseKpis.efficiencyScore + efficiencyChange),
      avgPowerFactor: baseKpis.avgPowerFactor,
      powerFactorStatus: baseKpis.powerFactorStatus,
      alerts: baseKpis.alerts,
      potentialSavings: Math.round(baseKpis.estimatedCost * 0.15 * (1 + efficiencyChange / 10))
    };
  }, [dashboardData, efficiencyChange]);

  const getPowerFactorColor = (status) => {
    if (status === 'good') return COLORS.success;
    if (status === 'warning') return COLORS.primary;
    return COLORS.danger;
  };

  const efficiencyAlert = kpis.alerts.find(a => a.type === 'power-factor');

  const exportToPDF = async () => {
    const { jsPDF } = await import('jspdf');
    const doc = new jsPDF();
    doc.setFontSize(20);
    doc.text('Reporte Energético', 20, 20);
    doc.setFontSize(12);
    doc.text(`Fecha: ${new Date().toLocaleDateString('es-ES')}`, 20, 30);
    doc.text(`Perfil: ${profile === 'industrial' ? 'Industrial' : 'No Industrial'}`, 20, 40);
    doc.text(`Consumo Total: ${kpis.totalConsumption.toFixed(2)} kWh`, 20, 55);
    doc.text(`Costo Estimado: $${kpis.estimatedCost.toFixed(2)}`, 20, 65);
    doc.text(`Factor de Potencia: ${kpis.avgPowerFactor}`, 20, 75);
    doc.text(`Score de Eficiencia: ${kpis.efficiencyScore}%`, 20, 85);
    doc.save('reporte-energetico.pdf');
  };

  const exportToExcel = async () => {
    const XLSX = await import('xlsx');
    const wb = XLSX.utils.book_new();
    const wsData = [
      ['Reporte Energético'],
      ['Fecha', new Date().toLocaleDateString('es-ES')],
      ['Perfil', profile === 'industrial' ? 'Industrial' : 'No Industrial'],
      [],
      ['Métrica', 'Valor'],
      ['Consumo Total', `${kpis.totalConsumption.toFixed(2)} kWh`],
      ['Costo Estimado', `$${kpis.estimatedCost.toFixed(2)}`],
      ['Factor de Potencia', kpis.avgPowerFactor],
      ['Score de Eficiencia', `${kpis.efficiencyScore}%`]
    ];
    const ws = XLSX.utils.aoa_to_sheet(wsData);
    XLSX.utils.book_append_sheet(wb, ws, 'Resumen');
    XLSX.writeFile(wb, 'reporte-energetico.xlsx');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <Zap className="w-8 h-8" style={{ color: COLORS.primary }} />
              <h1 className="text-2xl font-bold text-gray-900">Dashboard Energético</h1>
            </div>
            <div className="flex items-center space-x-4">
              <select value={profile} onChange={(e) => setProfile(e.target.value)} className="px-3 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500">
                <option value="industrial">Perfil Industrial</option>
                <option value="non-industrial">Perfil No Industrial</option>
              </select>
              <nav className="flex space-x-4">
                <button onClick={() => setView('dashboard')} className={`px-4 py-2 rounded-lg transition-colors ${view === 'dashboard' ? 'bg-orange-100 text-orange-700' : 'text-gray-600 hover:bg-gray-100'}`}>Dashboard</button>
                <button onClick={() => setView('reportes')} className={`px-4 py-2 rounded-lg transition-colors ${view === 'reportes' ? 'bg-orange-100 text-orange-700' : 'text-gray-600 hover:bg-gray-100'}`}>Reportes</button>
              </nav>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {view === 'dashboard' ? (
          <>
            {kpis.alerts.length > 0 && (
              <div className="mb-6 space-y-2">
                {kpis.alerts.map((alert, idx) => (
                  <div key={idx} className={`p-4 rounded-lg flex items-start space-x-3 ${alert.level === 'critical' ? 'bg-red-50 border border-red-200' : 'bg-yellow-50 border border-yellow-200'}`}>
                    <AlertTriangle className={`w-5 h-5 flex-shrink-0 mt-0.5 ${alert.level === 'critical' ? 'text-red-600' : 'text-yellow-600'}`} />
                    <div>
                      <p className={`font-semibold ${alert.level === 'critical' ? 'text-red-900' : 'text-yellow-900'}`}>{alert.level === 'critical' ? 'Alerta Crítica' : 'Advertencia'}</p>
                      <p className={`text-sm ${alert.level === 'critical' ? 'text-red-700' : 'text-yellow-700'}`}>{alert.message}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <KPICard title="Consumo Energético" value={kpis.totalConsumption.toFixed(2)} unit="kWh" trend="down" trendValue="3.2" icon={Activity} color={COLORS.primary} tooltip="Consumo total de energía" />
              <KPICard title="Costo Estimado" value={`$${kpis.estimatedCost.toFixed(2)}`} unit="" trend="down" trendValue="2.8" icon={DollarSign} color={COLORS.info} tooltip="Costo estimado ($0.15/kWh)" />
              <KPICard title="Eficiencia Energética" value={kpis.efficiencyScore} unit="%" trend={kpis.powerFactorStatus === 'good' ? 'up' : 'down'} trendValue="1.5" icon={Zap} color={getPowerFactorColor(kpis.powerFactorStatus)} tooltip={`FP: ${kpis.avgPowerFactor}`} alert={efficiencyAlert?.message} />
              <KPICard title="Ahorro Potencial" value={`$${kpis.potentialSavings}`} unit="" trend="up" trendValue="5.1" icon={TrendingUp} color={COLORS.success} tooltip="Ahorro estimado" />
            </div>

            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <Activity className="w-5 h-5 mr-2" style={{ color: COLORS.primary }} />
                Simulador de Escenarios
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Cambio de Eficiencia: {efficiencyChange > 0 ? '+' : ''}{efficiencyChange}%</label>
                  <input type="range" min="-10" max="10" value={efficiencyChange} onChange={(e) => setEfficiencyChange(Number(e.target.value))} className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer" style={{ background: `linear-gradient(to right, ${COLORS.danger} 0%, ${COLORS.primary} 50%, ${COLORS.success} 100%)` }} />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>-10%</span><span>0%</span><span>+10%</span>
                  </div>
                </div>
                <p className="text-sm text-gray-600">
                  {efficiencyChange > 0 ? `Mejora del ${efficiencyChange}%: ahorras ~$${Math.abs(kpis.estimatedCost - dashboardData.kpis.estimatedCost).toFixed(2)}` : efficiencyChange < 0 ? `Reducción del ${Math.abs(efficiencyChange)}%: incremento de ~$${Math.abs(kpis.estimatedCost - dashboardData.kpis.estimatedCost).toFixed(2)}` : 'Ajusta el slider para simular cambios'}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
              <div className="lg:col-span-2 bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold">Análisis de Consumo</h3>
                  <div className="flex space-x-2">
                    {['7d', '30d', '6m', '1y'].map((p) => (
                      <button key={p} onClick={() => setPeriod(p)} className={`px-3 py-1 rounded text-sm transition-colors ${period === p ? 'bg-orange-100 text-orange-700' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>{p}</button>
                    ))}
                  </div>
                </div>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={filteredData}>
                    <defs>
                      <linearGradient id="colorConsumo" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor={COLORS.primary} stopOpacity={0.8}/>
                        <stop offset="95%" stopColor={COLORS.primary} stopOpacity={0.1}/>
                      </linearGradient>
                      <linearGradient id="colorCosto" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor={COLORS.danger} stopOpacity={0.8}/>
                        <stop offset="95%" stopColor={COLORS.danger} stopOpacity={0.1}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="date" tick={{ fontSize: 12 }} tickFormatter={(value) => {
                      const date = new Date(value);
                      return `${date.getDate()}/${date.getMonth() + 1}`;
                    }} />
                    <YAxis tick={{ fontSize: 12 }} />
                    <Tooltip contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '12px' }} labelFormatter={(value) => new Date(value).toLocaleDateString('es-ES', { month: 'short', day: 'numeric' })} formatter={(value, name) => {
                      if (name === 'Consumo') return [`${Math.round(value).toLocaleString()} kWh`, 'Consumo'];
                      if (name === 'Costo') return [`$${value.toFixed(2)}`, 'Costo'];
                      if (name === 'Eficiencia') return [`${value.toFixed(1)}%`, 'Eficiencia'];
                      return [value, name];
                    }} />
                    <Legend />
                    <Area type="monotone" dataKey="consumo" stroke={COLORS.primary} fillOpacity={1} fill="url(#colorConsumo)" name="Consumo" strokeWidth={2} />
                    <Area type="monotone" dataKey="costo" stroke={COLORS.danger} fillOpacity={0.3} fill="url(#colorCosto)" name="Costo" strokeWidth={2} />
                    <Line type="monotone" dataKey="eficiencia" stroke={COLORS.success} name="Eficiencia" strokeWidth={2} dot={false} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>

              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold mb-4">Consumo por Categoría</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie data={categoryData} cx="50%" cy="50%" labelLine={false} label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`} outerRadius={80} fill="#8884d8" dataKey="value">
                      {categoryData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS.categories[index % COLORS.categories.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
                <div className="mt-4 space-y-2">
                  {categoryData.map((cat, idx) => (
                    <div key={cat.name} className="flex items-center justify-between text-sm">
                      <div className="flex items-center">
                        <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: COLORS.categories[idx] }}></div>
                        <span>{cat.name}</span>
                      </div>
                      <span className="font-semibold">{cat.value.toFixed(1)}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold mb-4">Métricas Técnicas</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-600 mb-2">Factor de Potencia</p>
                  <p className="text-3xl font-bold" style={{ color: getPowerFactorColor(kpis.powerFactorStatus) }}>{kpis.avgPowerFactor}</p>
                  <p className="text-xs text-gray-500 mt-1">Estado: {kpis.powerFactorStatus === 'good' ? 'Bueno' : kpis.powerFactorStatus === 'warning' ? 'Advertencia' : 'Malo'}</p>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-600 mb-2">Muestras Analizadas</p>
                  <p className="text-3xl font-bold text-gray-700">{dashboardData.meta.sampleCount}</p>
                  <p className="text-xs text-gray-500 mt-1">Últimas 24 horas</p>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-600 mb-2">Perfil Energético</p>
                  <p className="text-xl font-bold text-gray-700">{profile === 'industrial' ? 'Industrial' : 'No Industrial'}</p>
                  <p className="text-xs text-gray-500 mt-1">Configuración actual</p>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold mb-6 flex items-center">
              <FileText className="w-6 h-6 mr-2" style={{ color: COLORS.primary }} />
              Constructor de Reportes
            </h2>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">Seleccionar Métricas</label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {[
                    { id: 'consumo', label: 'Consumo', icon: Activity },
                    { id: 'costo', label: 'Costo', icon: DollarSign },
                    { id: 'eficiencia', label: 'Eficiencia', icon: Zap },
                    { id: 'ahorro', label: 'Ahorro', icon: TrendingUp }
                  ].map(({ id, label, icon: IconComponent }) => (
                    <label key={id} className="flex items-center p-3 border rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                      <input type="checkbox" checked={selectedMetrics.includes(id)} onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedMetrics([...selectedMetrics, id]);
                        } else {
                          setSelectedMetrics(selectedMetrics.filter(m => m !== id));
                        }
                      }} className="mr-3" />
                      <IconComponent className="w-4 h-4 mr-2 text-gray-600" />
                      <span className="text-sm">{label}</span>
                    </label>
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Fecha Inicio</label>
                  <input type="date" value={dateRange.start} onChange={(e) => setDateRange({ ...dateRange, start: e.target.value })} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Fecha Fin</label>
                  <input type="date" value={dateRange.end} onChange={(e) => setDateRange({ ...dateRange, end: e.target.value })} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500" />
                </div>
              </div>
              <div className="flex flex-wrap gap-3 pt-4 border-t">
                <button onClick={exportToPDF} className="flex items-center px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors shadow-md">
                  <Download className="w-5 h-5 mr-2" />Exportar a PDF
                </button>
                <button onClick={exportToExcel} className="flex items-center px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors shadow-md">
                  <Download className="w-5 h-5 mr-2" />Exportar a Excel
                </button>
              </div>
              <div className="mt-8 p-6 bg-gray-50 rounded-lg border">
                <h3 className="text-lg font-semibold mb-4 flex items-center">
                  <Calendar className="w-5 h-5 mr-2" style={{ color: COLORS.info }} />
                  Reportes Programados
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Frecuencia</label>
                    <select className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500">
                      <option>Diario</option>
                      <option>Semanal</option>
                      <option>Mensual</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email de destino</label>
                    <input type="email" placeholder="energia@empresa.com" className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500" />
                  </div>
                  <button className="px-6 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors">Configurar Programación</button>
                  <p className="text-xs text-gray-500">* Los reportes se generarán automáticamente</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default EnergyDashboard;