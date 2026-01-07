export class ChatbotAIProvider {
  static async generateResponse(prompt: string): Promise<string> {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${import.meta.env.VITE_CHATBOT_API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-5.2",
        messages: [{ role: "user", content: prompt }],
        temperature: 0.4
      })
    })

    const data = await response.json()
    return data.choices[0].message.content
  }
}
