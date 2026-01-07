import { useEffect, useState, useMemo } from 'react';
import { ChatController } from '../../domain/services/chatbot/ChatController';
import ChatMessage from './ChatMessage';
import ChatInput from './ChatInput';

export default function ChatbotPanel({
    kpis,
    profile,
    onClose
}) {
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(false);

    // Garantizar que existan valores numéricos para evitar crash por .toFixed()
    const safeKpis = useMemo(() => ({
        monthlyConsumption: kpis?.monthlyConsumption ?? 0,
        // Mapeo de propiedades para compatibilidad con ChatController (Alias)
        totalConsumption: kpis?.totalConsumption ?? kpis?.monthlyConsumption ?? 0,
        energyEfficiency: kpis?.energyEfficiency ?? 0,
        efficiencyScore: kpis?.efficiencyScore ?? kpis?.energyEfficiency ?? 0,
        anomaliesDetected: kpis?.anomaliesDetected ?? 0,
        avgPowerFactor: kpis?.avgPowerFactor ?? 0,
        estimatedCost: kpis?.estimatedCost ?? 0,
        powerFactorStatus: kpis?.powerFactorStatus || "Desconocido",
        alerts: kpis?.alerts || []
    }), [kpis]);

      useEffect(() => {
  async function init() {
    try {
      const messages = await ChatController.handleMessage({
        userMessage: "Hola",
        profile: profile || "industrial",
        kpis: safeKpis,
        history: []
      })
      setMessages(messages)
    } catch (error) {
      console.error("Error inicializando el chatbot:", error);
    }
  }

  init()
}, [kpis, profile])

    //Enviar mensaje del usuario
const handleSend = async (text) => {
    if (!text.trim() || loading) return

    const userMessage = {
        id: crypto.randomUUID(),
        role: "user",
        type: "recommendation",
        text
    }

    setMessages(prev => [...prev, userMessage]);
    setLoading(true);

    try {
        const botReply = await ChatController.handleMessage({
            userMessage: text,
            history: [...messages, userMessage],
            kpis: safeKpis,
            profile: profile || "industrial"
        })

        setMessages(prev => [...prev, ...botReply]);
    } catch (error) {
        console.error("Error real del chatbot", error);

        setMessages(prev => [
            ...prev,
            {
                id: crypto.randomUUID(),
                role: "bot",
                type: "warning",
                text: "Ocurrió un error al procesar tu mensaje. Intenta de nuevo"
            }
        ])
    } finally {
        setLoading(false);
    }
}

return (
    <div className="w-full max-w-md h-[520px] bg-white rounded-xl shadow-xl flex flex-col border">
      
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b bg-gray-50 rounded-t-xl">
        <h3 className="font-semibold text-gray-800">
          Asistente energético iotomato
        </h3>
        {onClose && (
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            ✕
          </button>
        )}
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3 bg-gray-50">
        {messages.map(msg => (
          <ChatMessage key={msg.id} message={msg} />
        ))}

        {loading && (
          <div className="text-sm text-gray-500 italic">
            iotomato está escribiendo…
          </div>
        )}
      </div>

      {/* Input */}
      <ChatInput onSend={handleSend} disabled={loading} />
    </div>
  )
}