// src/services/ChatFlowService.ts
import { ChatMessage, ChatOption } from "../types/chat";

export const ChatFlowService = {
  /**
   * Obtiene el siguiente paso del flujo basado en el valor de la opción seleccionada.
   * Retorna un objeto que cumple con la interfaz ChatMessage (parcialmente).
   */
  getNextStep: (value: string): Partial<ChatMessage> | null => {
    // Definimos el diccionario de flujos usando el tipo ChatOption internamente
    const flows: Record<string, { text: string; options?: ChatOption[] }> = {
      'show_services': {
        text: "Ofrecemos soluciones adaptadas a tu sector. ¿Qué tipo de instalación te interesa monitorear?",
        options: [
          { label: "Industrial 🏭", value: "srv_industrial" },
          { label: "Comercial / Residencial 🏢", value: "srv_commercial" }
        ]
      },

      'srv_industrial': {
        text: "En industrias nos enfocamos en: \n• Optimización del Factor de Potencia.\n• Detección de armónicos y fugas.\n• Alertas de sobreconsumo en maquinaria.",
        options: [
          { label: "📅 Agendar Demo", value: "start_lead_form" },
          { label: "🔙 Volver", value: "reset" }
        ]
      },

      'srv_commercial': {
        text: "Para comercios ayudamos a reducir la factura eléctrica detectando consumos fantasma y optimizando el uso de aire acondicionado.",
        options: [
          { label: "📅 Agendar Demo", value: "start_lead_form" },
          { label: "🔙 Volver", value: "reset" }
        ]
      },

      'mode_ai': {
        text: "¡Claro! Soy experto en eficiencia energética. Pregúntame lo que quieras sobre cómo Iotomato puede ayudarte a ahorrar.",
        options: [
          { label: "🔙 Volver al menú", value: "reset" }
        ]
      }
    };

    return flows[value] || null;
  }
};