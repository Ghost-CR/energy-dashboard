import { EnergySample } from "../types/energy.ts"

interface KPIsConfig {
    pricePerKWh?: number
    idealPowerFactor?: number
}

interface KPIsResult {
    totalConsumption: number
    estimatedCost: number
    avgPowerFactor: number
    powerFactorStatus: "good" | "warning" | "bad"
}

export class EnergyMetricsService {
    static calculateKPIs(
        sample: EnergySample[], config: KPIsConfig = {}): KPIsResult {
        const {
            pricePerKWh = 0.15,
            idealPowerFactor = 0.95
        } = config

        //Consumo total
        const totalConsumption = sample.reduce (
            (acc, s) => acc + s.consumption, 
            0
        )

        //Costo estimado
        const estimatedCost = totalConsumption * pricePerKWh

        //Factor de potencia promedio
        const avgPowerFactor = 
            sample.reduce((acc ,s) => acc + s.powerFactor, 0) /
            sample.length

        //Interpretacion del factor potencia
        let powerFactorStatus = "good"
        if (avgPowerFactor < 0.85) powerFactorStatus = "bad"
        else if (avgPowerFactor < idealPowerFactor) powerFactorStatus = "warning"

        //Score de eficiencia
        const efficiencyScore = Math.round(avgPowerFactor * 100)

        //Alertas simples
        const alerts = []

        if (powerFactorStatus === "bad") {
            alerts.push({
                type: "power-factor",
                level: "critial",
                message: "Factor potencia bajo. Posibles penalizaciones"
            })
            }

        const highTHD = samples.some(s => s.thd > 8)
        if (highTHD) {
            alerts.push({
                type: "harmonics",
                level: "warning",
                message: "Distorsión armónica elevata detectada."
            })
        }

        return {
            totalConsumption,
            estimatedCost,
            efficiencyScore,
            avgPowerFactor: Number(avgPowerFactor.toFixed(2)),
            powerFactorStatus,
            alerts
        }
    }
}