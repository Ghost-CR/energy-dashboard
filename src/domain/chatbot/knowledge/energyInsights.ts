import type { EnergyKPIs} from "../../types/energy"

export function getEnergyInsights(kpis: EnergyKPIs): string[] {
    const insights: string[] = []

    //Factor de potencia
    if (kpis.powerFactorStatus === "bad") {
        insights.push(
            `El factor de potencia promedio es ${kpis.avgPowerFactor}. Esto puede generar penalizaciones económicas y pérdidas de eficiencia.`
        )
    }

    if (kpis.powerFactorStatus === "warning") {
        insights.push(
            `El factor de potencia promedio es (${kpis.avgPowerFactor}). Con pequeñas mejoras podrías optimizar los costos.`
        )
    }


    //Consumo total
    if (kpis.totalConsumption > 10000) {
        insights.push(
            `El consumo total registrado es ${kpis.totalConsumption} kWh. Existen oportunidades para reducir el consumo energético.`
        )
    }

    //Alertas
    if (kpis.alerts.length > 0) {
        kpis.alerts.forEach(alert => {
            insights.push(alert.message)
        })
    }

    //Eficiencia
    if (kpis.efficiencyScore < 70) {
        insights.push(
            `El score de eficiencia es ${kpis.efficiencyScore}%. La mejora de este indicador puede traducirse en ahorros directos.`
        )
    }

    return insights
}

