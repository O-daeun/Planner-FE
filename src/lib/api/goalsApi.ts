import {
  CreateTenYearGoalRequest,
  LifeGoalRequest,
  LifeGoalResponse,
  TenYearGoalResponse,
  UpdateTenYearGoalRequest,
} from '@/types/goal';

export const getLifeGoal = async (): Promise<LifeGoalResponse> => {
  const response = await fetch('/api/goals/life');
  if (!response.ok) {
    throw new Error('Failed to fetch life goal');
  }
  const data = await response.json();
  return data;
};

export const createLifeGoal = async (
  goal: LifeGoalRequest
): Promise<LifeGoalResponse> => {
  const response = await fetch('/api/goals/life', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(goal),
  });
  if (!response.ok) {
    throw new Error('Failed to create life goal');
  }
  const data = await response.json();
  return data;
};

export const updateLifeGoal = async (
  goal: LifeGoalRequest
): Promise<LifeGoalResponse> => {
  const response = await fetch('/api/goals/life', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(goal),
  });
  if (!response.ok) {
    throw new Error('Failed to update life goal');
  }
  const data = await response.json();
  return data;
};

export const deleteLifeGoal = async (): Promise<void> => {
  const response = await fetch('/api/goals/life', {
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error('Failed to delete life goal');
  }
};

// 10년 목표 API
export const getTenYearGoals = async (): Promise<TenYearGoalResponse[]> => {
  const response = await fetch('/api/goals/ten-year');
  if (!response.ok) {
    throw new Error('Failed to fetch ten year goals');
  }
  return response.json();
};

export const createTenYearGoal = async (
  data: CreateTenYearGoalRequest
): Promise<TenYearGoalResponse> => {
  const response = await fetch('/api/goals/ten-year', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    throw new Error('Failed to create ten year goal');
  }
  return response.json();
};

export const updateTenYearGoal = async (
  id: string,
  data: UpdateTenYearGoalRequest
): Promise<TenYearGoalResponse> => {
  const response = await fetch(`/api/goals/ten-year/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    throw new Error('Failed to update ten year goal');
  }
  return response.json();
};

export const deleteTenYearGoal = async (id: string): Promise<void> => {
  const response = await fetch(`/api/goals/ten-year/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error('Failed to delete ten year goal');
  }
};
