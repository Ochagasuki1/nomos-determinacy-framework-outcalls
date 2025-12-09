import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useGetQuantumRandomWindow, useVerifyQuantumBits } from '../hooks/useQueries';
import { Loader2, Zap, Binary, Clock, CheckCircle2 } from 'lucide-react';
import { useState } from 'react';
import type { RandomWindow } from '../backend';

export default function QuantumMonitor() {
  const [currentWindow, setCurrentWindow] = useState<RandomWindow | null>(null);
  const getWindowMutation = useGetQuantumRandomWindow();
  const verifyBitsMutation = useVerifyQuantumBits();

  const handleGetWindow = async () => {
    const window = await getWindowMutation.mutateAsync();
    setCurrentWindow(window);
  };

  const handleVerifyBits = async () => {
    if (currentWindow) {
      await verifyBitsMutation.mutateAsync(currentWindow.quantumBits);
    }
  };

  const formatTimestamp = (timestamp: bigint) => {
    return new Date(Number(timestamp) / 1000000).toLocaleString('ja-JP');
  };

  const calculateEntropy = (bits: boolean[]) => {
    if (bits.length === 0) return 0;
    const trueCount = bits.filter(b => b).length;
    const ratio = trueCount / bits.length;
    return 1.0 - Math.abs(ratio - 0.5) * 2.0;
  };

  return (
    <Card className="border-border/50 bg-card/50 backdrop-blur">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5 text-primary" />
            量子乱数時間窓モニター
          </CardTitle>
          <Badge variant="outline" className="bg-gradient-to-r from-blue-500/10 to-cyan-500/10">
            QRNG
          </Badge>
        </div>
        <CardDescription>ICP量子乱数生成器による時間窓の取得と検証</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex gap-2">
          <Button
            onClick={handleGetWindow}
            disabled={getWindowMutation.isPending}
            className="flex-1"
          >
            {getWindowMutation.isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                取得中...
              </>
            ) : (
              <>
                <Zap className="mr-2 h-4 w-4" />
                量子時間窓を取得
              </>
            )}
          </Button>

          {currentWindow && (
            <Button
              onClick={handleVerifyBits}
              disabled={verifyBitsMutation.isPending}
              variant="outline"
            >
              {verifyBitsMutation.isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  検証中...
                </>
              ) : (
                <>
                  <CheckCircle2 className="mr-2 h-4 w-4" />
                  ビット検証
                </>
              )}
            </Button>
          )}
        </div>

        {currentWindow && (
          <div className="space-y-4 p-4 rounded-lg bg-muted/50">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  <span>開始時刻</span>
                </div>
                <p className="text-sm font-mono">{formatTimestamp(currentWindow.startTime)}</p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  <span>終了時刻</span>
                </div>
                <p className="text-sm font-mono">{formatTimestamp(currentWindow.endTime)}</p>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Binary className="h-4 w-4" />
                  <span>量子ビット列</span>
                </div>
                <Badge variant="outline">
                  エントロピー: {(calculateEntropy(currentWindow.quantumBits) * 100).toFixed(1)}%
                </Badge>
              </div>
              <div className="p-3 rounded bg-background/50 font-mono text-xs break-all">
                {currentWindow.quantumBits.map((bit, i) => (
                  <span key={i} className={bit ? 'text-green-500' : 'text-red-500'}>
                    {bit ? '1' : '0'}
                  </span>
                ))}
              </div>
              <p className="text-xs text-muted-foreground">
                ビット数: {currentWindow.quantumBits.length} | 
                True: {currentWindow.quantumBits.filter(b => b).length} | 
                False: {currentWindow.quantumBits.filter(b => !b).length}
              </p>
            </div>

            {verifyBitsMutation.isSuccess && (
              <div className="flex items-center gap-2 p-3 rounded-lg bg-green-500/10 text-green-500">
                <CheckCircle2 className="h-4 w-4" />
                <span className="text-sm">量子ビットの検証に成功しました</span>
              </div>
            )}
          </div>
        )}

        {!currentWindow && !getWindowMutation.isPending && (
          <div className="text-center py-8">
            <Zap className="h-12 w-12 mx-auto text-muted-foreground/50 mb-3" />
            <p className="text-muted-foreground">量子時間窓を取得してください</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
