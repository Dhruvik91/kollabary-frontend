import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import { API_CONFIG, FRONTEND_ROUTES } from "@/constants";
import { ApiResponse } from "@/types/generic.types";

class HttpService {
  private static instance: HttpService;
  private axiosInstance: AxiosInstance;

  private constructor() {
    this.axiosInstance = axios.create({
      baseURL: API_CONFIG.baseUrl,
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    });

    // Request interceptor
    this.axiosInstance.interceptors.request.use(
      (config) => {
        // With cookie-based JWT auth, the browser will attach cookies automatically.
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    // Response interceptor
    this.axiosInstance.interceptors.response.use(
      (response) => {
        const envelope = response.data as ApiResponse<unknown>;

        // Check if the response follows the standard envelope format
        const isEnvelope =
          envelope &&
          typeof envelope === 'object' &&
          'statusCode' in envelope &&
          'isError' in envelope;

        if (isEnvelope) {
          if (envelope.isError) {
            // Handle error cases within the envelope
            const messages = Array.isArray(envelope.message)
              ? envelope.message
              : [envelope.message ?? envelope.error ?? 'Request failed'];

            const error = new Error(messages[0] ?? 'Request failed');
            (error as any).response = {
              status: envelope.statusCode,
              data: envelope,
            };
            throw error;
          }

          // Handle success cases - extract data and handle pagination
          let finalData = envelope.data;

          // If there's pagination metadata, normalize the structure
          if (envelope.metaData?.pagination) {
            finalData = {
              items: Array.isArray(envelope.data) ? envelope.data : [],
              meta: envelope.metaData.pagination,
            } as any;
          }

          return {
            ...response,
            data: finalData as any,
          } as AxiosResponse;
        }

        // Fallback for non-envelope responses
        return response;
      },
      async (error) => {
        const originalRequest = error.config || {};

        // Normalizing error messages from response if available
        if (error.response?.data) {
          const errorData = error.response.data as ApiResponse<unknown>;
          if (errorData.message) {
            const messages = Array.isArray(errorData.message)
              ? errorData.message
              : [errorData.message];
            error.message = messages[0] || error.message;
          }
        }

        // Handle 401 errors: redirect to login for protected routes
        if (error.response?.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;

          if (typeof window !== 'undefined') {
            const currentPath = window.location.pathname;
            const publicRoutes = [
              FRONTEND_ROUTES.HOME,
              FRONTEND_ROUTES.AUTH.LOGIN,
              FRONTEND_ROUTES.AUTH.SIGNUP,
              FRONTEND_ROUTES.AUTH.FORGOT_PASSWORD,
              FRONTEND_ROUTES.AUTH.RESET_PASSWORD,
              FRONTEND_ROUTES.AUTH.CALLBACK,
            ];

            if (!publicRoutes.includes(currentPath)) {
              window.location.href = FRONTEND_ROUTES.AUTH.LOGIN;
            }
          }
        }

        return Promise.reject(error);
      }
    );
  }

  public static getInstance(): HttpService {
    if (!HttpService.instance) {
      HttpService.instance = new HttpService();
    }
    return HttpService.instance;
  }

  public async get<T>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> {
    return this.axiosInstance.get<T>(url, config);
  }

  public async post<T>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> {
    return this.axiosInstance.post<T>(url, data, config);
  }

  public async put<T>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> {
    return this.axiosInstance.put<T>(url, data, config);
  }

  public async delete<T>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> {
    return this.axiosInstance.delete<T>(url, config);
  }

  public async patch<T>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> {
    return this.axiosInstance.patch<T>(url, data, config);
  }
}

export default HttpService.getInstance();
