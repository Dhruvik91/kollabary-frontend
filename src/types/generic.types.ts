export interface ApiResponse<T> {
    statusCode: number;
    message: string | string[];
    data: T;
    isError: boolean;
    error?: string;
    metaData?: {
        pagination?: {
            page: number;
            limit: number;
            total: number;
            totalPages: number;
        };
    };
}