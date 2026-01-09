export const ChatMessage = ({ message, onOptionClick }) => {
  const isBot = message.role === 'bot';

  return (
    <div className={`flex ${isBot ? 'justify-start' : 'justify-end'} mb-4 w-full`}>
      <div 
        className={`max-w-[85%] p-3 rounded-2xl shadow-sm ${
          isBot 
            ? 'bg-white border border-gray-200 text-gray-800 rounded-tl-none' 
            : 'bg-blue-600 text-white rounded-tr-none'
        }`}
      >
        {/* Cuerpo del mensaje */}
        <div className="text-sm leading-relaxed whitespace-pre-wrap">
          {message.text}
        </div>

        {/* Renderizado de Botones (Opciones) */}
        {isBot && message.options && message.options.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-2">
            {message.options.map((option) => (
              <button
                key={option.value}
                onClick={() => onOptionClick(option.value)}
                className="bg-blue-50 border border-blue-200 text-blue-700 px-4 py-1.5 rounded-full text-xs font-medium hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-all duration-200 active:scale-95"
              >
                {option.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};