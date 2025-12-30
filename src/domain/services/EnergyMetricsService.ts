import { EnergySample, EnergyKPIs, Alert } from "../types/energy"

interface KPIsConfig {
  pricePerKwh?: number
  idealPowerFactor?: number
}

export class EnergyMetricsService {
  static calculateKPIs(
    samples: EnergySample[],
    config: KPIsConfig = {}
  ): EnergyKPIs {
    const {
      pricePerKwh = 0.15,
      idealPowerFactor = 0.95
    } = config

    // 1️⃣ Consumo total
    const totalConsumption = samples.reduce(
      (acc, s) => acc + s.consumptionKwh,
      0
    )

    // 2️⃣ Costo estimado
    const estimatedCost = totalConsumption * pricePerKwh

    // 3️⃣ Factor de potencia promedio
    const avgPowerFactor =
      samples.length > 0
        ? samples.reduce((acc, s) => acc + s.powerFactor, 0) / samples.length
        : 0

    // 4️⃣ Interpretación del factor de potencia
    let powerFactorStatus: EnergyKPIs["powerFactorStatus"] = "good"
    if (avgPowerFactor < 0.85) powerFactorStatus = "bad"
    else if (avgPowerFactor < idealPowerFactor) powerFactorStatus = "warning"

    // 5️⃣ Score de eficiencia
    const efficiencyScore = Math.round(avgPowerFactor * 100)

    // 6️⃣ Alertas
    const alerts: Alert[] = []

    if (powerFactorStatus === "bad") {
      alerts.push({
        type: "power-factor",
        level: "critical",
        message: "Factor de potencia bajo. Posibles penalizaciones."
      })
    }

    const highTHD = samples.some(s => s.thd > 8)
    if (highTHD) {
      alerts.push({
        type: "harmonics",
        level: "warning",
        message: "Distorsión armónica elevada detectada."
      })
    }

    return {
      totalConsumption,
      estimatedCost,
      avgPowerFactor: Number(avgPowerFactor.toFixed(2)),
      efficiencyScore,
      powerFactorStatus,
      alerts
    }
  }
}
