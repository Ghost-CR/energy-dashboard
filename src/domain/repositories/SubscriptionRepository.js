export interface SubscriptionRepository {
  getSubscription(companyId: string): Promise<Subscription>
}
