export type EnergyMetrics = {
  consumption: number
  voltage: number
  current: number
  powerFactor: number
  thd: number
}

export type EnergySample = {
  timestamp: Date
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
