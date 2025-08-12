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

export interface TenYearGoalResponse {
  id: string;
  title: string;
  description: string;
  ageGroup: number; // 10, 20, 30, 40, 50, 60, 70, 80, 90, 100
  createdAt: string;
  updatedAt: string;
}

export interface CreateTenYearGoalRequest {
  title: string;
  description: string;
  ageGroup: number;
}

export interface UpdateTenYearGoalRequest {
  title: string;
  description: string;
  ageGroup: number;
}
