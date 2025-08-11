export interface LifeGoalResponse {
  id: string;
  title: string;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface LifeGoalRequest {
  title: string;
  description?: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message: string;
}
