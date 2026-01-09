import { useState } from 'react';
import { ChatbotPanel } from './ChatbotPanel';

export const ChatbotWidget = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {/* Panel del Chat (Condicional) */}
      {isOpen && (
        <div className="mb-4 w-[350px] h-[500px] shadow-2xl rounded-lg overflow-hidden border border-gray-200">
          <ChatbotPanel />
        </div>
      )}

      {/* Botón Flotante (Trigger) */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`p-4 rounded-full shadow-lg transition-all duration-300 flex items-center justify-center ${
          isOpen ? 'bg-gray-200 rotate-90' : 'bg-blue-900 hover:bg-blue-800'
        }`}
      >
        {isOpen ? (
          // Icono de Cerrar (X)
          <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="6 18L18 6M6 6l12 12" />
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