import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useGetSchedulerState, useExecuteSchedulerTask } from '../hooks/useQueries';
import { Loader2, Clock, Play, Calendar } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

export default function SchedulerPanel() {
  const { data: schedulerState, isLoading } = useGetSchedulerState();
  const executeTaskMutation = useExecuteSchedulerTask();

  const handleExecuteTask = async (taskId: bigint) => {
    await executeTaskMutation.mutateAsync(taskId);
  };

  const formatTimestamp = (timestamp: bigint) => {
    return new Date(Number(timestamp) / 1000000).toLocaleString('ja-JP');
  };

  const formatInterval = (interval: bigint) => {
    const seconds = Number(interval);
    if (seconds < 60) return `${seconds}秒`;
    if (seconds < 3600) return `${Math.floor(seconds / 60)}分`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)}時間`;
    return `${Math.floor(seconds / 86400)}日`;
  };

  return (
    <Card className="border-border/50 bg-card/50 backdrop-blur">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-primary" />
            適応的スケジューラー
          </CardTitle>
          <Badge variant="outline" className="bg-gradient-to-r from-orange-500/10 to-yellow-500/10">
            Quantum-Adaptive
          </Badge>
        </div>
        <CardDescription>
          量子ランダム時間窓に基づく動的Outcallスケジューリング
        </CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex items-center justify-center py-8">
            <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
          </div>
        ) : schedulerState && schedulerState.tasks.length > 0 ? (
          <div className="space-y-4">
            <div className="text-sm text-muted-foreground">
              最終更新: {formatTimestamp(schedulerState.lastUpdate)}
            </div>

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>タスク名</TableHead>
                  <TableHead>実行間隔</TableHead>
                  <TableHead>最終実行</TableHead>
                  <TableHead className="text-right">アクション</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {schedulerState.tasks.map((task) => (
                  <TableRow key={task.id.toString()}>
                    <TableCell className="font-medium">{task.name}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{formatInterval(task.interval)}</Badge>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {formatTimestamp(task.lastRun)}
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleExecuteTask(task.id)}
                        disabled={executeTaskMutation.isPending}
                      >
                        {executeTaskMutation.isPending ? (
                          <Loader2 className="h-3 w-3 animate-spin" />
                        ) : (
                          <>
                            <Play className="mr-1 h-3 w-3" />
                            実行
                          </>
                        )}
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        ) : (
          <div className="text-center py-8">
            <Clock className="h-12 w-12 mx-auto text-muted-foreground/50 mb-3" />
            <p className="text-muted-foreground">スケジュールされたタスクがありません</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
