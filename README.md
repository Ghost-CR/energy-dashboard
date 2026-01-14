# Energy Dashboard & AI Assistant ⚡📊

Plataforma integral de monitoreo energético industrial desarrollada en React. Este proyecto combina una Landing Page corporativa, un Dashboard de visualización de datos y un Chatbot híbrido para la captación de leads y soporte.

## 🌟 Características Principales

- **Arquitectura en Capas**: Código organizado en UI, Dominio e Infraestructura.
- **Chatbot Híbrido**: Combina flujos de conversación predefinidos con respuestas generadas por IA.
- **Dashboard Interactivo**: Visualización de métricas clave con datos de demostración.
- **Captación de Leads**: Formulario integrado en el chatbot para guardar información de contacto.

---

## 🏗️ Arquitectura del Proyecto

El proyecto sigue una arquitectura en capas que separa responsabilidades, facilitando su mantenimiento y escalabilidad.

```
src/
├── domain/                    # 🧠 LÓGICA DE NEGOCIO Y TIPOS
│   ├── services/              # Orquestadores y lógica central
│   │   ├── ChatFlowService.ts       # Lógica para el flujo guiado del chatbot
│   │   ├── DashboardService.ts      # Orquesta la obtención de datos del dashboard
│   │   └── EnergyMetricsService.ts  # Realiza cálculos de KPIs (No implementado)
│   └── types/                 # Tipos de TypeScript para el dominio
│
├── infraestructure/           # 🔌 CONEXIONES CON EL EXTERIOR
│   ├── ai/
│   │   └── ChatbotAIProvider.ts     # Simula respuestas de una IA
│   ├── api/
│   │   └── LeadService.ts           # Simula el guardado de un lead en un backend
│   └── mock/
│       └── EnergyMockRepository.ts  # Genera datos falsos para el dashboard
│
└── ui/                        # 🎨 INTERFAZ DE USUARIO (React)
    ├── App.jsx                # Componente raíz y enrutador principal
    ├── Dashboard.jsx          # Visualización de gráficos y KPIs
    ├── chatbot/               # Componentes específicos del chatbot
    │   ├── ChatbotPanel.jsx   # Lógica y estado principal del chat
    │   ├── ChatbotWidget.jsx  # Contenedor del chatbot en la UI
    │   └── ChatMessage.jsx    # Muestra un mensaje individual
    ├── components/            # Componentes reutilizables (Header, Footer)
    └── sections/              # Secciones de la Landing Page (Hero, Benefits, etc.)
```

---

## 🔄 Flujos de Código

### Flujo General de la Aplicación

1.  **Inicio**: `main.jsx` renderiza el componente `App.jsx`.
2.  **Renderizado Principal**: `App.jsx` actúa como el componente central que muestra la `LandingPage` y el `ChatbotWidget` de forma persistente en toda la aplicación. No utiliza un enrutador tradicional como `react-router-dom`, sino que renderiza una única vista.
3.  **Componentes UI**: La `LandingPage` se compone de varias "secciones" (`Hero`, `Problem`, `DashboardSection`, etc.) que se renderizan secuencialmente.

### Flujo del Dashboard

El dashboard funciona con datos de demostración (mock) generados localmente.

1.  **Renderizado del Componente**: El usuario visualiza la sección del dashboard a través de `src/ui/sections/DashboardSection.jsx`.
2.  **Solicitud de Datos**: Dentro de `DashboardSection.jsx`, se llama al servicio `DashboardService.getDemoDashboard()`.
3.  **Orquestación**: `DashboardService` actúa como intermediario. Llama a `MockEnergyRepository.generateSample()` para obtener datos crudos simulados.
4.  **(Futuro) Procesamiento**: `DashboardService` debería pasar los datos a `EnergyMetricsService.calculateKPIs()` para convertirlos en métricas de negocio (actualmente este paso no está implementado).
5.  **Visualización**: Los datos procesados se devuelven a `DashboardSection.jsx`, que los pasa al componente `Dashboard.jsx` para renderizar los gráficos y tarjetas de KPI.

### Flujo del Chatbot

El chatbot tiene un funcionamiento híbrido que combina flujos predefinidos y respuestas de IA simuladas.

1.  **Interacción del Usuario**: El usuario interactúa con el chatbot a través del componente `src/ui/chatbot/ChatbotPanel.jsx`.

2.  **Flujo Guiado (Opciones y Botones)**:
    *   Cuando el usuario hace clic en una opción predefinida, `ChatbotPanel.jsx` llama a `ChatFlowService.getNextStep(optionId)`.
    *   `ChatFlowService` contiene un árbol de conversación definido en código (`flow.ts`) y devuelve el siguiente mensaje y las nuevas opciones según la selección.

3.  **Flujo de IA (Preguntas Abiertas)**:
    *   Cuando el usuario escribe una pregunta libre, `ChatbotPanel.jsx` llama a `ChatbotAIProvider.generateResponse(message)`.
    *   `ChatbotAIProvider` simula una llamada a un modelo de lenguaje, devolviendo una respuesta genérica después de un breve retardo para imitar una llamada de red.

4.  **Flujo de Captación de Leads**:
    *   En ciertos puntos del flujo guiado, el chatbot solicita el nombre y el correo del usuario.
    *   Una vez que `ChatbotPanel.jsx` recopila esta información, llama a `LeadService.saveLead(name, email)`.
    *   `LeadService` simula una llamada a una API externa, mostrando un mensaje de éxito en la consola sin realizar una petición de red real.

---

## 🚀 Cómo Iniciar el Proyecto

1.  **Instalar dependencias**:
    ```bash
    npm install
    ```
2.  **Iniciar el servidor de desarrollo**:
    ```bash
    npm run dev
    ```
3.  Abre [http://localhost:5173](http://localhost:5173) en tu navegador.