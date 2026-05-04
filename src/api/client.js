export const BASE_URL = 'https://localhost:7151';

export function getToken() {
    return localStorage.getItem('token');
}

export function isAuthenticated() {
    return Boolean(getToken());
}

export async function apiFetch(path, options = {}) {
    const token = getToken();
    const isFormData = typeof FormData !== 'undefined' && options.body instanceof FormData;
    const headers = {
        ...(options.body && !isFormData ? { 'Content-Type': 'application/json' } : {}),
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...options.headers
    };

    const response = await fetch(`${BASE_URL}${path}`, {
        ...options,
        headers
    });

    if (!response.ok) {
        const message = await readError(response);
        const error = new Error(message || 'Request failed');
        error.status = response.status;
        throw error;
    }

    if (response.status === 204) {
        return null;
    }

    const contentType = response.headers.get('content-type') || '';
    return contentType.includes('application/json')
        ? response.json()
        : response.text();
}

async function readError(response) {
    const contentType = response.headers.get('content-type') || '';

    if (contentType.includes('application/json')) {
        const data = await response.json();
        return data.message || data.title || JSON.stringify(data);
    }

    return response.text();
}
