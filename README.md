# Energy Dashboard & AI Assistant ⚡📊

Plataforma integral de monitoreo energético industrial desarrollada en React. Este proyecto combina visualización de datos en tiempo real con un asistente de Inteligencia Artificial para optimizar el consumo y reducir costos.

## 🌟 Características Principales

- **Dashboard Interactivo**: Visualización de métricas críticas (kWh, Factor de Potencia, Costos)
- **Sistema de Alertas**: Detección automática de anomalías
- **Reportes**: Generación de análisis históricos
- **Chatbot IA Contextual**: Asistente que "ve" los mismos datos que el usuario
- **Modo Pantalla Completa**: Para visualización en centros de control

---

## 🏗️ Arquitectura del Proyecto

El código sigue una **arquitectura en capas** (Clean Architecture) para garantizar mantenibilidad y escalabilidad.

```
src/
├── domain/                    # 🧠 LÓGICA DE NEGOCIO (Independiente de UI)
│   ├── services/              # Orquestadores de datos
│   │   ├── DashboardService.ts        # Gestión principal de datos
│   │   ├── EnergyMetricsService.ts    # Cálculos de KPIs
│   │   ├── chatbot/
│   │   │   ├── ChatController.ts      # Procesa mensajes del usuario
│   │   │   └── ChatContextService.ts  # Maneja contexto del chat
│   │   └── repositories/              # Acceso a datos
│   │       ├── EnergyRepository.js    # Datos energéticos
│   │       ├── ChatContextRepository.js
│   │       ├── CompanyRepository.js
│   │       └── SubscriptionRepository.js
│   ├── chatbot/                       # Reglas de negocio IA
│   │   └── knowledge/
│   │       ├── energyInsights.ts      # Sugerencias de ahorro
│   │       └── salesGuidance.ts       # Guía de ventas
│   └── types/                         # Tipos TypeScript
│       ├── chat.ts, company.ts, energy.ts, subscription.js
│
├── ui/                        # 🎨 INTERFAZ DE USUARIO (React)
│   ├── App.jsx                # Componente raíz
│   ├── Dashboard.jsx          # Gráficos e indicadores
│   ├── sections/              # Secciones principales
│   │   ├── DashboardSection.jsx   # Orquestador del dashboard
│   │   ├── Hero.jsx, Problem.jsx, Solution.jsx
│   │   ├── Benefits.jsx, SocialProof.tsx, FinalCTA.jsx
│   │   └── Footer.jsx
│   ├── chatbot/               # Componentes del chat
│   │   ├── ChatbotWidget.jsx  # Contenedor principal
│   │   ├── ChatbotPanel.jsx   # Panel del chat
│   │   ├── ChatInput.jsx      # Campo de entrada
│   │   └── ChatMessage.jsx    # Mensaje individual
│   ├── components/            # Componentes reutilizables
│   │   └── Header.jsx, Footer.jsx
│   └── assets/                # Imágenes, iconos, etc.
│
└── infraestructure/           # 🔌 CAPAS EXTERNAS
    ├── ai/
    │   └── ChatbotAIProvider.ts  # Integración con API de IA
    └── mock/
        └── EnergyMockRepository.ts  # Datos simulados para desarrollo
```

---

## 🔄 Flujo de Datos (Data Flow)

El flujo es **unidireccional** para garantizar consistencia:

```
┌─────────────────────────────────────────────────────────────┐
│ 1. GENERACIÓN DE DATOS                                      │
│    MockEnergyRepository.generateSample() → datos crudos     │
└──────────────┬──────────────────────────────────────────────┘
               │
┌──────────────▼──────────────────────────────────────────────┐
│ 2. PROCESAMIENTO                                            │
│    EnergyMetricsService.calculateKPIs() → KPIs calculados   │
└──────────────┬──────────────────────────────────────────────┘
               │
┌──────────────▼──────────────────────────────────────────────┐
│ 3. ESTADO GLOBAL (React)                                    │
│    DashboardSection.jsx → useMemo para optimización         │
└──────────┬──────────────────┬────────────────────┬──────────┘
           │                  │                    │
    ┌──────▼───┐       ┌──────▼────┐        ┌──────▼──────┐
    │ Gráficos │       │  Tarjetas │        │   Chat      │
    │ (Recharts)      │   KPI     │        │  (IA)       │
    └──────────┘       └───────────┘        └─────────────┘
           │
┌──────────▼──────────────────────────────────────────────────┐
│ 4. PROCESAMIENTO IA (ChatController)                        │
│    - Recibe KPIs + Mensaje usuario                          │
│    - Enriquece prompt con contexto                          │
│    - Llama ChatbotAIProvider → IA externa                   │
└──────────────────────────────────────────────────────────────┘
```

---

## 📚 Guía Detallada de Cada Capa

### 🧠 DOMAIN (Lógica de Negocio)

#### `DashboardService.ts`
- **Responsabilidad**: Orquestar todos los datos del dashboard
- **Métodos principales**:
  - Obtiene datos del perfil (Industrial/Residencial)
  - Normaliza valores para evitar `undefined`
  - Calcula métricas agregadas

**Ejemplo de uso**:
```jsx
const data = DashboardService.getData(profile);
// Retorna: { consumo, costos, eficiencia, alertas }
```

#### `EnergyMetricsService.ts`
- **Responsabilidad**: Cálculos matemáticos de KPIs
- **Métodos**:
  - `calculateKPIs(samples)`: Procesa muestras de energía
  - Retorna: `{ estimatedCost, efficiencyScore, powerFactor }`

#### `ChatController.ts`
- **Responsabilidad**: Procesar mensajes del usuario
- **Flujo**:
  1. Recibe mensaje + KPIs actuales
  2. Enriquece el contexto con reglas de `energyInsights.ts`
  3. Genera prompt estructurado para la IA

#### `chatbot/knowledge/energyInsights.ts`
- **Responsabilidad**: Reglas de negocio para sugerencias
- Son **funciones puras** que retornan insights basados en KPIs
- **Ejemplo**: Si consumo > 1000 kWh → sugerir optimización HVAC

#### Repositories
- **ChatContextRepository.js**: Guarda contexto del chat
- **EnergyRepository.js**: Obtiene datos energéticos
- **CompanyRepository.js**: Información de empresa
- **SubscriptionRepository.js**: Datos de suscripción

---

### 🎨 UI (Interfaz de Usuario)

#### `App.jsx`
- **Responsabilidad**: Componente raíz
- **Estado**:
  - `kpis`: Datos calculados del dashboard
  - `profile`: Tipo de perfil (industrial/residencial)
- **Distribución**:
  - Pasa `kpis` a `ChatbotWidget`
  - Pasa `profile` a `DashboardSection`

#### `DashboardSection.jsx`
- **Responsabilidad**: Orquestador principal de UI
- **Características**:
  - Maneja pestañas (Resumen, Consumo, Costos, etc.)
  - Control de modo pantalla completa
  - Cálculo de KPIs con `useMemo` para optimización
  - Usa `onKpisReady` para pasar datos a App

**Clave**: Usa `useMemo` para evitar re-renderizados innecesarios

#### `Dashboard.jsx`
- **Responsabilidad**: Gráficos e indicadores visuales
- **Componentes**:
  - `KPICard`: Tarjetas con métricas
  - Gráficos Recharts: Líneas, áreas, pastel
  - Sistema de alertas visual

#### `ChatbotWidget.jsx`
- **Responsabilidad**: Contenedor del chat
- **Flujo**:
  1. Inicializa con contexto (`sanitizeKpis`)
  2. Maneja historial de mensajes
  3. Renderiza `ChatbotPanel`

#### `ChatbotPanel.jsx`
- **Responsabilidad**: Lógica del chat
- **Validaciones**:
  - `safeKpis`: Asegura que números sean válidos
  - Try/catch para errores de API
- **Manejo de errores**: Evita que la app se bloquee si falla IA

#### `ChatInput.jsx`, `ChatMessage.jsx`
- Componentes presentacionales reutilizables

---

### 🔌 INFRASTRUCTURE (Capas Externas)

#### `ChatbotAIProvider.ts`
- **Responsabilidad**: Integración con API de IA externa
- **Métodos**:
  - `chat(message, context)`: Envía a la IA
  - Maneja timeouts y errores de conexión
- **Nota**: Reemplaza aquí con tu proveedor real (OpenAI, Anthropic, etc.)

#### `EnergyMockRepository.ts`
- **Responsabilidad**: Simular datos en desarrollo
- **Métodos**:
  - `generateSample(profile)`: Genera datos realistas
  - Diferencia entre Industrial y Residencial
- **Nota**: Reemplaza con API real cuando esté lista

---

## 🚀 Cómo Trabajar en el Código

### Setup Inicial
```bash
# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev

# Acceder a http://localhost:5173
```

### Desarrollo: Flujo Recomendado

#### 1️⃣ **Cambiar datos (sin tocar IA)**
- **Archivo**: `src/infraestructure/mock/EnergyMockRepository.ts`
- **Ejemplo**: Modificar perfiles de generación de datos
```js
// Cambiar amplitud de datos simulados
const baseConsumption = profile === 'industrial' ? 1500 : 500; // Modifica aquí
```

#### 2️⃣ **Agregar nueva métrica a KPIs**
- **Archivo 1**: `src/domain/services/EnergyMetricsService.ts`
  - Agregar cálculo en `calculateKPIs()`
- **Archivo 2**: `src/domain/types/energy.ts`
  - Agregar tipo TypeScript para la métrica
- **Archivo 3**: `src/ui/Dashboard.jsx`
  - Agregar `KPICard` con el nuevo dato

**Ejemplo**:
```tsx
// 1. Calcular en service
const newMetric = calculateNewThing(data);

// 2. Usar en Dashboard
<KPICard 
  title="Nueva Métrica"
  value={newMetric}
  icon={IconComponent}
/>
```

#### 3️⃣ **Agregar regla de IA (insight)**
- **Archivo**: `src/domain/chatbot/knowledge/energyInsights.ts`
- **Patrón**: Función pura que retorna string
```ts
export function suggestACOptimization(kpis) {
  if (kpis.powerFactor < 0.9) {
    return "Tu factor de potencia es bajo. Considera...";
  }
  return null;
}
```
- **Usar**: En `ChatController.ts`, integrar la regla

#### 4️⃣ **Conectar API real de IA**
- **Archivo**: `src/infraestructure/ai/ChatbotAIProvider.ts`
```ts
export async function chat(message, context) {
  // Reemplaza con tu API real
  const response = await fetch('https://api.openai.com/...', {
    method: 'POST',
    body: JSON.stringify({ message, context })
  });
  return response.json();
}
```

---

## 📈 Cómo Escalar el Proyecto

### 1. **Base de Datos Real**
```
domain/repositories/ → Conectar a BD en lugar de Mock
EnergyRepository.js → Llamar a `/api/energy` en lugar de generar datos
```

### 2. **Múltiples Usuarios / Autenticación**
```
Agregar: src/domain/services/AuthService.ts
- JWT tokens
- Gestión de sesiones
- Per-user data isolation
```

### 3. **Dashboard Personalizable**
```
Guardar layouts en BD:
- Qué gráficos mostrar
- Tamaños y posiciones
- Temas personalizados
```

### 4. **Alertas en Tiempo Real**
```
Agregar: WebSocket / Server-Sent Events
- Notificaciones push
- Actualización automática de KPIs
- Alertas instantáneas
```

### 5. **Exportación de Reportes**
```
Ya tiene dependencias (jsPDF, XLSX):
- Generar PDFs mensuales
- Exportar a Excel
- Programar reportes automáticos
```

### 6. **Análisis Predictivo**
```
Extender EnergyMetricsService:
- Predicción de consumo futuro (ML)
- Detección de anomalías
- Recomendaciones automáticas
```

### 7. **Integración con Dispositivos IoT**
```
Nueva capa: src/infraestructure/iot/
- MQTT para sensores
- WebSocket para datos en vivo
- Sincronización de datos
```

---

## 🛡️ Patrones de Código

### Manejo de Errores
```jsx
// ✅ BUENO: Try/catch en operaciones críticas
try {
  const response = await ChatbotAIProvider.chat(message, kpis);
  setMessages([...messages, response]);
} catch (error) {
  setError('Error al procesar mensaje');
  console.error(error);
}

// ❌ MALO: Sin manejo de errores
const response = ChatbotAIProvider.chat(message, kpis);
```

### Sanitización de Datos
```jsx
// ✅ BUENO: Validar antes de usar
const safeKpis = {
  cost: kpis?.cost ?? 0,
  consumption: kpis?.consumption ?? 0
};
const formatted = safeKpis.cost.toFixed(2);

// ❌ MALO: Asumir que existen
const formatted = kpis.cost.toFixed(2); // ¡Puede crashear!
```

### Optimización (useMemo)
```jsx
// ✅ BUENO: Memoizar cálculos caros
const kpis = useMemo(() => calculateKPIs(data), [data]);
const charts = useMemo(() => generateCharts(kpis), [kpis]);

// ❌ MALO: Recalcular en cada render
const kpis = calculateKPIs(data);
```

---

## 📦 Dependencias Principales

| Librería | Uso |
|----------|-----|
| **React 19** | Framework UI |
| **Vite** | Build tool y dev server |
| **Recharts** | Gráficos interactivos |
| **Tailwind CSS** | Estilos |
| **Lucide React** | Iconos |
| **jsPDF** | Generar PDFs |
| **XLSX** | Exportar a Excel |

---

## 🧪 Testing (Recomendado)

```bash
# Instalar testing libraries
npm install --save-dev vitest @testing-library/react @testing-library/jest-dom

# Crear test
# src/__tests__/EnergyMetricsService.test.js

import { calculateKPIs } from '../domain/services/EnergyMetricsService';

describe('EnergyMetricsService', () => {
  it('should calculate KPIs correctly', () => {
    const sample = { consumptionKwh: 100, powerFactor: 0.95 };
    const kpis = calculateKPIs([sample]);
    expect(kpis.estimatedCost).toBeGreaterThan(0);
  });
});
```

---

## 🚀 Scripts Disponibles

```bash
npm run dev      # Iniciar servidor de desarrollo
npm run build    # Compilar para producción
npm run preview  # Vista previa de build
npm run lint     # Ejecutar ESLint
```

---

## 💡 Tips para Escalabilidad

1. **Separación de Responsabilidades**: Cada archivo hace UNA cosa
2. **Types TypeScript**: Define tipos para evitar errores
3. **Memoización**: Usa `useMemo` y `useCallback` en componentes grandes
4. **Caching**: Almacena datos para evitar re-cálculos
5. **Lazy Loading**: Carga gráficos y secciones bajo demanda
6. **API Resilience**: Implementa reintentos y fallbacks
7. **Monitoreo**: Registra errores en servicio externo (Sentry, etc.)

---

## 📞 Soporte y Contribución

Para agregar features:
1. Crea rama: `git checkout -b feature/nueva-feature`
2. Sigue el patrón de capas (domain → infraestructure → ui)
3. Agrega types TypeScript
4. Prueba manualmente en dev
5. Push y abre PR
