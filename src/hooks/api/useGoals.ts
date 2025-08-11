import { queryKeys } from '@/constants/queryKeys';
import {
  createLifeGoal,
  deleteLifeGoal,
  getLifeGoal,
  updateLifeGoal,
} from '@/lib/api/goalsApi';
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
