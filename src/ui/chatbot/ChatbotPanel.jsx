import { useEffect, useState } from 'react';
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

      useEffect(() => {
        if (!kpis || !profile) {
        console.warn("Inicializando chatbot con perfil y KPIs", { profile, kpis })
        return
        }
  async function init() {
    const messages = await ChatController.handleMessage({
      userMessage: "Hola",
      profile,
      kpis,
      history: []
    })
    setMessages(messages)
  }

  init()
}, [kpis, profile])

    //Enviar mensaje del usuario
const handleSend = async (text) => {
    if (!text.trim() || loading) return
    if (!kpis || !profile) {
    console.warn("Mensaje bloqueado: KPIs o perfil no disponibles")
    return
  }

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
            kpis,
            profile
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

if (!kpis || !profile) {
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
}