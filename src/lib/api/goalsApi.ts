import { LifeGoalRequest, LifeGoalResponse } from '@/types/goal';

export const getLifeGoal = async (): Promise<LifeGoalResponse> => {
  const response = await fetch('/goals/life');
  const data = await response.json();
  return data;
};

export const createLifeGoal = async (
  goal: LifeGoalRequest
): Promise<LifeGoalResponse> => {
  const response = await fetch('/goals/life', {
    method: 'POST',
    body: JSON.stringify(goal),
  });
  const data = await response.json();
  return data;
};

export const updateLifeGoal = async (
  goal: LifeGoalRequest
): Promise<LifeGoalResponse> => {
  const response = await fetch('/goals/life', {
    method: 'PATCH',
    body: JSON.stringify(goal),
  });
  const data = await response.json();
  return data;
};

export const deleteLifeGoal = async (): Promise<void> => {
  const response = await fetch('/goals/life', {
    method: 'DELETE',
  });
  const data = await response.json();
  return data;
};
