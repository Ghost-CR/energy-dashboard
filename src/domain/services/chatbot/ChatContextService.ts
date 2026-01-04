// Este es el cerebro del bot
import { EnergyKPIs, EnergyProfile } from "../../types/energy";
import { ChatMessage } from "../../types/chat";
import { getEnergyInsights } from "../../chatbot/knowledge/energyInsights";
import { getSalesGuidance } from "../../chatbot/knowledge/salesGuidance";

export class ChatContextService {
    static buildContext(
        kpis: EnergyKPIs,
        profile: EnergyProfile
    ): ChatMessage[] {
        const messages: ChatMessage[] = []

        // Insights técnicos
        getEnergyInsights(kpis).forEach(text => {
            messages.push({
                id: crypto.randomUUID(),
                role: "bot",
                type: "insight",
                text   
            })
        })
        
        //Recomendaciones de ventas
        getSalesGuidance(kpis, profile).forEach(text => {
            messages.push({
                id: crypto.randomUUID(),
                role: "bot",
                type: "sales",
                text
            })
        })

        return messages
    }
}