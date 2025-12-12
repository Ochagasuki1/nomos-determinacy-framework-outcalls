import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Target, Activity, Clock, TrendingUp } from 'lucide-react';
import type { MemberDeterminacy, DeterminacyDiagnostics } from '../backend';

interface DeterminacyMetricsProps {
  memberAverages: MemberDeterminacy[];
  diagnostics: DeterminacyDiagnostics;
}

export default function DeterminacyMetrics({ memberAverages, diagnostics }: DeterminacyMetricsProps) {
  const sortedMembers = [...memberAverages].sort((a, b) => b.averageDeterminacy - a.averageDeterminacy);
  const topPerformers = sortedMembers.slice(0, 5);

  const getDeterminacyColor = (score: number): string => {
    if (score >= 0.8) return 'text-green-500';
    if (score >= 0.6) return 'text-blue-500';
    if (score >= 0.4) return 'text-yellow-500';
    return 'text-orange-500';
  };

  const getDeterminacyLabel = (score: number): string => {
    if (score >= 0.8) return '優秀';
    if (score >= 0.6) return '良好';
    if (score >= 0.4) return '標準';
    return '要改善';
  };

  return (
    <Card className="border-border/50 bg-card/50 backdrop-blur">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5 text-primary" />
            決定性メトリクス (D_t)
          </CardTitle>
          <Badge variant="outline" className="bg-gradient-to-r from-green-500/10 to-blue-500/10">
            Proof of Intentionality
          </Badge>
        </div>
        <CardDescription>ユーザー行動の一貫性、タイミング規則性、意図強度の分析</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid gap-4 md:grid-cols-3">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Activity className="h-4 w-4" />
              <span>総イベント数</span>
            </div>
            <p className="text-2xl font-bold">{Number(diagnostics.totalEvents).toLocaleString()}</p>
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <TrendingUp className="h-4 w-4" />
              <span>平均決定性スコア</span>
            </div>
            <p className="text-2xl font-bold">{(diagnostics.averageDeterminacy * 100).toFixed(1)}%</p>
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Clock className="h-4 w-4" />
              <span>時間ウィンドウ</span>
            </div>
            <p className="text-2xl font-bold">{Number(diagnostics.timeWindow).toLocaleString()}s</p>
          </div>
        </div>

        {topPerformers.length > 0 ? (
          <div className="space-y-4">
            <h4 className="text-sm font-medium text-muted-foreground">トップパフォーマー</h4>
            <div className="space-y-3">
              {topPerformers.map((member, index) => (
                <div
                  key={index}
                  className="space-y-2 p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-mono text-muted-foreground truncate">
                        {member.memberId.toString()}
                      </p>
                    </div>
                    <div className="flex items-center gap-3 ml-4">
                      <Badge variant="outline" className={getDeterminacyColor(member.averageDeterminacy)}>
                        {getDeterminacyLabel(member.averageDeterminacy)}
                      </Badge>
                      <span className="text-sm font-semibold">
                        {(member.averageDeterminacy * 100).toFixed(1)}%
                      </span>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <Progress value={member.averageDeterminacy * 100} className="h-2" />
                    <p className="text-xs text-muted-foreground">
                      {Number(member.eventCount).toLocaleString()} イベント
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="text-center py-8">
            <Target className="h-12 w-12 mx-auto text-muted-foreground/50 mb-3" />
            <p className="text-muted-foreground">決定性データがありません</p>
            <p className="text-sm text-muted-foreground mt-2">
              ユーザーアクションが記録されるとデータが表示されます
            </p>
          </div>
        )}

        {memberAverages.length > 5 && (
          <div className="pt-4 border-t border-border/50">
            <p className="text-sm text-muted-foreground text-center">
              全 {memberAverages.length} メンバー中、上位 5 名を表示
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
