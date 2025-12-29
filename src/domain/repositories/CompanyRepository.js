export interface CompanyRepository {
  getCompany(companyId: string): Promise<Company>
}
