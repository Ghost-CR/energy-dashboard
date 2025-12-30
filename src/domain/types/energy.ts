export type EnergyMetrics = {
  consumption: number
  voltage: number
  current: number
  powerFactor: number
  thd: number
}

export type TimeRange = {
  from: Date
  to: Date
}

// Tipos base del dominio energético

export interface EnergySample {
  timestamp: string
  consumptionKwh: number
  voltage: number
  current: number
  powerFactor: number
  thd: number
}

// Tipos de alertas permitidos
export type AlertType = "power-factor" | "harmonics"
export type AlertLevel = "warning" | "critical"
//Perfil de cliente
export type EnergyProfile = "industrial" | "non-industrial"

export interface Alert {
  type: AlertType
  level: AlertLevel
  message: string
}

// Resultado final de KPIs
export interface EnergyKPIs {
  totalConsumption: number
  estimatedCost: number
  avgPowerFactor: number
  efficiencyScore: number
  powerFactorStatus: "good" | "warning" | "bad"
  alerts: Alert[]
}

