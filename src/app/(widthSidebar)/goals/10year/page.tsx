'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import {
  useCreateTenYearGoal,
  useDeleteTenYearGoal,
  useGetTenYearGoals,
  useUpdateTenYearGoal,
} from '@/hooks/api/useGoals';
import { TenYearGoalResponse } from '@/types/goal';
import { MoreVertical, Plus, Save, X } from 'lucide-react';
import { useState } from 'react';

// 연령대별 라벨
const getAgeGroupLabel = (ageGroup: number) => {
  return `${ageGroup}대`;
};

// 연령대별 색상
const getAgeGroupColor = (ageGroup: number) => {
  const colors = {
    10: 'bg-blue-100 border-blue-300',
    20: 'bg-green-100 border-green-300',
    30: 'bg-yellow-100 border-yellow-300',
    40: 'bg-orange-100 border-orange-300',
    50: 'bg-red-100 border-red-300',
    60: 'bg-purple-100 border-purple-300',
    70: 'bg-pink-100 border-pink-300',
    80: 'bg-indigo-100 border-indigo-300',
    90: 'bg-teal-100 border-teal-300',
    100: 'bg-gray-100 border-gray-300',
  };
  return (
    colors[ageGroup as keyof typeof colors] || 'bg-gray-100 border-gray-300'
  );
};

export default function TenYearGoalsPage() {
  const { data: tenYearGoals = [], isLoading } = useGetTenYearGoals();
  const createMutation = useCreateTenYearGoal();
  const updateMutation = useUpdateTenYearGoal();
  const deleteMutation = useDeleteTenYearGoal();

  const [isCreating, setIsCreating] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editData, setEditData] = useState<Partial<TenYearGoalResponse>>({});
  const [showActions, setShowActions] = useState<string | null>(null);

  // 연령대별로 정렬 (높은 연령대부터)
  const sortedGoals = [...tenYearGoals].sort((a, b) => b.ageGroup - a.ageGroup);

  const handleCreate = () => {
    setIsCreating(true);
    setEditData({
      title: '',
      description: '',
      ageGroup: 20,
    });
  };

  const handleSaveCreate = () => {
    if (editData.title && editData.description && editData.ageGroup) {
      createMutation.mutate({
        title: editData.title,
        description: editData.description,
        ageGroup: editData.ageGroup,
      });
      setIsCreating(false);
      setEditData({});
    }
  };

  const handleEdit = (goal: TenYearGoalResponse) => {
    setEditingId(goal.id);
    setEditData({
      title: goal.title,
      description: goal.description,
      ageGroup: goal.ageGroup,
    });
    setShowActions(null);
  };

  const handleSaveEdit = () => {
    if (
      editingId &&
      editData.title &&
      editData.description &&
      editData.ageGroup
    ) {
      updateMutation.mutate({
        id: editingId,
        data: {
          title: editData.title,
          description: editData.description,
          ageGroup: editData.ageGroup,
        },
      });
      setEditingId(null);
      setEditData({});
    }
  };

  const handleCancel = () => {
    setIsCreating(false);
    setEditingId(null);
    setEditData({});
  };

  const handleDelete = (id: string) => {
    if (confirm('정말로 이 10년 목표를 삭제하시겠습니까?')) {
      deleteMutation.mutate(id);
      setShowActions(null);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-lg text-muted-foreground">로딩 중...</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 max-w-6xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">10년 목표</h1>
        <p className="text-muted-foreground">
          인생의 각 단계별로 이루고 싶은 목표를 설정하세요
        </p>
      </div>

      {/* 생성 버튼 */}
      <div className="mb-6">
        <Button onClick={handleCreate} size="lg" className="gap-2">
          <Plus className="w-5 h-5" />
          새로운 10년 목표 추가하기
        </Button>
      </div>

      {/* 생성 폼 */}
      {isCreating && (
        <Card className="mb-6 border-2 border-dashed border-primary/50">
          <CardHeader>
            <CardTitle className="text-lg text-primary">
              새로운 10년 목표
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">연령대</label>
                <select
                  value={editData.ageGroup || 20}
                  onChange={e =>
                    setEditData(prev => ({
                      ...prev,
                      ageGroup: Number(e.target.value),
                    }))
                  }
                  className="w-full p-2 border rounded-md"
                >
                  {[10, 20, 30, 40, 50, 60, 70, 80, 90, 100].map(age => (
                    <option key={age} value={age}>
                      {age}대
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">
                  목표 제목
                </label>
                <Input
                  value={editData.title || ''}
                  onChange={e =>
                    setEditData(prev => ({ ...prev, title: e.target.value }))
                  }
                  placeholder="목표 제목을 입력하세요"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">
                목표 설명
              </label>
              <Textarea
                value={editData.description || ''}
                onChange={e =>
                  setEditData(prev => ({
                    ...prev,
                    description: e.target.value,
                  }))
                }
                placeholder="목표에 대한 자세한 설명을 입력하세요"
                className="min-h-[100px] resize-none"
              />
            </div>
            <div className="flex gap-2 justify-end">
              <Button variant="outline" onClick={handleCancel} size="sm">
                <X className="w-4 h-4 mr-2" />
                취소
              </Button>
              <Button onClick={handleSaveCreate} size="sm">
                <Save className="w-4 h-4 mr-2" />
                저장
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* 타임라인 레이아웃 */}
      <div className="space-y-6">
        {sortedGoals.length === 0 ? (
          <Card className="border-dashed border-2 border-muted-foreground/25">
            <CardContent className="flex flex-col items-center justify-center py-16">
              <div className="text-muted-foreground mb-4 text-center">
                <p className="text-lg mb-2">
                  아직 10년 목표가 설정되지 않았습니다
                </p>
                <p className="text-sm">첫 번째 10년 목표를 만들어보세요</p>
              </div>
            </CardContent>
          </Card>
        ) : (
          sortedGoals.map(goal => (
            <div key={goal.id} className="relative">
              {/* 연령대 라벨 */}
              <div className="flex items-center mb-4">
                <div
                  className={`px-4 py-2 rounded-full text-sm font-semibold ${getAgeGroupColor(goal.ageGroup)}`}
                >
                  {getAgeGroupLabel(goal.ageGroup)}
                </div>
                <div className="ml-4 h-px bg-muted-foreground/20 flex-1"></div>
              </div>

              {/* 목표 카드 */}
              <Card
                className={`border-l-4 border-l-primary ${getAgeGroupColor(goal.ageGroup).split(' ')[1]}`}
              >
                <CardHeader className="relative">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      {editingId === goal.id ? (
                        <div className="space-y-4">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <label className="block text-sm font-medium mb-2">
                                연령대
                              </label>
                              <select
                                value={editData.ageGroup || goal.ageGroup}
                                onChange={e =>
                                  setEditData(prev => ({
                                    ...prev,
                                    ageGroup: Number(e.target.value),
                                  }))
                                }
                                className="w-full p-2 border rounded-md"
                              >
                                {[10, 20, 30, 40, 50, 60, 70, 80, 90, 100].map(
                                  age => (
                                    <option key={age} value={age}>
                                      {age}대
                                    </option>
                                  )
                                )}
                              </select>
                            </div>
                            <div>
                              <label className="block text-sm font-medium mb-2">
                                목표 제목
                              </label>
                              <Input
                                value={editData.title || ''}
                                onChange={e =>
                                  setEditData(prev => ({
                                    ...prev,
                                    title: e.target.value,
                                  }))
                                }
                                placeholder="목표 제목을 입력하세요"
                              />
                            </div>
                          </div>
                          <div>
                            <label className="block text-sm font-medium mb-2">
                              목표 설명
                            </label>
                            <Textarea
                              value={editData.description || ''}
                              onChange={e =>
                                setEditData(prev => ({
                                  ...prev,
                                  description: e.target.value,
                                }))
                              }
                              placeholder="목표에 대한 자세한 설명을 입력하세요"
                              className="min-h-[100px] resize-none"
                            />
                          </div>
                          <div className="flex gap-2 justify-end">
                            <Button
                              variant="outline"
                              onClick={handleCancel}
                              size="sm"
                            >
                              <X className="w-4 h-4 mr-2" />
                              취소
                            </Button>
                            <Button onClick={handleSaveEdit} size="sm">
                              <Save className="w-4 h-4 mr-2" />
                              저장
                            </Button>
                          </div>
                        </div>
                      ) : (
                        <CardTitle className="text-xl">{goal.title}</CardTitle>
                      )}
                    </div>

                    {editingId !== goal.id && (
                      <div className="relative">
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() =>
                                  setShowActions(
                                    showActions === goal.id ? null : goal.id
                                  )
                                }
                                className="h-8 w-8 p-0"
                              >
                                <MoreVertical className="h-4 w-4" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>더보기</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>

                        {showActions === goal.id && (
                          <div className="absolute right-0 top-10 z-10 bg-background border rounded-md shadow-lg py-1 min-w-[120px]">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleEdit(goal)}
                              className="w-full justify-start px-3 py-2 h-auto"
                            >
                              수정하기
                            </Button>
                            <Separator className="my-1" />
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleDelete(goal.id)}
                              className="w-full justify-start px-3 py-2 h-auto text-destructive hover:text-destructive hover:bg-destructive/10"
                            >
                              삭제하기
                            </Button>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </CardHeader>

                {editingId !== goal.id && (
                  <CardContent>
                    <div className="space-y-4">
                      {goal.description ? (
                        <p className="text-muted-foreground leading-relaxed whitespace-pre-wrap">
                          {goal.description}
                        </p>
                      ) : (
                        <p className="text-muted-foreground italic">
                          설명이 없습니다
                        </p>
                      )}

                      <div className="text-xs text-muted-foreground">
                        <p>
                          생성일:{' '}
                          {new Date(goal.createdAt).toLocaleDateString('ko-KR')}
                        </p>
                        <p>
                          수정일:{' '}
                          {new Date(goal.updatedAt).toLocaleDateString('ko-KR')}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                )}
              </Card>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
