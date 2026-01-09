export const ChatMessage = ({ message, onOptionClick }) => {
  const isBot = message.role === 'bot';

  return (
  <div className={`flex ${isBot ? 'justify-start' : 'justify-end'} mb-4 w-full`}>
    <div 
      className={`max-w-[85%] p-3 rounded-2xl shadow-sm ${
        isBot 
          ? 'bg-white border-2 border-gray-200 text-gray-800 rounded-tl-none' 
          : 'text-white rounded-tr-none'
      }`}
      style={!isBot ? { backgroundColor: '#DC0F1A' } : {}}
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
              className="border-2 px-4 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 active:scale-95"
              style={{
                backgroundColor: 'rgba(220, 15, 26, 0.05)',
                borderColor: '#DC0F1A',
                color: '#DC0F1A'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#DC0F1A';
                e.currentTarget.style.color = '#FFFFFF';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(220, 15, 26, 0.05)';
                e.currentTarget.style.color = '#DC0F1A';
              }}
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