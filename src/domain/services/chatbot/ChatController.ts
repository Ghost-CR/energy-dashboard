//Cerebro IA del chatbot
import { EnergyKPIs, EnergyProfile } from '../../types/energy'
import { ChatMessage } from '../../types/chat'
import { ChatContextService } from './ChatContextService'
import { ChatbotAIProvider } from '../../../infraestructure/ai/ChatbotAIProvider'

interface ChatControllerInput {
    userMessage: string
    profile: EnergyProfile
    kpis: EnergyKPIs
    history: ChatMessage[]
}

export class ChatController {
    static async handleMessage({
        userMessage,
        kpis,
        profile,
        history
}: ChatControllerInput): Promise<ChatMessage[]> {
    const responses: ChatMessage[] = []

    //Registrar mensaje de usuario
    responses.push({
        id: crypto.randomUUID(),
        role: "user",
        type: "recommendation",
        text: userMessage
    })

    //Generar contexto base desde KPIs (reglas duras)
    const contextMessages = ChatContextService.buildContext(kpis, profile)
    responses.push(...contextMessages)

    //Preparar prompt para IA
    const aiPrompt = ChatController.buildAIPrompt({
        userMessage,
        kpis,
        profile,
        contextMessages,
        history
    })

    //Llamar a IA
    try {
        const aiResponse = await ChatbotAIProvider.generateResponse(aiPrompt)

        responses.push({
            id: crypto.randomUUID(),
            role: "bot",
            type: "recommendation",
            text: aiResponse
        })
    } catch (error) {
        console.error("Error al conectar con la IA:", error)
        responses.push({
            id: crypto.randomUUID(),
            role: "bot",
            type: "warning",
            text: "Lo siento, tengo problemas para conectar con mi cerebro digital en este momento. ¿Podrías intentar de nuevo?"
        })
    }

    return responses
}

//Prompt engineering
    private static buildAIPrompt({
        userMessage,
        kpis,
        profile,
        contextMessages,
        history
    }: {
        userMessage: string
        kpis: EnergyKPIs
        profile: EnergyProfile
        contextMessages: ChatMessage[]
        history: ChatMessage[]
    }): string {
        return `
    Eres un asistente experto en gestión energética y consultoría comercial de iotomato.

    OBJETIVO:
    - Convertir datos energéticos complejos en información clara y accionable
    - Guiar al usuario hacia una solución profesional de monitoreo energético

    CONTEXTO DEL DASHBOARD:
    - Consumo total: ${kpis.totalConsumption} kWh
    - Costo estimado: $${kpis.estimatedCost.toFixed(2)}
    - Factor de potencia promedio: ${kpis.avgPowerFactor}
    - Score de eficiencia: ${kpis.efficiencyScore}%
    - Perfil del cliente: ${profile}

    INSIGHTS PREVIOS:
    ${contextMessages.map(m => `- ${m.text}`).join("\n")}

    HISTORIAL RECIENTE:
    ${history.slice(-5).map(m => `${m.role}: ${m.text}`).join("\n")}

    MENSAJE DEL USUARIO:
    "${userMessage}"

    INSTRUCCIONES:
    - Responde de forma clara, profesional y cercana
    - Usa ejemplos prácticos
    - Evita respuestas genéricas
    - Si hay oportunidades de mejora, menciona cómo iotomato puede ayudar
    - No inventes datos que no estén en el contexto
    `
  }
}