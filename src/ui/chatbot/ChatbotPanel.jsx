import React, { useState, useEffect, useRef } from 'react';
import { ChatMessage } from './ChatMessage';
import { ChatFlowService } from '../../domain/services/ChatFlowService';
import { ChatbotAIProvider } from '../../infraestructure/ai/ChatbotAIProvider';
import { LeadService } from '../../infraestructure/api/LeadService';

export const ChatbotPanel = () => {
  // --- 1. ESTADO DEL CHAT ---
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [inputMode, setInputMode] = useState("disabled"); // 'disabled' | 'text' | 'name' | 'email'
  const [isLoading, setIsLoading] = useState(false);
  
  // Datos temporales del formulario
  const [leadData, setLeadData] = useState({ name: '', email: '' });
  
  // Auto-scroll al final
  const messagesEndRef = useRef(null);
  const scrollToBottom = () => messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  useEffect(scrollToBottom, [messages, isLoading]);

  // --- 2. INICIALIZACIÓN ---
  useEffect(() => {
    // Cargamos el mensaje de bienvenida del servicio de flujo
    // Nota: Asegúrate de tener una key 'start' o 'welcome' en tu ChatFlowService, 
    // o llama directamente a la primera opción.
    const welcomeMsg = ChatFlowService.getNextStep('show_services'); 
    if (welcomeMsg) {
      addMessage('bot', welcomeMsg.text, welcomeMsg.options);
    }
  }, []);

  // --- 3. HELPERS ---
  const addMessage = (role, text, options = null) => {
    setMessages(prev => [...prev, { 
      id: Date.now().toString(), 
      role, 
      text, 
      options 
    }]);
  };

  // --- 4. MANEJADOR DE CLICS (Botones) ---
  const handleOptionClick = async (value) => {
    // A. Lógica de Navegación (Botones "Volver" o Flujos)
    if (value === 'reset') {
      setMessages([]);
      const welcome = ChatFlowService.getNextStep('show_services');
      addMessage('bot', welcome.text, welcome.options);
      setInputMode('disabled');
      return;
    }

    // B. Lógica de Activación de IA
    if (value === 'mode_ai') {
      addMessage('bot', "Estoy listo. Escribe tu consulta sobre eficiencia energética:");
      setInputMode('text');
      return;
    }

    // C. Lógica de Formulario (Lead Gen)
    if (value === 'start_lead_form') {
      addMessage('bot', "Excelente. Para agendar, primero necesito tu nombre:");
      setInputMode('name');
      return;
    }

    // D. Flujo Estándar (Navegación por árbol)
    const response = ChatFlowService.getNextStep(value);
    if (response) {
      addMessage('user', response.selectedLabel || "Opción seleccionada"); // Opcional: mostrar lo que eligió el usuario
      // Pequeño delay para naturalidad
      setTimeout(() => {
        addMessage('bot', response.text, response.options);
      }, 400);
    }
  };

  // --- 5. MANEJADOR DE TEXTO (Input) ---
  const handleInputSubmit = async (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const text = inputValue;
    setInputValue(""); // Limpiar input
    addMessage('user', text); // Mostrar mensaje del usuario

    // CASO 1: Formulario (Nombre)
    if (inputMode === 'name') {
      setLeadData(prev => ({ ...prev, name: text }));
      addMessage('bot', `Gracias ${text}. Ahora, por favor escribe tu correo electrónico:`);
      setInputMode('email');
      return;
    }

    // CASO 2: Formulario (Email)
    if (inputMode === 'email') {
      // Validación simple de email
      if (!text.includes('@')) {
        addMessage('bot', "El correo no parece válido. Por favor intenta de nuevo:");
        return;
      }
      
      setIsLoading(true);
      const finalData = { ...leadData, email: text };
      
      // Llamada al servicio de infraestructura
      const success = await LeadService.saveLead(finalData);
      setIsLoading(false);

      if (success) {
        addMessage('bot', "¡Listo! Un asesor te contactará pronto.", [
          { label: "Volver al inicio", value: "reset" }
        ]);
        setInputMode('disabled');
      } else {
        addMessage('bot', "Hubo un error guardando tus datos. Inténtalo más tarde.");
      }
      return;
    }

    // CASO 3: IA (Pregunta libre)
    if (inputMode === 'text') {
      setIsLoading(true);
      // Llamamos a la capa de infraestructura (OpenAI)
      const aiResponse = await ChatbotAIProvider.generateResponse(text, messages);
      setIsLoading(false);
      
      addMessage('bot', aiResponse, [
        { label: "Hacer otra pregunta", value: "mode_ai" },
        { label: "Volver al menú", value: "reset" }
      ]);
      // Opcional: Volver a bloquear input o dejarlo abierto
      // setInputMode('disabled'); 
    }
  };

  // --- 6. RENDERIZADO ---
  return (
    <div className="flex flex-col h-full bg-white">
      {/* HEADER */}
      <div className="bg-blue-900 text-white p-4 flex justify-between items-center rounded-t-lg">
        <h3 className="font-bold">Asistente Iotomato</h3>
        {/* Aquí podrías poner el botón de cerrar si recibes onClose como prop */}
      </div>

      {/* ÁREA DE MENSAJES */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
        {messages.map((msg) => (
          <ChatMessage 
            key={msg.id} 
            message={msg} 
            onOptionClick={handleOptionClick} 
          />
        ))}
        
        {/* Indicador de carga */}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-gray-200 text-gray-500 px-3 py-2 rounded-lg text-sm animate-pulse">
              Escribiendo...
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* ÁREA DE INPUT (Integrada) */}
      {inputMode !== 'disabled' && (
        <form onSubmit={handleInputSubmit} className="p-3 border-t border-gray-200 bg-white rounded-b-lg">
          <div className="flex gap-2">
            <input
              type={inputMode === 'email' ? 'email' : 'text'}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder={inputMode === 'name' ? "Tu nombre..." : inputMode === 'email' ? "Tu correo..." : "Escribe tu duda..."}
              className="flex-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              autoFocus
            />
            <button 
              type="submit" 
              disabled={isLoading}
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 disabled:bg-gray-400 transition-colors"
            >
              Enviar
            </button>
          </div>
        </form>
      )}
    </div>
  );
};