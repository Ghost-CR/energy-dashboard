import { useState } from 'react';
import { Send } from "lucide-react";

export default function ChatInput({ onSend, disabled }) {
    const [input, setInput] = useState("");

    const handleSend = () => {
        if (!input.trim() || disabled) return
        onSend(input.trim());
        setInput("");
    }
     const handleKeyDown = (e) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
     }

  return (
    <div className="border-t bg-white p-3 flex items-center gap-2">
      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        rows={1}
        placeholder="Escribí tu pregunta…"
        className="flex-1 resize-none rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 disabled:bg-gray-100"
        disabled={disabled}
      />
      <button
        onClick={handleSend}
        disabled={disabled}
        className="bg-orange-600 hover:bg-orange-700 text-white p-2 rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <Send size={16} />
      </button>
    </div>
  )
}