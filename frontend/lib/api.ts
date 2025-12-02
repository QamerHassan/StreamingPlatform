// API Configuration
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5181';

// API Endpoints
export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: `${API_BASE_URL}/api/Auth/login`,
    REGISTER: `${API_BASE_URL}/api/Auth/register`,
  },
  CONTENT: {
    GET_ALL: `${API_BASE_URL}/api/content`,
    GET_BY_ID: (id: string | number) => `${API_BASE_URL}/api/content/${id}`,
  },
  PAYMENT: {
    CREATE_CHECKOUT: `${API_BASE_URL}/api/payment/create-checkout-session`,
    GET_SUBSCRIPTION: `${API_BASE_URL}/api/payment/subscription`,
    CANCEL_SUBSCRIPTION: `${API_BASE_URL}/api/payment/cancel-subscription`,
    PAYMENT_HISTORY: `${API_BASE_URL}/api/payment/payment-history`,
  },
  WATCHLIST: {
    GET_ALL: `${API_BASE_URL}/api/watchlist`,
    ADD: `${API_BASE_URL}/api/watchlist`,
    REMOVE: (id: number) => `${API_BASE_URL}/api/watchlist/${id}`,
    CHECK: (contentId: number) => `${API_BASE_URL}/api/watchlist/check/${contentId}`,
  },
  WATCH_HISTORY: {
    GET_ALL: `${API_BASE_URL}/api/watchhistory`,
    ADD: `${API_BASE_URL}/api/watchhistory`,
    DELETE: (id: number) => `${API_BASE_URL}/api/watchhistory/${id}`,
    CONTINUE_WATCHING: `${API_BASE_URL}/api/watchhistory/continue-watching`,
  },
  RECOMMENDATIONS: {
    GET: `${API_BASE_URL}/api/recommendation`,
    TRENDING: `${API_BASE_URL}/api/recommendation/trending`,
    SIMILAR: (contentId: number) => `${API_BASE_URL}/api/recommendation/similar/${contentId}`,
  },
  SEARCH: {
    SEARCH: `${API_BASE_URL}/api/search`,
    GENRES: `${API_BASE_URL}/api/search/genres`,
    YEARS: `${API_BASE_URL}/api/search/years`,
  },
  ADMIN: {
    DASHBOARD: `${API_BASE_URL}/api/admin/dashboard`,
    USERS: `${API_BASE_URL}/api/admin/users`,
    ANALYTICS: `${API_BASE_URL}/api/admin/analytics`,
  },
};

