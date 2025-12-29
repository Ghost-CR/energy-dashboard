export interface EnergyRepository {
  getLiveMetrics(companyId: string): Promise<EnergyMetrics>
  getHistoricalMetrics(companyId: string, range: TimeRange): Promise<EnergySample[]>
}
