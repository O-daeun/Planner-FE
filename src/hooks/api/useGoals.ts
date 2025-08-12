import { queryKeys } from '@/constants/queryKeys';
import {
  createLifeGoal,
  deleteLifeGoal,
  getLifeGoal,
  updateLifeGoal,
  getTenYearGoals,
  createTenYearGoal,
  updateTenYearGoal,
  deleteTenYearGoal,
} from '@/lib/api/goalsApi';
import { UpdateTenYearGoalRequest } from '@/types/goal';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export const useGetLifeGoal = () => {
  return useQuery({
    queryKey: queryKeys.lifeGoal,
    queryFn: getLifeGoal,
  });
};

export const useCreateLifeGoal = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createLifeGoal,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.lifeGoal });
    },
  });
};

export const useUpdateLifeGoal = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateLifeGoal,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.lifeGoal });
    },
  });
};

export const useDeleteLifeGoal = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteLifeGoal,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.lifeGoal });
    },
  });
};

// 10년 목표 훅
export const useGetTenYearGoals = () => {
  return useQuery({
    queryKey: ['tenYearGoals'],
    queryFn: getTenYearGoals,
  });
};

export const useCreateTenYearGoal = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createTenYearGoal,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tenYearGoals'] });
    },
  });
};

export const useUpdateTenYearGoal = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: string;
      data: UpdateTenYearGoalRequest;
    }) => updateTenYearGoal(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tenYearGoals'] });
    },
  });
};

export const useDeleteTenYearGoal = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteTenYearGoal,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tenYearGoals'] });
    },
  });
};
