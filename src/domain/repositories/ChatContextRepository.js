export interface ChatContextRepository {
  getContext(companyId: string): Promise<ChatContext>
}
