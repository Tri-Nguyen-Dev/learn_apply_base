import { AxiosError } from 'axios';
import { ApiError, ApiErrorType, type ApiErrorResponse } from '@/services/types/errors';

export const handleApiError = (error: AxiosError): ApiError => {
    let apiError: ApiError;

    if (error.response) {
        const { status, data } = error.response;

        const errorData = data as ApiErrorResponse;

        switch (status) {
            case 400:
                apiError = new ApiError(errorData.message || 'Bad Request', ApiErrorType.BadRequest, status);
                break;
            case 401:
                apiError = new ApiError(errorData.message || 'Unauthorized', ApiErrorType.Unauthorized, status);
                break;
            case 403:
                apiError = new ApiError(errorData.message || 'Forbidden', ApiErrorType.Forbidden, status);
                break;
            case 404:
                apiError = new ApiError(errorData.message || 'Not Found', ApiErrorType.NotFound, status);
                break;
            case 500:
                apiError = new ApiError(errorData.message || 'Internal Server Error', ApiErrorType.ServerError, status);
                break;
            default:
                apiError = new ApiError('An unknown error occurred', ApiErrorType.Unknown, status);
                break;
        }
    } else {
        apiError = new ApiError('Network error', ApiErrorType.Unknown, 0);
    }

    return apiError;
};
