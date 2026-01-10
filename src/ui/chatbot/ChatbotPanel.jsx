import { useState, useEffect, useRef } from 'react';
import { ChatMessage } from './ChatMessage';
import { ChatFlowService } from '../../domain/services/ChatFlowService';
import { ChatbotAIProvider } from '../../infraestructure/ai/ChatbotAIProvider';
import { LeadService } from '../../infraestructure/api/LeadService';

export const ChatbotPanel = () => {
  // --- 1. ESTADO DEL CHAT ---
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [inputMode, setInputMode] = useState("text"); // Siempre inicia en 'text' para que el input sea funcional
  const [isLoading, setIsLoading] = useState(false);
  
  const [leadData, setLeadData] = useState({ name: '', email: '' });
  
  const messagesEndRef = useRef(null);
  const scrollToBottom = () => messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  useEffect(scrollToBottom, [messages, isLoading]);
  const hasInitialized = useRef(false)

  // --- 2. INICIALIZACIÓN ---
  useEffect(() => {

    if (hasInitialized.current) return;

    const welcomeMsg = ChatFlowService.getNextStep('show_services'); 
    if (welcomeMsg) {
      addMessage('bot', welcomeMsg.text, welcomeMsg.options);
      hasInitialized.current = true;
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
    // A. Resetear chat
    if (value === 'reset') {
      setMessages([]);
      const welcome = ChatFlowService.getNextStep('show_services');
      addMessage('bot', welcome.text, welcome.options);
      setInputMode('text');
      return;
    }

    // B. Activar IA explícitamente (aunque el input ya funciona)
    if (value === 'mode_ai') {
      addMessage('bot', "Estoy listo. ¿Qué duda tienes sobre el monitoreo de Iotomato?");
      setInputMode('text');
      return;
    }

    // C. Iniciar Formulario de Lead
    if (value === 'start_lead_form') {
      addMessage('bot', "Excelente decisión. Para comenzar, ¿cuál es tu nombre?");
      setInputMode('name');
      return;
    }

    // D. Navegación de Flujo (Servicios)
    const response = ChatFlowService.getNextStep(value);
    if (response) {
      // Simulamos la respuesta del bot tras elegir una opción
      setTimeout(() => {
        addMessage('bot', response.text, response.options);
      }, 400);
    }
  };

  // --- 5. MANEJADOR DE TEXTO (Input) ---
  const handleInputSubmit = async (e) => {
    e.preventDefault();
    if (!inputValue.trim() || isLoading) return;

    const text = inputValue;
    setInputValue(""); 
    addMessage('user', text); 

    // CASO 1: Capturando Nombre
    if (inputMode === 'name') {
      setLeadData(prev => ({ ...prev, name: text }));
      addMessage('bot', `Mucho gusto, ${text}. Ahora, indícame tu correo electrónico para enviarte la información:`);
      setInputMode('email');
      return;
    }

    // CASO 2: Capturando Email
    if (inputMode === 'email') {
      if (!text.includes('@')) {
        addMessage('bot', "Por favor, introduce un correo electrónico válido (ejemplo@correo.com):");
        return;
      }
      
      setIsLoading(true);
      const finalData = { ...leadData, email: text };
      const success = await LeadService.saveLead(finalData);
      setIsLoading(false);

      if (success) {
        addMessage('bot', "¡Datos recibidos! Un asesor de Iotomato te contactará en breve para agendar la demo.", [
          { label: "Volver al inicio", value: "reset" },
          { label: "Tengo otra duda", value: "mode_ai" }
        ]);
        setInputMode('text'); // Regresamos a modo texto normal
      } else {
        addMessage('bot', "Lo siento, hubo un error. ¿Podrías intentar escribir tu correo de nuevo?");
      }
      return;
    }

    // CASO 3: IA (Pregunta libre - Modo por defecto)
    if (inputMode === 'text') {
      setIsLoading(true);
      const aiResponse = await ChatbotAIProvider.generateResponse(text, messages);
      setIsLoading(false);
      
      addMessage('bot', aiResponse, [
        { label: "Hablar con un asesor", value: "start_lead_form" },
        { label: "Ver servicios", value: "reset" }
      ]);
    }
  };

  // --- 6. RENDERIZADO ---
  return (
    <div className="flex flex-col h-full bg-white">
      {/* HEADER */}
      <div className="text-white p-4 flex justify-between items-center rounded-t-lg shadow-md" style={{ backgroundColor: '#DC0F1A' }}>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
          <h3 className="font-bold text-sm">Asistente Iotomato</h3>
        </div>
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
        
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-white border border-gray-200 text-gray-400 px-4 py-2 rounded-2xl rounded-tl-none text-xs flex gap-1 shadow-sm">
              <span className="animate-bounce">.</span>
              <span className="animate-bounce [animation-delay:0.2s]">.</span>
              <span className="animate-bounce [animation-delay:0.4s]">.</span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* ÁREA DE INPUT: SIEMPRE VISIBLE */}
      <form onSubmit={handleInputSubmit} className="p-3 border-t border-gray-200 bg-white">
        <div className="flex gap-2">
          <input
            type={inputMode === 'email' ? 'email' : 'text'}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder={
              inputMode === 'name' ? "Escribe tu nombre..." : 
              inputMode === 'email' ? "Escribe tu email..." : 
              "Haz una pregunta..."
            }
            className="flex-1 p-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 text-sm transition-all"
            style={{ '--tw-ring-color': '#DC0F1A' }}
            disabled={isLoading}
          />
          <button 
            type="submit" 
            disabled={isLoading || !inputValue.trim()}
            className="text-white p-2 rounded-xl disabled:bg-gray-300 transition-colors shadow-sm"
            style={{
              backgroundColor: isLoading || !inputValue.trim() ? undefined : '#DC0F1A'
            }}
            onMouseEnter={(e) => {
              if (!isLoading && inputValue.trim()) {
                e.currentTarget.style.backgroundColor = '#B00D16';
              }
            }}
            onMouseLeave={(e) => {
              if (!isLoading && inputValue.trim()) {
                e.currentTarget.style.backgroundColor = '#DC0F1A';
              }
            }}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
          </button>
        </div>
      </form>
    </div>
  );
};