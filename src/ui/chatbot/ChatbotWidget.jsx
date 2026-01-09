import { useState } from 'react';
import { ChatbotPanel } from './ChatbotPanel';

export const ChatbotWidget = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
  <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
    {/* Panel del Chat (Condicional) */}
    {isOpen && (
      <div className="mb-4 w-[350px] h-[500px] shadow-2xl rounded-xl overflow-hidden border-2 border-gray-200 bg-white">
        <ChatbotPanel />
      </div>
    )}

    {/* Botón Flotante (Trigger) */}
    <button
      onClick={() => setIsOpen(!isOpen)}
      className={`p-4 rounded-full shadow-xl transition-all duration-300 flex items-center justify-center ${
        isOpen ? 'bg-gray-200 rotate-90' : 'hover:scale-110'
      }`}
      style={!isOpen ? { 
        backgroundColor: '#DC0F1A',
        boxShadow: '0 10px 40px rgba(220, 15, 26, 0.4)'
      } : {}}
      onMouseEnter={(e) => {
        if (!isOpen) {
          e.currentTarget.style.backgroundColor = '#B00D16';
        }
      }}
      onMouseLeave={(e) => {
        if (!isOpen) {
          e.currentTarget.style.backgroundColor = '#DC0F1A';
        }
      }}
    >
      {isOpen ? (
        // Icono de Cerrar (X)
        <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      ) : (
        // Icono de Chat (Burbuja)
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
        </svg>
      )}
    </button>
  </div>
);
};