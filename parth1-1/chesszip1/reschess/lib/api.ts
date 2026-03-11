const API_BASE = '';

interface ApiResponse<T = unknown> {
  data?: T;
  error?: string;
  status: number;
}

async function apiRequest<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<ApiResponse<T>> {
  try {
    const response = await fetch(`${API_BASE}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      credentials: 'include',
      ...options,
    });

    const data = await response.json();

    if (!response.ok) {
      return {
        error: data.error || 'Something went wrong',
        status: response.status,
      };
    }

    return { data, status: response.status };
  } catch (error) {
    console.error('API request error:', error);
    return {
      error: 'Network error. Please try again.',
      status: 0,
    };
  }
}

// Auth API
export const authApi = {
  login: (email: string, password: string) =>
    apiRequest('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    }),

  logout: () =>
    apiRequest('/api/auth/logout', { method: 'POST' }),

  me: () =>
    apiRequest<{ user: { id: string; email: string; role: string; name: string } }>('/api/auth/me'),

  forgotPassword: (email: string) =>
    apiRequest('/api/auth/forgot-password', {
      method: 'POST',
      body: JSON.stringify({ email }),
    }),

  resetPassword: (token: string, password: string) =>
    apiRequest('/api/auth/reset-password', {
      method: 'POST',
      body: JSON.stringify({ token, password }),
    }),

  register: (data: { email: string; password: string; name: string; role: string }) =>
    apiRequest('/api/auth/register', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
};

// Generic CRUD helpers
export function createCrudApi<T>(basePath: string) {
  return {
    list: (params?: Record<string, string>) => {
      const query = params ? '?' + new URLSearchParams(params).toString() : '';
      return apiRequest<T[]>(`${basePath}${query}`);
    },
    get: (id: string) => apiRequest<T>(`${basePath}/${id}`),
    create: (data: Partial<T>) =>
      apiRequest<T>(basePath, {
        method: 'POST',
        body: JSON.stringify(data),
      }),
    update: (id: string, data: Partial<T>) =>
      apiRequest<T>(`${basePath}/${id}`, {
        method: 'PUT',
        body: JSON.stringify(data),
      }),
    delete: (id: string) =>
      apiRequest(`${basePath}/${id}`, { method: 'DELETE' }),
  };
}

// Entity APIs
export const studentsApi = createCrudApi('/api/students');
export const coachesApi = createCrudApi('/api/coaches');
export const demosApi = createCrudApi('/api/demos');
export const batchesApi = createCrudApi('/api/batches');
export const lessonsApi = createCrudApi('/api/lessons');
export const subscriptionsApi = createCrudApi('/api/subscriptions');
export const paymentsApi = createCrudApi('/api/payments');
export const announcementsApi = createCrudApi('/api/announcements');
export const broadcastsApi = createCrudApi('/api/broadcasts');
export const studyMaterialsApi = createCrudApi('/api/study-materials');

// Analytics
export const analyticsApi = {
  getDashboard: () => apiRequest('/api/analytics'),
};

// Conversations & Messages
export const conversationsApi = {
  list: () => apiRequest('/api/conversations'),
  getMessages: (conversationId: string) =>
    apiRequest(`/api/conversations/${conversationId}/messages`),
  sendMessage: (conversationId: string, content: string, fileUrl?: string) =>
    apiRequest(`/api/conversations/${conversationId}/messages`, {
      method: 'POST',
      body: JSON.stringify({ content, fileUrl }),
    }),
  getBatchChat: (batchId: string) =>
    apiRequest(`/api/conversations/batch/${batchId}`),
};

// Coach-specific APIs
export const coachApi = {
  myStudents: () => apiRequest('/api/coach/students'),
  mySchedule: () => apiRequest('/api/coach/schedule'),
  myEarnings: () => apiRequest('/api/coach/earnings'),
  myBatches: () => apiRequest('/api/coach/batches'),
  markAttendance: (lessonId: string, attendance: { studentId: string; present: boolean }[]) =>
    apiRequest('/api/coach/attendance', {
      method: 'POST',
      body: JSON.stringify({ lessonId, attendance }),
    }),
};

// Customer-specific APIs
export const customerApi = {
  profile: () => apiRequest('/api/customer/profile'),
  updateProfile: (data: Record<string, unknown>) =>
    apiRequest('/api/customer/profile', {
      method: 'PUT',
      body: JSON.stringify(data),
    }),
  lessons: () => apiRequest('/api/customer/lessons'),
  progress: () => apiRequest('/api/customer/progress'),
  billing: () => apiRequest('/api/customer/billing'),
  studyMaterials: () => apiRequest('/api/customer/study-materials'),
};

// Public APIs
export const publicApi = {
  bookDemo: (data: Record<string, unknown>) =>
    apiRequest('/api/public/demo', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
  getPricing: () => apiRequest('/api/public/pricing'),
};
