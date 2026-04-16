import { useAdminStore } from '../stores/adminStore';

const BASE = 'http://localhost:3001/api';

async function adminRequest<T>(path: string, options?: RequestInit): Promise<T> {
    const token = useAdminStore.getState().token;
    const res = await fetch(`${BASE}${path}`, {
        headers: {
            'Content-Type': 'application/json',
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        ...options,
    });

    if (res.status === 401) {
        useAdminStore.getState().logout();
        throw new Error('Session expired');
    }

    if (!res.ok) throw new Error(`Admin API error ${res.status}: ${path}`);
    return res.json();
}

export const adminApi = {
    login: (password: string) =>
        useAdminStore.getState().login(password),

    getAnalytics: () =>
        adminRequest<any>('/admin/analytics'),

    getLogs: (page = 1, limit = 50) =>
        adminRequest<{ logs: any[]; total: number; page: number; pages: number }>(
            `/admin/logs?page=${page}&limit=${limit}`
        ),

    getSessions: (userId?: number) =>
        adminRequest<{ sessions: any[]; total: number }>(
            `/admin/sessions${userId ? `?userId=${userId}` : ''}`
        ),
};
