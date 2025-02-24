export interface LogEntry {
  timestamp: Date;
  message: string;
  type: 'info' | 'success' | 'error';
}

export interface ApiResponse {
  qrcode?: string;
  error?: string;
  status?: string;
}