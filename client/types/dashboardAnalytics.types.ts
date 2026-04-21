export interface VendorDashboardAnalyticsResponse {
  revenue: number;
  orders: {
    total: number;
    completed: number;
    pending: number;
    cancelled: number;
  };
  products: {
    total: number;
    approved: number;
    pendingApproval: number;
    rejected: number;
  };
  customers: {
    total: number;
    onCampus: number;
    offCampus: number;
  };
}
