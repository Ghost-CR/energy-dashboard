import { EnergyKPIs, EnergyProfile } from "../../types/energy";

export function getSalesGuidance(
    kpis: EnergyKPIs,
    profile: EnergyProfile
): string[] {
    const messages: string[] = [];

    //Casi 1: Perfil industrial con problemas técnicos
    if (profile === "industrial") {
        if (kpis.powerFactorStatus === "bad") {
            messages.push(
                "En instalaciones industriales como la tuya, un bajo factor de potencia suele generar penalizaciones en la factura eléctrica."
            )
            messages.push(
                "Con una solución de monitoreo continuo como iotomato, es posible detectar estos problemas en tiempo real y corregirlos antes de que impacten en los costos."
            )
        }

        if (kpis.alerts.some(alert => alert.type === "harmonics")) {
            messages.push(
                "La distorsión armónica detectada puede afectar equipos sensibles y reducir su vida útil."
            )
            messages.push(
                "Nuestros sistemas permiten identificar estas anomalías y tomar decisiones preventivas."
            )
        }
    }
        //caso 2: Perfil no industrial
        if (profile === "non-industrial") {
            if (kpis.efficiencyScore > 85) {
                messages.push(
                    "Tu consumo energético podría mejorar sin afectar la operación diaria."
                )
                messages.push(
                    "Iotomato ayuda a visualizar patrones de consumo y detectar oportunidades de ahorro de forma sencilla."
                )
            }
        }

        //Caso 3: Mensaje general de cierre (solo si hay algún problema)
        if (
            kpis.powerFactorStatus === "bad" ||
            kpis.alerts.length > 0 ||
            kpis.efficiencyScore < 85
        ) {
            messages.push(
                "Si quieres, puedo mostrarte cómo una solución como iotomato se adapta a tu caso específico."
            )
        }
    return messages;
}