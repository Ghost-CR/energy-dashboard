export interface ChatMessage {
  id: string
  role: "bot" | "user"
  type: "insight" | "warning" | "recommendation" | "sales"
  text: string
}