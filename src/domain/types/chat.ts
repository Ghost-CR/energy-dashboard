//Roles de los participantes en el chat
export type ChatRole = 'user' | 'bot';
//Modos de entrada para el chat
export type InputMode = 'disabled' | 'text' | 'form';
//Pasos para el formulario
export type FormStep = 'name' | 'email' | null;

export interface ChatOption {
  label: string; // Lo que ve el usuario en el botón
  value: string; //Lo que provesa ChatFlowService
}

export interface ChatMessage {
  id: string;
  role: ChatRole;
  text: string;
  options?: ChatOption[]; //Solo si el mensaje requiere botones
}

export interface LeadData {
  name: string;
  email: string;
}