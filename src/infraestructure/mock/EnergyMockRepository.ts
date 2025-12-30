import { EnergySample, EnergyProfile } from "../../domain/types/energy"

export class MockEnergyRepository {
    static generateSample(
        profile: EnergyProfile,
        count = 24
    ): EnergySample[] {
        const samples: EnergySample[] = []

        for (let i = 0; i < count; i++) {
            const baseConsumption =
                profile === "industrial" ? 120 : 40

            const variation =
                profile === "industrial"
                ? Math.random() * 40
                : Math.random() * 15

            samples.push({
                timestamp: new Date(
                    Date.now() - i * 3600_000 
                ).toISOString(),

                consumptionKwh: baseConsumption + variation,

                voltage: 220 + Math.random() * 5,

                current:
                profile === "industrial"
                    ? 80 + Math.random() * 20
                    : 20 + Math.random() * 10,

                powerFactor:
                profile === "industrial"
                    ? 0.78 + Math.random() * 0.15
                    : 0.9 + Math.random() * 0.08,

                thd:
                profile === "industrial"
                    ? 6 + Math.random() * 6
                    : 2 + Math.random() * 3
            })
    }

    return samples
}
}