// src/infrastructure/api/LeadService.ts
import { LeadData } from "../../domain/types/chat";

export class LeadService {
  /**
   * Envía los datos del prospecto al servidor.
   */
  static async saveLead(data: LeadData): Promise<boolean> {
    try {
      console.log("🚀 Enviando Lead a la base de datos:", data);

      // Simulación de llamada API
      // const response = await fetch('https://tu-api.com/leads', {
      //   method: 'POST',
      //   body: JSON.stringify(data)
      // });
      
      // Simulamos latencia de red de 1 segundo
      await new Promise(resolve => setTimeout(resolve, 1000));

      return true; // Éxito
    } catch (error) {
      console.error("❌ Error al guardar el lead:", error);
      return false;
    }
  }
}