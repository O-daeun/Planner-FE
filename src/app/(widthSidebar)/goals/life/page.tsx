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
  useCreateLifeGoal,
  useDeleteLifeGoal,
  useGetLifeGoal,
  useUpdateLifeGoal,
} from '@/hooks/api/useGoals';
import { LifeGoalResponse } from '@/types/goal';
import { MoreVertical, Plus, Save, X } from 'lucide-react';
import { useState } from 'react';

export default function LifeGoalsPage() {
  const { data: lifeGoal, isLoading } = useGetLifeGoal();
  const createMutation = useCreateLifeGoal();
  const updateMutation = useUpdateLifeGoal();
  const deleteMutation = useDeleteLifeGoal();

  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState<LifeGoalResponse | null>(null);
  const [showActions, setShowActions] = useState(false);

  const handleCreate = () => {
    const newGoal = {
      title: '새로운 인생 목표',
      description: '여기에 목표를 입력하세요...',
    };
    createMutation.mutate(newGoal);
  };

  const handleEdit = () => {
    if (lifeGoal) {
      setEditData(lifeGoal);
      setIsEditing(true);
      setShowActions(false);
    }
  };

  const handleSave = () => {
    if (editData) {
      updateMutation.mutate({
        title: editData.title,
        description: editData.description,
      });
      setIsEditing(false);
      setEditData(null);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditData(null);
  };

  const handleDelete = () => {
    if (confirm('정말로 이 인생 목표를 삭제하시겠습니까?')) {
      deleteMutation.mutate();
      setShowActions(false);
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
    <div className="container mx-auto p-6 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">인생 목표</h1>
        <p className="text-muted-foreground">
          당신의 인생에서 이루고 싶은 가장 중요한 목표를 설정하세요
        </p>
      </div>

      {!lifeGoal ? (
        <Card className="border-dashed border-2 border-muted-foreground/25">
          <CardContent className="flex flex-col items-center justify-center py-16">
            <div className="text-muted-foreground mb-4 text-center">
              <p className="text-lg mb-2">
                아직 인생 목표가 설정되지 않았습니다
              </p>
              <p className="text-sm">첫 번째 인생 목표를 만들어보세요</p>
            </div>
            <Button onClick={handleCreate} size="lg" className="gap-2">
              <Plus className="w-5 h-5" />
              인생 목표 생성하기
            </Button>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardHeader className="relative">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                {isEditing ? (
                  <Input
                    value={editData?.title || ''}
                    onChange={e =>
                      setEditData(prev =>
                        prev ? { ...prev, title: e.target.value } : null
                      )
                    }
                    className="text-xl font-semibold mb-2"
                    placeholder="목표 제목을 입력하세요"
                  />
                ) : (
                  <CardTitle className="text-xl">{lifeGoal.title}</CardTitle>
                )}
              </div>

              {!isEditing && (
                <div className="relative">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setShowActions(!showActions)}
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

                  {showActions && (
                    <div className="absolute right-0 top-10 z-10 bg-background border rounded-md shadow-lg py-1 min-w-[120px]">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={handleEdit}
                        className="w-full justify-start px-3 py-2 h-auto"
                      >
                        수정하기
                      </Button>
                      <Separator className="my-1" />
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={handleDelete}
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

          <CardContent>
            {isEditing ? (
              <div className="space-y-4">
                <Textarea
                  value={editData?.description || ''}
                  onChange={e =>
                    setEditData(prev =>
                      prev ? { ...prev, description: e.target.value } : null
                    )
                  }
                  placeholder="목표에 대한 자세한 설명을 입력하세요"
                  className="min-h-[120px] resize-none"
                />
                <div className="flex gap-2 justify-end">
                  <Button variant="outline" onClick={handleCancel} size="sm">
                    <X className="w-4 h-4 mr-2" />
                    취소
                  </Button>
                  <Button onClick={handleSave} size="sm">
                    <Save className="w-4 h-4 mr-2" />
                    저장
                  </Button>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                {lifeGoal.description ? (
                  <p className="text-muted-foreground leading-relaxed whitespace-pre-wrap">
                    {lifeGoal.description}
                  </p>
                ) : (
                  <p className="text-muted-foreground italic">
                    설명이 없습니다
                  </p>
                )}

                <div className="text-xs text-muted-foreground">
                  <p>
                    생성일:{' '}
                    {new Date(lifeGoal.createdAt).toLocaleDateString('ko-KR')}
                  </p>
                  <p>
                    수정일:{' '}
                    {new Date(lifeGoal.updatedAt).toLocaleDateString('ko-KR')}
                  </p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
