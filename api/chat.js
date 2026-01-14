export default async function handler(req, res) {
  // Solo permitimos solicitudes POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { messages, model } = req.body;

    // Llamada segura a OpenAI desde el servidor
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // Vercel leerá esta variable de entorno del servidor
        "Authorization": `Bearer ${process.env.VITE_CHATBOT_API_KEY}`
      },
      body: JSON.stringify({
        model: model || "gpt-3.5-turbo",
        messages: messages,
        temperature: 0.5
      })
    });

    const data = await response.json();
    return res.status(200).json(data);

  } catch (error) {
    console.error("Error en Vercel Function:", error);
    return res.status(500).json({ error: 'Error interno del servidor' });
  }
}