import { useState } from "react"
import { MessageCircle, X } from "lucide-react"
import ChatbotPanel from "./ChatbotPanel"

export default function ChatbotWidget({ kpis, profile }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      {/* Botón flotante */}
      <button
        onClick={() => setIsOpen(o => !o)}
        className="fixed bottom-6 right-6 z-[9999] bg-orange-600 hover:bg-orange-700 text-white p-4 rounded-full shadow-lg transition-all"
      >
        {isOpen ? <X size={22} /> : <MessageCircle size={22} />}
      </button>

      {/* Panel */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-[9999] w-[360px] max-w-[90vw]">
          <ChatbotPanel 
            kpis={kpis}
            profile={profile}
          onClose={() => setIsOpen(false)} 
          />
        </div>
      )}
    </>
  )
}

