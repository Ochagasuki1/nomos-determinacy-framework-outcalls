import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Brain, CheckCircle2, XCircle, AlertCircle, Loader2, Plus, X } from 'lucide-react';
import { useEvaluateIntentEthics } from '../hooks/useQueries';
import type { EthicalEvalResult } from '../backend';

export default function EthicalEvaluationPanel() {
  const [intent, setIntent] = useState('');
  const [actions, setActions] = useState<string[]>(['']);
  const [dtScore, setDtScore] = useState('0.85');
  const [result, setResult] = useState<EthicalEvalResult | null>(null);

  const evaluateMutation = useEvaluateIntentEthics();

  const handleAddAction = () => {
    setActions([...actions, '']);
  };

  const handleRemoveAction = (index: number) => {
    setActions(actions.filter((_, i) => i !== index));
  };

  const handleActionChange = (index: number, value: string) => {
    const newActions = [...actions];
    newActions[index] = value;
    setActions(newActions);
  };

  const handleEvaluate = async () => {
    const filteredActions = actions.filter(a => a.trim() !== '');
    if (!intent.trim() || filteredActions.length === 0) {
      return;
    }

    const score = parseFloat(dtScore);
    if (isNaN(score) || score < 0 || score > 1) {
      return;
    }

    try {
      const evalResult = await evaluateMutation.mutateAsync({
        intent: intent.trim(),
        actions: filteredActions,
        dtScore: score,
      });
      setResult(evalResult);
    } catch (error) {
      setResult(null);
    }
  };

  const getCoherenceColor = (coherence: number) => {
    if (coherence >= 0.85) return 'text-green-500';
    if (coherence >= 0.65) return 'text-yellow-500';
    return 'text-red-500';
  };

  const getCoherenceBadge = (coherence: number) => {
    if (coherence >= 0.85) return { variant: 'default' as const, label: '高整合性' };
    if (coherence >= 0.65) return { variant: 'secondary' as const, label: '中整合性' };
    return { variant: 'destructive' as const, label: '低整合性' };
  };

  return (
    <Card className="border-border/50 bg-card/50 backdrop-blur">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Brain className="h-5 w-5 text-primary" />
          AI倫理評価パネル
        </CardTitle>
        <CardDescription>
          意図、行動、決定性スコアに基づくAI倫理評価を実行します
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="intent">意図 (Intent)</Label>
            <Textarea
              id="intent"
              placeholder="評価する意図を入力してください..."
              value={intent}
              onChange={(e) => setIntent(e.target.value)}
              rows={3}
              className="resize-none"
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label>行動リスト (Actions)</Label>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={handleAddAction}
                className="h-8"
              >
                <Plus className="h-4 w-4 mr-1" />
                追加
              </Button>
            </div>
            <div className="space-y-2">
              {actions.map((action, index) => (
                <div key={index} className="flex gap-2">
                  <Input
                    placeholder={`行動 ${index + 1}`}
                    value={action}
                    onChange={(e) => handleActionChange(index, e.target.value)}
                  />
                  {actions.length > 1 && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => handleRemoveAction(index)}
                      className="shrink-0"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="dtScore">決定性スコア (Dₜ)</Label>
            <Input
              id="dtScore"
              type="number"
              min="0"
              max="1"
              step="0.01"
              value={dtScore}
              onChange={(e) => setDtScore(e.target.value)}
              placeholder="0.85"
            />
            <p className="text-xs text-muted-foreground">
              0.0 〜 1.0 の範囲で入力してください（推奨: 0.82以上）
            </p>
          </div>

          <Button
            onClick={handleEvaluate}
            disabled={evaluateMutation.isPending || !intent.trim() || actions.every(a => !a.trim())}
            className="w-full"
          >
            {evaluateMutation.isPending ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                評価中...
              </>
            ) : (
              <>
                <Brain className="h-4 w-4 mr-2" />
                倫理評価を実行
              </>
            )}
          </Button>
        </div>

        {result && (
          <>
            <Separator />
            <div className="space-y-4">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                評価結果
                {result.valid ? (
                  <CheckCircle2 className="h-5 w-5 text-green-500" />
                ) : (
                  <XCircle className="h-5 w-5 text-red-500" />
                )}
              </h3>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2 p-4 rounded-lg bg-muted/50">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">検証状態</span>
                    <Badge variant={result.valid ? 'default' : 'destructive'}>
                      {result.valid ? '有効' : '無効'}
                    </Badge>
                  </div>
                </div>

                <div className="space-y-2 p-4 rounded-lg bg-muted/50">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">整合性スコア</span>
                    <div className="flex items-center gap-2">
                      <span className={`text-lg font-bold ${getCoherenceColor(result.coherence)}`}>
                        {(result.coherence * 100).toFixed(1)}%
                      </span>
                      <Badge variant={getCoherenceBadge(result.coherence).variant}>
                        {getCoherenceBadge(result.coherence).label}
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-2 p-4 rounded-lg bg-muted/50">
                <div className="flex items-center gap-2 text-sm font-medium">
                  <AlertCircle className="h-4 w-4 text-primary" />
                  評価ノート
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {result.notes}
                </p>
              </div>

              <div className="p-4 rounded-lg bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-border/50">
                <h4 className="text-sm font-medium mb-2">評価基準</h4>
                <ul className="text-xs text-muted-foreground space-y-1">
                  <li>• 整合性スコア ≥ 85%: 高い倫理的整合性</li>
                  <li>• 整合性スコア 65-84%: 中程度の倫理的整合性</li>
                  <li>• 整合性スコア &lt; 65%: 低い倫理的整合性（要改善）</li>
                  <li>• 決定性スコア ≥ 0.82: ガバナンス参加の最低基準</li>
                </ul>
              </div>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}
