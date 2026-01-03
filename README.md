# Energy Dashboard - ioTomato

Dashboard interactivo para monitoreo y análisis de consumo energético desarrollado para la web de ioTomato.

## 📋 Descripción General

Este proyecto es una aplicación web moderna construida con **React + Vite** que proporciona:

- 📊 **Visualización de datos energéticos** en tiempo real
- 💹 **Análisis de KPIs** de consumo y eficiencia
- ⚠️ **Sistema de alertas** para anomalías
- 📥 **Exportación de reportes** (PDF y Excel)
- 🎨 **Interfaz responsiva** con Tailwind CSS

## 🏗️ Arquitectura del Proyecto

La estructura sigue una **arquitectura de capas limpia** (Clean Architecture):

```
src/
├── domain/              # Lógica de negocio
│   ├── services/        # Servicios principales
│   ├── repositories/    # Interfaces de datos (files vacíos)
│   └── types/          # Tipos TypeScript
├── infraestructure/     # Implementación técnica
│   └── mock/           # Datos simulados
└── ui/                 # Presentación (React)
    ├── App.jsx         # Página principal
    ├── Dashboard.jsx   # Componente dashboard
    └── components/     # Componentes reutilizables
```

## 🔑 Componentes Principales

### 1. **Domain Layer** (Lógica de Negocio)

#### Servicios:
- **`DashboardService`** - Orquesta datos y calcula KPIs
- **`EnergyMetricsService`** - Calcula métricas energéticas
- **`ChatContextService`** - Gestiona contexto de chat

#### Tipos (TypeScript):
```typescript
EnergySample      // Muestra puntual de energía
EnergyKPIs        // Indicadores clave de rendimiento
Alert             // Alertas del sistema
EnergyProfile     // Perfil de cliente (industrial/non-industrial)
```

### 2. **Infrastructure Layer** (Datos)

- **`EnergyMockRepository`** - Genera datos simulados realistas
  - Soporta dos perfiles: `industrial` y `non-industrial`
  - Genera datos históricos de 365 días

### 3. **UI Layer** (Interfaz)

#### Componentes Principales:
- **`App.jsx`** - Contenedor principal con secciones
- **`Dashboard.jsx`** - Panel interactivo con gráficos
- **`Header`, `Footer`** - Navegación
- **`Hero`, `Problem`, `Solution`, `Benefits`** - Landing page
- **`DashboardSection`** - Integración del dashboard

#### Librerías UI:
- **Recharts** - Gráficas interactivas
- **Lucide React** - Iconografía
- **Tailwind CSS** - Estilos

## 📊 Flujo de Datos

```
MockEnergyRepository.generateSample()
        ↓
DashboardService.getDemoDashboard()
        ↓
EnergyMetricsService.calculateKPIs()
        ↓
Dashboard.jsx (visualización)
```

## 🎯 Tipos Principales

### EnergySample
Representa una muestra de energía en un momento específico:
```typescript
{
  timestamp: string       // Marca de tiempo
  consumptionKwh: number // Consumo en kWh
  voltage: number        // Voltaje
  current: number        // Corriente
  powerFactor: number    // Factor de potencia (0-1)
  thd: number           // Distorsión armónica total
}
```

### EnergyKPIs
Indicadores clave de rendimiento:
```typescript
{
  totalConsumption: number      // Consumo total
  estimatedCost: number         // Costo estimado
  avgPowerFactor: number        // Factor de potencia promedio
  efficiencyScore: number       // Puntuación de eficiencia (0-100)
  powerFactorStatus: string     // "good" | "warning" | "bad"
  alerts: Alert[]              // Lista de alertas
}
```

### Alert
Sistema de alertas:
```typescript
{
  type: "power-factor" | "harmonics"  // Tipo de alerta
  level: "warning" | "critical"       // Severidad
  message: string                     // Descripción
}
```

## 🚀 Cómo Funciona

### 1. Carga de Datos
- El `DashboardService` solicita datos al `MockEnergyRepository`
- Se generan 48 muestras (simulando datos cada 30 minutos)
- Los datos varían según el perfil: industrial o non-industrial

### 2. Cálculo de Métricas
- **Consumo Total**: Suma de todas las muestras
- **Costo**: Consumo × precio por kWh (default $0.15)
- **Factor de Potencia**: Promedio de todas las muestras
- **Eficiencia**: Puntuación basada en factor de potencia
- **Alertas**: Generadas si el factor cae por debajo de umbrales

### 3. Visualización
El Dashboard presenta:
- **KPI Cards**: Métricas principales con tendencias
- **Gráfica de Línea**: Consumo temporal
- **Gráfica de Área**: Costo diario
- **Gráfica Circular**: Distribución por categoría (HVAC, Iluminación, Equipos, Producción)
- **Datos Históricos**: Comparativa de 365 días con consumo, costo y eficiencia

## 📦 Dependencias Principales

```json
{
  "react": "19.2.0",           // UI framework
  "react-dom": "19.2.0",       // Renderizado DOM
  "recharts": "3.6.0",         // Gráficas interactivas
  "tailwindcss": "3.4.1",      // Estilos CSS
  "lucide-react": "0.562.0",   // Iconografía
  "jspdf": "3.0.4",            // Exportar PDF
  "xlsx": "0.18.5"             // Exportar Excel
}
```

## 🛠️ Configuración

### Vite
Configurado para desarrollo rápido con Hot Module Reload (HMR)

### Tailwind CSS
Estilos utilitarios personalizados con colores:
- **Primario**: #E0A25B (dorado)
- **Éxito**: #5BB46C (verde)
- **Peligro**: #D75B5B (rojo)
- **Info**: #4A9DE8 (azul)

### ESLint
Reglas configuradas para React y validación de código

## 🔄 Modelos de Datos

### Perfil Industrial
- Mayor variabilidad en consumo
- Picos durante horas de producción
- Factor de potencia más bajo (≈0.80-0.90)
- Alertas más frecuentes

### Perfil Non-Industrial
- Consumo más estable
- Patrones predecibles
- Factor de potencia más alto (≈0.92-0.98)
- Menos alertas

## 📥 Exportación de Reportes

El dashboard soporta:
- **Descargar PDF**: Reportes formales con gráficas
- **Descargar Excel**: Datos crudos para análisis adicional

## 🎨 Paleta de Colores

| Propósito | Color | Código |
|-----------|-------|--------|
| Primario | Dorado | #E0A25B |
| Éxito | Verde | #5BB46C |
| Peligro | Rojo | #D75B5B |
| Información | Azul | #4A9DE8 |

## 📝 Scripts Disponibles

```bash
npm run dev      # Inicia servidor de desarrollo (puerto 5173)
npm run build    # Construye para producción
npm run lint     # Ejecuta linting
npm run preview  # Previsualiza build
```

## 🔮 Extensiones Futuras

- Integración con API real de energía
- Sistema de usuarios y autenticación
- Múltiples dashboards por usuario
- Predicciones ML de consumo
- Comparativa mes a mes
- Integración con sistemas IoT reales
- Análisis de tendencias avanzados
- Notificaciones en tiempo real

## 📚 Estructura de Carpetas Detallada

```
energy-dashboard/
├── src/
│   ├── domain/
│   │   ├── services/
│   │   │   ├── DashboardService.ts      # Orquesta datos
│   │   │   ├── EnergyMetricsService.ts  # Calcula KPIs
│   │   │   └── ChatContextService.ts    # Chat context (file vacío)
│   │   ├── repositories/              # Aun no han sido usados
│   │   │   ├── ChatContextRepository.js
│   │   │   ├── CompanyRepository.js
│   │   │   ├── EnergyRepository.js
│   │   │   └── SubscriptionRepository.js
│   │   └── types/
│   │       ├── energy.ts               # Tipos energía
│   │       ├── company.ts              # Tipos empresa
│   │       ├── chat.js                 # No funcional aún
│   │       └── subscription.js         # No funcional aún
│   ├── infraestructure/
│   │   └── mock/
│   │       └── EnergyMockRepository.ts  # Generador datos
│   └── ui/
│       ├── App.jsx                     # Root component
│       ├── Dashboard.jsx               # Main dashboard
│       ├── components/
│       │   ├── Header.jsx
│       │   └── Footer.jsx
│       └── sections/
│           ├── Hero.jsx
│           ├── Problem.jsx
│           ├── Solution.jsx
│           ├── Benefits.jsx
│           ├── DashboardSection.jsx
│           ├── FinalCTA.jsx
│           └── SocialProof.tsx
├── public/                              # Assets estáticos
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
├── eslint.config.js
└── README.md
```

## 🔧 Configuración de Precios

Por defecto, el sistema utiliza:
- **Precio por kWh**: $0.15
- **Factor de potencia ideal**: 0.95

Estos valores se pueden modificar en `EnergyMetricsService.ts` en la función `calculateKPIs()`.

## 📊 Métricas Calculadas

1. **Consumo Total** - Suma de kWh de todas las muestras
2. **Costo Estimado** - Consumo × precio por kWh
3. **Factor de Potencia** - Promedio ponderado
4. **Score de Eficiencia** - Porcentaje basado en factor de potencia
5. **Estado del Factor de Potencia** - Good/Warning/Bad
6. **Alertas** - Generadas según umbrales

## 📄 Licencia

Proyecto privado de ioTomato - 2026

# Arquitectura del chatbot

src/
├── domain/
│   ├── services/
│   │   ├── DashboardService.ts
│   │   ├── EnergyMetricsService.ts
│   │   └── ChatContextService.ts   👈 🧠 cerebro del bot
│   │
│   ├── repositories/
│   │   ├── EnergyRepository.ts
│   │   ├── CompanyRepository.ts
│   │   ├── SubscriptionRepository.ts
│   │   └── ChatContextRepository.ts 👈 memoria/contexto
│   │
│   └── chatbot/
│       └── knowledge/
│           ├── energyInsights.ts   👈 reglas energéticas
│           └── salesGuidance.ts    👈 reglas comerciales
│
├── infraestructure/
│   ├── mock/
│   │   └── EnergyMockRepository.ts
│   └── ai/
│       └── ChatbotAIProvider.ts    👈 opcional / futuro
│
└── ui/
    └── chatbot/
        ├── ChatbotWidget.jsx
        ├── ChatbotPanel.jsx
        ├── ChatMessage.jsx
        └── ChatInput.jsx
