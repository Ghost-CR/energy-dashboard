export default function ChatMessage({ message }) {
    const { role, type, text } = message;

    const isUser = role === "user"

    const baseStyle =
    "max-w-[85%] px-4 py-2 rounded-lg text-sm leading-relaxed shadow-sm"

    const roleStyle = isUser
    ? "bg-orange-600 text-white self-end rounded-br-none"
    : "bg-white text-gray-800 self-start rounded-bl-none border"

    const typeStyle = {
    insight: "border-l-4 border-blue-400",
    warning: "border-l-4 border-red-500 bg-red-50",
    recommendation: "border-l-4 border-green-500",
    sales: "border-l-4 border-orange-400"
  }[type] || ""

   return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div className={`${baseStyle} ${roleStyle} ${typeStyle}`}>
        {!isUser && (
          <p className="text-[10px] uppercase font-semibold text-gray-400 mb-1">
            {labelByType(type)}
          </p>
        )}
        <p>{text}</p>
      </div>
    </div>
  )
}

function labelByType(type) {
    switch (type) {
        case "insight":
            return "Insight energético";
        case "warning":
            return "Advertencia";
        case "recommendation":
            return "Recomendación";
        case "sales":
            return "Sugerencia";
        default:
            return "Mensaje";
    } 
}