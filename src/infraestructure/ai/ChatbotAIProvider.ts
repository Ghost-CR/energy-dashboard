import { ChatMessage } from "../../domain/types/chat";

export class ChatbotAIProvider {
  private static API_URL = "/api/chat";

  static async generateResponse(userQuery: string, history: ChatMessage[] = []): Promise<string> {
    // 1. Definimos el Manual de Iotomato (System Prompt)
    const SYSTEM_PROMPT = `
      Eres el Asesor Comercial de Iotomato.
      INFORMACIÓN DE LA EMPRESA:
      - Iotomato ofrece monitoreo energético inteligente mediante hardware IoT y software especializado.
      - Beneficios: Ahorro de costos, detección de fugas eléctricas y optimización del factor de potencia.
      - Clientes: Industrias, comercios y grandes residencias.
      
      REGLAS DE RESPUESTA:
      - Sé breve (máximo 3 oraciones).
      - No tienes acceso a los datos de consumo del usuario actual. Si preguntan, di que por seguridad solo pueden verse en el Dashboard.
      - Usa un tono profesional pero cercano.
    `;

    // 2. Preparamos la Memoria de Corto Plazo (últimos 4 mensajes)
    const recentHistory = history.slice(-4).map(msg => ({
      role: msg.role === 'user' ? 'user' : 'assistant',
      content: msg.text
    }));

    try {
      const response = await fetch(this.API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          model: "gpt-5.2",
          messages: [
            { role: "system", content: SYSTEM_PROMPT },
            ...recentHistory,
            { role: "user", content: userQuery }
          ],
          temperature: 0.5 // Equilibrio entre precisión y fluidez
        })
      });

      const data = await response.json();
      return data.choices[0].message.content;
    } catch (error) {
      console.error("Error en AIProvider:", error);
      return "Lo siento, tuve un problema al procesar tu duda. ¿Podrías intentar de nuevo?";
    }
  }
}