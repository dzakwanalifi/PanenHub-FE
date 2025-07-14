// Error handler untuk aplikasi
export class AppError extends Error {
  public readonly statusCode: number;
  public readonly isOperational: boolean;

  constructor(message: string, statusCode: number = 500, isOperational: boolean = true) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = isOperational;

    Error.captureStackTrace(this, this.constructor);
  }
}

export const handleError = (error: any): { message: string; statusCode: number } => {
  // Network errors
  if (error.code === 'NETWORK_ERROR' || error.message?.includes('Network Error')) {
    return {
      message: 'Koneksi internet bermasalah. Silakan coba lagi.',
      statusCode: 0
    };
  }

  // Axios errors
  if (error.response) {
    const status = error.response.status;
    
    switch (status) {
      case 401:
        return {
          message: 'Sesi login sudah berakhir. Silakan login kembali.',
          statusCode: 401
        };
      case 403:
        return {
          message: 'Anda tidak memiliki akses untuk melakukan aksi ini.',
          statusCode: 403
        };
      case 404:
        return {
          message: 'Data yang dicari tidak ditemukan.',
          statusCode: 404
        };
      case 422:
        return {
          message: error.response.data?.message || 'Data yang dikirim tidak valid.',
          statusCode: 422
        };
      case 500:
        return {
          message: 'Terjadi kesalahan pada server. Silakan coba lagi nanti.',
          statusCode: 500
        };
      default:
        return {
          message: error.response.data?.message || 'Terjadi kesalahan yang tidak diketahui.',
          statusCode: status
        };
    }
  }

  // Supabase errors
  if (error.message?.includes('JWT')) {
    return {
      message: 'Sesi login tidak valid. Silakan login kembali.',
      statusCode: 401
    };
  }

  // Default error
  return {
    message: error.message || 'Terjadi kesalahan yang tidak diketahui.',
    statusCode: 500
  };
};

export const logError = (error: any, context?: string) => {
  if (process.env.NODE_ENV === 'development') {
    console.error(`[${context || 'Error'}]:`, error);
  }
  
  // Untuk production, bisa dikirim ke service monitoring seperti Sentry
  // if (process.env.NODE_ENV === 'production') {
  //   // Send to monitoring service
  // }
};
