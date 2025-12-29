import React, { useState, useMemo } from 'react';
import { Zap, TrendingUp, TrendingDown, DollarSign, Activity, AlertTriangle, Download, FileText, Calendar, MapPin, Lightbulb, Fan, Cpu, Factory } from 'lucide-react';
import { LineChart, Line, AreaChart, Area, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// Colores del tema
const COLORS = {
  primary: '#E0A25B',
  success: '#5BB46C',
  danger: '#D75B5B',
  info: '#4A9DE8',
  categories: ['#E0A25B', '#5BB46C', '#4A9DE8', '#D75B5B']
};

// Generador de datos mock
const generateMockData = () => {
  const now = new Date();
  const categories = ['HVAC', 'Iluminación', 'Equipos', 'Producción'];
  
  // Datos históricos
  const historicalData = Array.from({ length: 365 }, (_, i) => {
    const date = new Date(now);
    date.setDate(date.getDate() - (365 - i));
    return {
      date: date.toISOString().split('T')[0],
      consumo: 800 + Math.random() * 400 + Math.sin(i / 30) * 100,
      costo: 120 + Math.random() * 60 + Math.sin(i / 30) * 15,
      eficiencia: 75 + Math.random() * 15 + Math.cos(i / 45) * 5
    };
  });

  // Consumo por categoría
  const categoryData = categories.map(cat => ({
    name: cat,
    value: 20 + Math.random() * 30
  }));

  // Anomalías detectadas
  const anomalies = [
    { location: 'Planta Norte', consumo: 1450, normal: 1000, fecha: '2024-12-27', severity: 'high' },
    { location: 'Oficinas Central', consumo: 380, normal: 250, fecha: '2024-12-26', severity: 'medium' },
    { location: 'Almacén', consumo: 620, normal: 450, fecha: '2024-12-25', severity: 'medium' }
  ];

  return { historicalData, categoryData, anomalies };
};

// Componente KPI Card
const KPICard = ({ title, value, unit, trend, trendValue, icon: IconComponent, color, tooltip }) => {
  const [showTooltip, setShowTooltip] = useState(false);
  
  return (
    <div 
      className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow relative"
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
      
      {showTooltip && (
        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-900 text-white text-xs rounded shadow-lg z-10 whitespace-nowrap">
          {tooltip}
        </div>
      )}
    </div>
  );
};

// Componente principal Dashboard
const EnergyDashboard = () => {
  const [view, setView] = useState('dashboard');
  const [period, setPeriod] = useState('30d');
  const [efficiencyChange, setEfficiencyChange] = useState(0);
  const [selectedMetrics, setSelectedMetrics] = useState(['consumo', 'costo']);
  const [dateRange, setDateRange] = useState({ start: '', end: '' });

  const mockData = useMemo(() => generateMockData(), []);

  // Filtrar datos según período
  const filteredData = useMemo(() => {
    const days = period === '7d' ? 7 : period === '30d' ? 30 : period === '6m' ? 180 : 365;
    return mockData.historicalData.slice(-days);
  }, [period, mockData]);

  // KPIs con simulación
  const kpis = useMemo(() => {
    const baseConsumo = 32580;
    const baseCosto = 4887;
    const baseEficiencia = 82.5;
    const baseAhorro = 2450;

    const factor = 1 - (efficiencyChange / 100);
    
    return {
      consumo: Math.round(baseConsumo * factor),
      costo: Math.round(baseCosto * factor),
      eficiencia: Math.min(100, baseEficiencia + efficiencyChange),
      ahorro: Math.round(baseAhorro * (1 + efficiencyChange / 10))
    };
  }, [efficiencyChange]);

  // Exportar a PDF
  const exportToPDF = async () => {
    const { jsPDF } = await import('jspdf');
    const doc = new jsPDF();
    
    doc.setFontSize(20);
    doc.text('Reporte Energético', 20, 20);
    doc.setFontSize(12);
    doc.text(`Fecha: ${new Date().toLocaleDateString('es-ES')}`, 20, 30);
    doc.text(`Consumo Total: ${kpis.consumo} kWh`, 20, 45);
    doc.text(`Costo Total: $${kpis.costo}`, 20, 55);
    doc.text(`Eficiencia: ${kpis.eficiencia.toFixed(1)}%`, 20, 65);
    doc.text(`Ahorro Potencial: $${kpis.ahorro}`, 20, 75);
    
    doc.save('reporte-energetico.pdf');
  };

  // Exportar a Excel
  const exportToExcel = async () => {
    const XLSX = await import('xlsx');
    const wb = XLSX.utils.book_new();
    
    const wsData = [
      ['Reporte Energético'],
      ['Fecha', new Date().toLocaleDateString('es-ES')],
      [],
      ['Métrica', 'Valor'],
      ['Consumo Total', `${kpis.consumo} kWh`],
      ['Costo Total', `$${kpis.costo}`],
      ['Eficiencia', `${kpis.eficiencia.toFixed(1)}%`],
      ['Ahorro Potencial', `$${kpis.ahorro}`]
    ];
    
    const ws = XLSX.utils.aoa_to_sheet(wsData);
    XLSX.utils.book_append_sheet(wb, ws, 'Resumen');
    XLSX.writeFile(wb, 'reporte-energetico.xlsx');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <Zap className="w-8 h-8" style={{ color: COLORS.primary }} />
              <h1 className="text-2xl font-bold text-gray-900">Dashboard Energético</h1>
            </div>
            <nav className="flex space-x-4">
              <button
                onClick={() => setView('dashboard')}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  view === 'dashboard' ? 'bg-orange-100 text-orange-700' : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                Dashboard
              </button>
              <button
                onClick={() => setView('reportes')}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  view === 'reportes' ? 'bg-orange-100 text-orange-700' : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                Reportes
              </button>
            </nav>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {view === 'dashboard' ? (
          <>
            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <KPICard
                title="Consumo Energético"
                value={kpis.consumo.toLocaleString()}
                unit="kWh"
                trend="down"
                trendValue="3.2"
                icon={Activity}
                color={COLORS.primary}
                tooltip="Consumo total de energía en el período seleccionado"
              />
              <KPICard
                title="Costo Energético"
                value={`$${kpis.costo.toLocaleString()}`}
                unit=""
                trend="down"
                trendValue="2.8"
                icon={DollarSign}
                color={COLORS.info}
                tooltip="Costo total de energía basado en tarifas actuales"
              />
              <KPICard
                title="Eficiencia Energética"
                value={kpis.eficiencia.toFixed(1)}
                unit="%"
                trend="up"
                trendValue="1.5"
                icon={Zap}
                color={COLORS.success}
                tooltip="Índice de eficiencia energética operacional"
              />
              <KPICard
                title="Ahorro Potencial"
                value={`$${kpis.ahorro.toLocaleString()}`}
                unit=""
                trend="up"
                trendValue="5.1"
                icon={TrendingUp}
                color={COLORS.success}
                tooltip="Ahorro estimado mediante optimización"
              />
            </div>

            {/* Simulador de Escenarios */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <Activity className="w-5 h-5 mr-2" style={{ color: COLORS.primary }} />
                Simulador de Escenarios
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Cambio de Eficiencia: {efficiencyChange > 0 ? '+' : ''}{efficiencyChange}%
                  </label>
                  <input
                    type="range"
                    min="-10"
                    max="10"
                    value={efficiencyChange}
                    onChange={(e) => setEfficiencyChange(Number(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                    style={{
                      background: `linear-gradient(to right, ${COLORS.danger} 0%, ${COLORS.primary} 50%, ${COLORS.success} 100%)`
                    }}
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>-10%</span>
                    <span>0%</span>
                    <span>+10%</span>
                  </div>
                </div>
                <p className="text-sm text-gray-600">
                  {efficiencyChange > 0 
                    ? `Con una mejora del ${efficiencyChange}% en eficiencia, ahorrarías aproximadamente $${Math.abs(kpis.costo - 4887)} en costos.`
                    : efficiencyChange < 0
                    ? `Una reducción del ${Math.abs(efficiencyChange)}% en eficiencia incrementaría los costos en aproximadamente $${Math.abs(kpis.costo - 4887)}.`
                    : 'Ajusta el slider para simular cambios en la eficiencia energética.'}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
              {/* Análisis de Consumo */}
              <div className="lg:col-span-2 bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold">Análisis de Consumo</h3>
                  <div className="flex space-x-2">
                    {['7d', '30d', '6m', '1y'].map((p) => (
                      <button
                        key={p}
                        onClick={() => setPeriod(p)}
                        className={`px-3 py-1 rounded text-sm transition-colors ${
                          period === p ? 'bg-orange-100 text-orange-700' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                      >
                        {p}
                      </button>
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
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#fff', 
                        border: '1px solid #e5e7eb', 
                        borderRadius: '8px',
                        padding: '12px'
                      }}
                      labelFormatter={(value) => {
                        const date = new Date(value);
                        return date.toLocaleDateString('es-ES', { month: 'short', day: 'numeric' });
                      }}
                      formatter={(value, name) => {
                        if (name === 'Consumo') return [`${Math.round(value).toLocaleString()} kWh`, 'Consumo'];
                        if (name === 'Costo') return [`${Math.round(value).toLocaleString()}`, 'Costo'];
                        if (name === 'Eficiencia') return [`${value.toFixed(1)}%`, 'Eficiencia'];
                        return [value, name];
                      }}
                    />
                    <Legend />
                    <Area type="monotone" dataKey="consumo" stroke={COLORS.primary} fillOpacity={1} fill="url(#colorConsumo)" name="Consumo" strokeWidth={2} />
                    <Area type="monotone" dataKey="costo" stroke={COLORS.danger} fillOpacity={0.3} fill="url(#colorCosto)" name="Costo" strokeWidth={2} />
                    <Line type="monotone" dataKey="eficiencia" stroke={COLORS.success} name="Eficiencia" strokeWidth={2} dot={false} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>

              {/* Consumo por Categoría */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold mb-4">Consumo por Categoría</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={mockData.categoryData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {mockData.categoryData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS.categories[index % COLORS.categories.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
                <div className="mt-4 space-y-2">
                  {mockData.categoryData.map((cat, idx) => (
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

            {/* Detector de Anomalías */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <AlertTriangle className="w-5 h-5 mr-2" style={{ color: COLORS.danger }} />
                Detector de Anomalías
              </h3>
              <div className="space-y-3">
                {mockData.anomalies.map((anomaly, idx) => (
                  <div key={idx} className={`p-4 rounded-lg border-l-4 ${anomaly.severity === 'high' ? 'bg-red-50 border-red-500' : 'bg-yellow-50 border-yellow-500'}`}>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center mb-1">
                          <MapPin className="w-4 h-4 mr-2 text-gray-600" />
                          <span className="font-semibold">{anomaly.location}</span>
                        </div>
                        <p className="text-sm text-gray-600">
                          Consumo detectado: <span className="font-bold">{anomaly.consumo} kWh</span> (Normal: {anomaly.normal} kWh)
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          {new Date(anomaly.fecha).toLocaleDateString('es-ES', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                        </p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        anomaly.severity === 'high' ? 'bg-red-200 text-red-800' : 'bg-yellow-200 text-yellow-800'
                      }`}>
                        +{Math.round(((anomaly.consumo - anomaly.normal) / anomaly.normal) * 100)}%
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        ) : (
          /* Vista de Reportes */
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold mb-6 flex items-center">
              <FileText className="w-6 h-6 mr-2" style={{ color: COLORS.primary }} />
              Constructor de Reportes
            </h2>

            <div className="space-y-6">
              {/* Selección de Métricas */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Seleccionar Métricas
                </label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {[
                    { id: 'consumo', label: 'Consumo', icon: Activity },
                    { id: 'costo', label: 'Costo', icon: DollarSign },
                    { id: 'eficiencia', label: 'Eficiencia', icon: Zap },
                    { id: 'ahorro', label: 'Ahorro', icon: TrendingUp }
                  ].map(({ id, label, icon: IconComponent }) => (
                    <label key={id} className="flex items-center p-3 border rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                      <input
                        type="checkbox"
                        checked={selectedMetrics.includes(id)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedMetrics([...selectedMetrics, id]);
                          } else {
                            setSelectedMetrics(selectedMetrics.filter(m => m !== id));
                          }
                        }}
                        className="mr-3"
                      />
                      <IconComponent className="w-4 h-4 mr-2 text-gray-600" />
                      <span className="text-sm">{label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Rango de Fechas */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Fecha Inicio
                  </label>
                  <input
                    type="date"
                    value={dateRange.start}
                    onChange={(e) => setDateRange({ ...dateRange, start: e.target.value })}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Fecha Fin
                  </label>
                  <input
                    type="date"
                    value={dateRange.end}
                    onChange={(e) => setDateRange({ ...dateRange, end: e.target.value })}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* Botones de Exportación */}
              <div className="flex flex-wrap gap-3 pt-4 border-t">
                <button
                  onClick={exportToPDF}
                  className="flex items-center px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors shadow-md"
                >
                  <Download className="w-5 h-5 mr-2" />
                  Exportar a PDF
                </button>
                <button
                  onClick={exportToExcel}
                  className="flex items-center px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors shadow-md"
                >
                  <Download className="w-5 h-5 mr-2" />
                  Exportar a Excel
                </button>
              </div>

              {/* Configuración de Reportes Programados */}
              <div className="mt-8 p-6 bg-gray-50 rounded-lg border">
                <h3 className="text-lg font-semibold mb-4 flex items-center">
                  <Calendar className="w-5 h-5 mr-2" style={{ color: COLORS.info }} />
                  Reportes Programados
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Frecuencia
                    </label>
                    <select className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent">
                      <option>Diario</option>
                      <option>Semanal</option>
                      <option>Mensual</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email de destino
                    </label>
                    <input
                      type="email"
                      placeholder="energia@empresa.com"
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    />
                  </div>
                  <button className="px-6 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors">
                    Configurar Programación
                  </button>
                  <p className="text-xs text-gray-500">
                    * Los reportes programados se generarán automáticamente y se enviarán al email especificado
                  </p>
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