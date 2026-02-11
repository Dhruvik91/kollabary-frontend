import { AuthError } from '@/types/auth.types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3000/api/v1';

export class ApiError extends Error {
    constructor(
        message: string,
        public statusCode?: number,
        public errors?: Record<string, string[]>
    ) {
        super(message);
        this.name = 'ApiError';
    }
}

interface RequestOptions extends Omit<RequestInit, 'body'> {
    body?: unknown;
}

/**
 * Centralized API client for making HTTP requests
 * Handles authentication, error handling, and response parsing
 */
class ApiClient {
    private baseUrl: string;

    constructor(baseUrl: string) {
        this.baseUrl = baseUrl;
    }

    /**
     * Make a GET request
     */
    async get<T>(endpoint: string, options?: RequestInit): Promise<T> {
        return this.request<T>(endpoint, { ...options, method: 'GET' });
    }

    /**
     * Make a POST request
     */
    async post<T>(endpoint: string, data?: unknown, options?: RequestInit): Promise<T> {
        return this.request<T>(endpoint, {
            ...options,
            method: 'POST',
            body: data,
        });
    }

    /**
     * Make a PUT request
     */
    async put<T>(endpoint: string, data?: unknown, options?: RequestInit): Promise<T> {
        return this.request<T>(endpoint, {
            ...options,
            method: 'PUT',
            body: data,
        });
    }

    /**
     * Make a PATCH request
     */
    async patch<T>(endpoint: string, data?: unknown, options?: RequestInit): Promise<T> {
        return this.request<T>(endpoint, {
            ...options,
            method: 'PATCH',
            body: data,
        });
    }

    /**
     * Make a DELETE request
     */
    async delete<T>(endpoint: string, options?: RequestInit): Promise<T> {
        return this.request<T>(endpoint, { ...options, method: 'DELETE' });
    }

    /**
     * Core request method
     */
    private async request<T>(endpoint: string, options: RequestOptions = {}): Promise<T> {
        const url = `${this.baseUrl}${endpoint}`;
        const { body, headers, ...restOptions } = options;

        const config: RequestInit = {
            ...restOptions,
            headers: {
                'Content-Type': 'application/json',
                ...headers,
            },
            credentials: 'include', // Include cookies for authentication
        };

        // Add body if present
        if (body !== undefined) {
            config.body = JSON.stringify(body);
        }

        try {
            const response = await fetch(url, config);

            // Handle non-JSON responses (like redirects)
            const contentType = response.headers.get('content-type');
            const isJson = contentType?.includes('application/json');

            // Parse response body
            let data: unknown;
            if (isJson) {
                data = await response.json();
            } else {
                data = await response.text();
            }

            // Handle error responses
            if (!response.ok) {
                const errorMessage = this.extractErrorMessage(data);
                throw new ApiError(errorMessage, response.status, this.extractValidationErrors(data));
            }

            return data as T;
        } catch (error) {
            // Re-throw ApiError as-is
            if (error instanceof ApiError) {
                throw error;
            }

            // Handle network errors
            if (error instanceof TypeError) {
                throw new ApiError('Network error. Please check your connection.');
            }

            // Handle unknown errors
            throw new ApiError('An unexpected error occurred. Please try again.');
        }
    }

    /**
     * Extract user-friendly error message from response
     */
    private extractErrorMessage(data: unknown): string {
        if (typeof data === 'string') {
            return data;
        }

        if (data && typeof data === 'object') {
            const errorData = data as Record<string, unknown>;

            // Check for common error message fields
            if (typeof errorData.message === 'string') {
                return errorData.message;
            }

            if (typeof errorData.error === 'string') {
                return errorData.error;
            }

            if (Array.isArray(errorData.message)) {
                return errorData.message.join(', ');
            }
        }

        return 'An error occurred. Please try again.';
    }

    /**
     * Extract validation errors from response
     */
    private extractValidationErrors(data: unknown): Record<string, string[]> | undefined {
        if (data && typeof data === 'object') {
            const errorData = data as Record<string, unknown>;

            if (errorData.errors && typeof errorData.errors === 'object') {
                return errorData.errors as Record<string, string[]>;
            }
        }

        return undefined;
    }
}

// Export singleton instance
export const apiClient = new ApiClient(API_BASE_URL);
