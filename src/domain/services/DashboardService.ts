import { MockEnergyRepository } from "../../infraestructure/mock/EnergyMockRepository";
import { EnergyMetricsService } from "./EnergyMetricsService";

export class DashboardService {
    static getDemoDashboard(profile: "industrial" | "non-industrial") {
        // 1. Obtener datos crudos
        const samples = MockEnergyRepository.generateSample(profile);

        //Calcular KPIs
        const kpis = EnergyMetricsService.calculateKPIs(samples);

        //Preparar objeto final para el UI
        return {
            kpis,
            timeseries: samples.map(s => ({
                timestamp: s.timestamp,
                consumptionKwh: s.consumptionKwh
            })),
            meta: {
                profile,
                sampleCount: samples.length
            }
        }
    }
}