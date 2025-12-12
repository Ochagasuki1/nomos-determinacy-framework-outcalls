import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Activity, Clock, Database, ArrowUpDown, ArrowUp, ArrowDown, CheckCircle2, XCircle, AlertCircle } from 'lucide-react';
import type { MetricData, TransformationLog } from '../backend';
import { useState } from 'react';

interface OutcallsMetricsProps {
  transformationLogs: TransformationLog[];
  isAdmin: boolean;
}

interface MetricSchedule {
  name: string;
  frequency: string;
  interval: string;
  direction: 'upstream' | 'downstream' | 'bidirectional';
  description: string;
}

const METRIC_SCHEDULES: MetricSchedule[] = [
  {
    name: '温度メトリック',
    frequency: '5秒',
    interval: '5s',
    direction: 'upstream',
    description: '外部センサー → DAO',
  },
  {
    name: '決定性メトリック',
    frequency: '5分',
    interval: '5min',
    direction: 'bidirectional',
    description: 'DAO ↔ 外部システム',
  },
  {
    name: '報酬メトリック',
    frequency: '10分',
    interval: '10min',
    direction: 'downstream',
    description: 'DAO → 外部システム',
  },
  {
    name: '参加メトリック',
    frequency: '1時間',
    interval: '1h',
    direction: 'upstream',
    description: '外部データソース → DAO',
  },
  {
    name: 'ガバナンス投票',
    frequency: '1日',
    interval: '1d',
    direction: 'bidirectional',
    description: 'DAO ↔ 外部システム',
  },
];

export default function OutcallsMetrics({ transformationLogs, isAdmin }: OutcallsMetricsProps) {
  const [selectedSchedule, setSelectedSchedule] = useState<MetricSchedule | null>(null);

  const getDirectionIcon = (direction: string) => {
    switch (direction) {
      case 'upstream':
        return <ArrowUp className="h-4 w-4 text-blue-500" />;
      case 'downstream':
        return <ArrowDown className="h-4 w-4 text-green-500" />;
      case 'bidirectional':
        return <ArrowUpDown className="h-4 w-4 text-purple-500" />;
      default:
        return <Activity className="h-4 w-4" />;
    }
  };

  const getDirectionBadge = (direction: string) => {
    switch (direction) {
      case 'upstream':
        return <Badge variant="outline" className="bg-blue-500/10 text-blue-500 border-blue-500/20">上流</Badge>;
      case 'downstream':
        return <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500/20">下流</Badge>;
      case 'bidirectional':
        return <Badge variant="outline" className="bg-purple-500/10 text-purple-500 border-purple-500/20">双方向</Badge>;
      default:
        return null;
    }
  };

  const getStatusIcon = (status: string) => {
    if (status.toLowerCase().includes('success') || status === '200') {
      return <CheckCircle2 className="h-4 w-4 text-green-500" />;
    } else if (status.toLowerCase().includes('error') || status.startsWith('4') || status.startsWith('5')) {
      return <XCircle className="h-4 w-4 text-red-500" />;
    }
    return <AlertCircle className="h-4 w-4 text-yellow-500" />;
  };

  const formatTimestamp = (timestamp: bigint) => {
    const date = new Date(Number(timestamp) / 1000000);
    return date.toLocaleString('ja-JP');
  };

  const sortedLogs = [...transformationLogs].sort((a, b) => Number(b.timestamp - a.timestamp));
  const recentLogs = sortedLogs.slice(0, 10);

  return (
    <Card className="border-border/50 bg-card/50 backdrop-blur">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Database className="h-5 w-5 text-primary" />
            Nomos Outcalls統合
          </CardTitle>
          <Badge variant="outline" className="bg-gradient-to-r from-blue-500/10 to-purple-500/10">
            標準化JSONスキーマ
          </Badge>
        </div>
        <CardDescription>
          オンチェーン ↔ オフチェーン動的フィードバックループ
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="schedule" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="schedule">スケジュール</TabsTrigger>
            <TabsTrigger value="logs">変換ログ</TabsTrigger>
            <TabsTrigger value="schema">JSONスキーマ</TabsTrigger>
          </TabsList>

          <TabsContent value="schedule" className="space-y-4 mt-4">
            <div className="grid gap-3">
              {METRIC_SCHEDULES.map((schedule, index) => (
                <div
                  key={index}
                  className={`p-4 rounded-lg border transition-all cursor-pointer ${
                    selectedSchedule?.name === schedule.name
                      ? 'border-primary bg-primary/5'
                      : 'border-border/50 bg-muted/30 hover:bg-muted/50'
                  }`}
                  onClick={() => setSelectedSchedule(schedule)}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center gap-2">
                        {getDirectionIcon(schedule.direction)}
                        <h4 className="font-medium">{schedule.name}</h4>
                        {getDirectionBadge(schedule.direction)}
                      </div>
                      <p className="text-sm text-muted-foreground">{schedule.description}</p>
                    </div>
                    <div className="flex items-center gap-2 ml-4">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm font-medium">{schedule.frequency}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {selectedSchedule && (
              <Card className="border-primary/20 bg-primary/5">
                <CardHeader>
                  <CardTitle className="text-base">{selectedSchedule.name} - 詳細</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">実行頻度:</span>
                      <p className="font-medium">{selectedSchedule.frequency}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">間隔:</span>
                      <p className="font-medium">{selectedSchedule.interval}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">データフロー:</span>
                      <p className="font-medium">{selectedSchedule.description}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">方向:</span>
                      <div className="mt-1">{getDirectionBadge(selectedSchedule.direction)}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="logs" className="mt-4">
            {!isAdmin ? (
              <div className="text-center py-8">
                <AlertCircle className="h-12 w-12 mx-auto text-muted-foreground/50 mb-3" />
                <p className="text-muted-foreground">管理者のみがログを表示できます</p>
              </div>
            ) : recentLogs.length === 0 ? (
              <div className="text-center py-8">
                <Database className="h-12 w-12 mx-auto text-muted-foreground/50 mb-3" />
                <p className="text-muted-foreground">変換ログがありません</p>
                <p className="text-sm text-muted-foreground mt-2">
                  HTTP Outcallsが実行されるとログが表示されます
                </p>
              </div>
            ) : (
              <ScrollArea className="h-[400px] rounded-md border border-border/50 p-4">
                <div className="space-y-3">
                  {recentLogs.map((log, index) => (
                    <div key={index} className="space-y-2 p-3 rounded-lg bg-muted/30">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          {getStatusIcon(log.status)}
                          <span className="text-sm font-medium">ステータス: {log.status}</span>
                        </div>
                        <span className="text-xs text-muted-foreground">
                          {formatTimestamp(log.timestamp)}
                        </span>
                      </div>
                      <Separator />
                      <div className="space-y-1">
                        <p className="text-xs text-muted-foreground">入力:</p>
                        <pre className="text-xs bg-background/50 p-2 rounded overflow-x-auto">
                          {log.input.substring(0, 200)}
                          {log.input.length > 200 ? '...' : ''}
                        </pre>
                      </div>
                      <div className="space-y-1">
                        <p className="text-xs text-muted-foreground">出力:</p>
                        <pre className="text-xs bg-background/50 p-2 rounded overflow-x-auto">
                          {log.output.substring(0, 200)}
                          {log.output.length > 200 ? '...' : ''}
                        </pre>
                      </div>
                      {log.error && (
                        <div className="space-y-1">
                          <p className="text-xs text-red-500">エラー:</p>
                          <pre className="text-xs bg-red-500/10 p-2 rounded overflow-x-auto text-red-500">
                            {log.error}
                          </pre>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </ScrollArea>
            )}
          </TabsContent>

          <TabsContent value="schema" className="mt-4">
            <Card className="border-border/50 bg-muted/30">
              <CardHeader>
                <CardTitle className="text-base">標準化JSONペイロード構造</CardTitle>
                <CardDescription>すべてのデータ交換で使用される必須フィールド</CardDescription>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[400px]">
                  <pre className="text-xs bg-background/50 p-4 rounded-lg overflow-x-auto">
{`{
  "timestamp": "2025-12-02T10:30:00Z",
  "metricType": "temperature | determinacy | reward | participation | governanceVotes",
  "value": 23.5,
  "unit": "celsius | score | tokens | count | votes",
  "sourceId": "sensor-001 | dao-core | external-api",
  "signature": "0x1234567890abcdef...",
  "context": {
    "location": "Tokyo",
    "deviceId": "sensor-001",
    "accuracy": 0.95,
    "metadata": {
      "version": "1.0",
      "protocol": "nomos-outcalls"
    }
  }
}

必須フィールド:
- timestamp: ISO 8601形式のタイムスタンプ
- metricType: メトリックタイプの識別子
- value: メトリックの数値
- unit: 測定単位
- sourceId: データソースの一意識別子
- signature: データ整合性検証用の暗号署名
- context: 追加のメタデータとコンテキスト情報

データフロー検証:
✓ 上流フロー: 外部データソース → DAO処理
✓ 下流フロー: DAO決定 → 外部システム更新
✓ 双方向フロー: DAOと外部システム間の継続的同期`}
                  </pre>
                </ScrollArea>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
