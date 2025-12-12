import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Leaf, Wind, Globe, TrendingUp, Calculator, Info, Users, DollarSign, Cpu, Shield } from 'lucide-react';
import { useGetEnvironmentalWeights, useCalculateEnvironmentalDeterminacy, useCalculateIPATIntegration, useIsIPATEnabled, useToggleIPAT, useIsCallerAdmin } from '../hooks/useQueries';
import type { Event, IPATResult } from '../backend';

export default function EnvironmentalDeterminacyPanel() {
  const { data: weights } = useGetEnvironmentalWeights();
  const { data: ipatEnabled } = useIsIPATEnabled();
  const { data: isAdmin } = useIsCallerAdmin();
  const calculateEnvDt = useCalculateEnvironmentalDeterminacy();
  const calculateIPAT = useCalculateIPATIntegration();
  const toggleIPAT = useToggleIPAT();
  
  const [result, setResult] = useState<{
    baseDt: number;
    fairnessScore: number;
    adaptationScore: number;
  } | null>(null);
  
  const [ipatResult, setIpatResult] = useState<IPATResult | null>(null);

  const handleCalculate = async () => {
    const mockEvents: Event[] = [
      {
        userId: { __principal__: 'aaaaa-aa' } as any,
        actionType: 'climate_action_JP',
        timestamp: BigInt(Date.now() * 1_000_000),
        weight: 0.8,
      },
      {
        userId: { __principal__: 'bbbbb-bb' } as any,
        actionType: 'renewable_energy_US',
        timestamp: BigInt(Date.now() * 1_000_000),
        weight: 0.9,
      },
      {
        userId: { __principal__: 'ccccc-cc' } as any,
        actionType: 'carbon_reduction_EU',
        timestamp: BigInt(Date.now() * 1_000_000),
        weight: 0.85,
      },
      {
        userId: { __principal__: 'ddddd-dd' } as any,
        actionType: 'climate_tech_JP',
        timestamp: BigInt(Date.now() * 1_000_000),
        weight: 0.95,
      },
    ];

    const response = await calculateEnvDt.mutateAsync({
      events: mockEvents,
      timeWindow: BigInt(3600),
    });

    setResult({
      baseDt: response.baseDt,
      fairnessScore: response.fairnessScore,
      adaptationScore: response.adaptationScore,
    });

    if (ipatEnabled) {
      const ipatResponse = await calculateIPAT.mutateAsync({
        events: mockEvents,
        timeWindow: BigInt(3600),
      });
      setIpatResult(ipatResponse);
    }
  };

  const handleToggleIPAT = async () => {
    await toggleIPAT.mutateAsync(!ipatEnabled);
  };

  return (
    <div className="space-y-6">
      <Card className="border-border/50 bg-card/50 backdrop-blur">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Leaf className="h-5 w-5 text-green-500" />
              環境決定性拡張モジュール + IPAT統合
            </CardTitle>
            <Badge variant="outline" className="bg-gradient-to-r from-green-500/10 to-emerald-500/10">
              Layer 2 Extension v1.3
            </Badge>
          </div>
          <CardDescription>
            環境中心DAOのための決定性計算拡張（公平性・気候適応・IPAT統合）
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="p-4 rounded-lg bg-gradient-to-r from-green-500/5 to-emerald-500/5 border border-green-500/20">
            <div className="flex items-start gap-3">
              <Info className="h-5 w-5 text-green-500 mt-0.5" />
              <div className="space-y-2">
                <h4 className="text-sm font-medium">環境決定性 + IPAT統合の概要</h4>
                <p className="text-xs text-muted-foreground">
                  環境決定性拡張モジュールは、従来の決定性計算（一貫性、タイミング、意図）に加えて、
                  環境公平性（F）と気候適応（A）の2つの新しいメトリクスを統合します。
                </p>
                <p className="text-xs text-muted-foreground">
                  IPAT統合レイヤーは、人口（P）、豊かさ（A）、技術（T）の三要素による環境影響を定量化し、
                  適応要因による軽減効果を考慮した調整済み決定性スコアを算出します。
                </p>
                <p className="text-xs text-muted-foreground font-medium">
                  調整式: adjustedDeterminacy = baseEnvironmentalDeterminacy / (1 + impact)
                </p>
              </div>
            </div>
          </div>

          {isAdmin && (
            <div className="flex items-center justify-between p-4 rounded-lg bg-muted/50 border border-border/50">
              <div className="flex items-center gap-3">
                <Shield className="h-5 w-5 text-blue-500" />
                <div>
                  <Label htmlFor="ipat-toggle" className="text-sm font-medium">IPAT統合</Label>
                  <p className="text-xs text-muted-foreground">環境影響修正子の有効/無効を切り替え</p>
                </div>
              </div>
              <Switch
                id="ipat-toggle"
                checked={ipatEnabled ?? false}
                onCheckedChange={handleToggleIPAT}
                disabled={toggleIPAT.isPending}
              />
            </div>
          )}

          {weights && (
            <div className="space-y-4">
              <h4 className="text-sm font-medium text-muted-foreground">環境重み定数</h4>
              <div className="grid gap-3 md:grid-cols-5">
                <div className="space-y-2 p-3 rounded-lg bg-muted/50">
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-blue-500" />
                    <span className="text-xs text-muted-foreground">一貫性</span>
                  </div>
                  <p className="text-lg font-bold">{(weights.consistencyWeight * 100).toFixed(0)}%</p>
                  <Progress value={weights.consistencyWeight * 100} className="h-1" />
                </div>
                <div className="space-y-2 p-3 rounded-lg bg-muted/50">
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-purple-500" />
                    <span className="text-xs text-muted-foreground">タイミング</span>
                  </div>
                  <p className="text-lg font-bold">{(weights.timingWeight * 100).toFixed(0)}%</p>
                  <Progress value={weights.timingWeight * 100} className="h-1" />
                </div>
                <div className="space-y-2 p-3 rounded-lg bg-muted/50">
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-pink-500" />
                    <span className="text-xs text-muted-foreground">意図</span>
                  </div>
                  <p className="text-lg font-bold">{(weights.intentWeight * 100).toFixed(0)}%</p>
                  <Progress value={weights.intentWeight * 100} className="h-1" />
                </div>
                <div className="space-y-2 p-3 rounded-lg bg-muted/50">
                  <div className="flex items-center gap-2">
                    <Globe className="h-3 w-3 text-green-500" />
                    <span className="text-xs text-muted-foreground">公平性 (F)</span>
                  </div>
                  <p className="text-lg font-bold">{(weights.fairnessWeight * 100).toFixed(0)}%</p>
                  <Progress value={weights.fairnessWeight * 100} className="h-1" />
                </div>
                <div className="space-y-2 p-3 rounded-lg bg-muted/50">
                  <div className="flex items-center gap-2">
                    <Wind className="h-3 w-3 text-emerald-500" />
                    <span className="text-xs text-muted-foreground">適応 (A)</span>
                  </div>
                  <p className="text-lg font-bold">{(weights.adaptationWeight * 100).toFixed(0)}%</p>
                  <Progress value={weights.adaptationWeight * 100} className="h-1" />
                </div>
              </div>
            </div>
          )}

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-medium text-muted-foreground">環境決定性 + IPAT計算テスト</h4>
              <Button
                onClick={handleCalculate}
                disabled={calculateEnvDt.isPending || calculateIPAT.isPending}
                size="sm"
                className="gap-2"
              >
                <Calculator className="h-4 w-4" />
                {calculateEnvDt.isPending || calculateIPAT.isPending ? '計算中...' : '計算実行'}
              </Button>
            </div>

            {result && (
              <div className="space-y-3">
                <div className="p-4 rounded-lg bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/30">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-medium">基本環境決定性スコア (baseDt)</span>
                    <span className="text-2xl font-bold text-green-500">
                      {(result.baseDt * 100).toFixed(1)}%
                    </span>
                  </div>
                  <Progress value={result.baseDt * 100} className="h-2" />
                </div>

                <div className="grid gap-3 md:grid-cols-2">
                  <div className="p-4 rounded-lg bg-muted/50 border border-border/50">
                    <div className="flex items-center gap-2 mb-2">
                      <Globe className="h-4 w-4 text-green-500" />
                      <span className="text-sm font-medium">環境公平性 (F)</span>
                    </div>
                    <p className="text-xl font-bold mb-2">{(result.fairnessScore * 100).toFixed(1)}%</p>
                    <Progress value={result.fairnessScore * 100} className="h-1.5" />
                    <p className="text-xs text-muted-foreground mt-2">
                      地域間・世代間の平等性評価
                    </p>
                  </div>

                  <div className="p-4 rounded-lg bg-muted/50 border border-border/50">
                    <div className="flex items-center gap-2 mb-2">
                      <Wind className="h-4 w-4 text-emerald-500" />
                      <span className="text-sm font-medium">気候適応 (A)</span>
                    </div>
                    <p className="text-xl font-bold mb-2">{(result.adaptationScore * 100).toFixed(1)}%</p>
                    <Progress value={result.adaptationScore * 100} className="h-1.5" />
                    <p className="text-xs text-muted-foreground mt-2">
                      気候変動適応能力の評価
                    </p>
                  </div>
                </div>
              </div>
            )}

            {ipatResult && ipatEnabled && result && (
              <div className="space-y-3 mt-6">
                <div className="flex items-center gap-2 mb-3">
                  <TrendingUp className="h-5 w-5 text-orange-500" />
                  <h4 className="text-sm font-medium">IPAT統合結果</h4>
                  <Badge variant="outline" className="bg-orange-500/10 text-orange-500 border-orange-500/30">
                    v1.3 New
                  </Badge>
                </div>

                <div className="grid gap-3 md:grid-cols-4">
                  <div className="p-4 rounded-lg bg-gradient-to-br from-blue-500/10 to-blue-600/10 border border-blue-500/30">
                    <div className="flex items-center gap-2 mb-2">
                      <Users className="h-4 w-4 text-blue-500" />
                      <span className="text-xs font-medium">人口要因 (P)</span>
                    </div>
                    <p className="text-2xl font-bold text-blue-500">{ipatResult.factors.population.toFixed(2)}</p>
                    <p className="text-xs text-muted-foreground mt-1">ユニークユーザー数</p>
                  </div>

                  <div className="p-4 rounded-lg bg-gradient-to-br from-yellow-500/10 to-yellow-600/10 border border-yellow-500/30">
                    <div className="flex items-center gap-2 mb-2">
                      <DollarSign className="h-4 w-4 text-yellow-500" />
                      <span className="text-xs font-medium">豊かさ要因 (A)</span>
                    </div>
                    <p className="text-2xl font-bold text-yellow-500">{ipatResult.factors.affluence.toFixed(2)}</p>
                    <p className="text-xs text-muted-foreground mt-1">平均イベント重み</p>
                  </div>

                  <div className="p-4 rounded-lg bg-gradient-to-br from-purple-500/10 to-purple-600/10 border border-purple-500/30">
                    <div className="flex items-center gap-2 mb-2">
                      <Cpu className="h-4 w-4 text-purple-500" />
                      <span className="text-xs font-medium">技術要因 (T)</span>
                    </div>
                    <p className="text-2xl font-bold text-purple-500">{ipatResult.factors.technology.toFixed(2)}</p>
                    <p className="text-xs text-muted-foreground mt-1">アクション多様性</p>
                  </div>

                  <div className="p-4 rounded-lg bg-gradient-to-br from-emerald-500/10 to-emerald-600/10 border border-emerald-500/30">
                    <div className="flex items-center gap-2 mb-2">
                      <Wind className="h-4 w-4 text-emerald-500" />
                      <span className="text-xs font-medium">適応要因</span>
                    </div>
                    <p className="text-2xl font-bold text-emerald-500">{ipatResult.factors.adaptations.toFixed(2)}</p>
                    <p className="text-xs text-muted-foreground mt-1">影響軽減効果</p>
                  </div>
                </div>

                <div className="p-4 rounded-lg bg-gradient-to-r from-orange-500/10 to-red-500/10 border border-orange-500/30">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <TrendingUp className="h-4 w-4 text-orange-500" />
                      <span className="text-sm font-medium">統合環境影響 (Impact)</span>
                    </div>
                    <span className="text-2xl font-bold text-orange-500">
                      {ipatResult.impact.toFixed(3)}
                    </span>
                  </div>
                  <Progress value={Math.min(100, ipatResult.impact * 50)} className="h-2 mb-2" />
                  <p className="text-xs text-muted-foreground">
                    Impact = (P × A × T) / (1 + Adaptation) = ({ipatResult.factors.population.toFixed(2)} × {ipatResult.factors.affluence.toFixed(2)} × {ipatResult.factors.technology.toFixed(2)}) / (1 + {ipatResult.factors.adaptations.toFixed(2)})
                  </p>
                </div>

                <div className="p-4 rounded-lg bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/30">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <Leaf className="h-4 w-4 text-green-500" />
                      <span className="text-sm font-medium">調整済み環境決定性</span>
                    </div>
                    <span className="text-2xl font-bold text-green-500">
                      {(ipatResult.adjustedDeterminacy * 100).toFixed(1)}%
                    </span>
                  </div>
                  <Progress value={ipatResult.adjustedDeterminacy * 100} className="h-2 mb-2" />
                  <p className="text-xs text-muted-foreground">
                    adjustedDeterminacy = baseDt / (1 + impact) = {(result.baseDt * 100).toFixed(1)}% / (1 + {ipatResult.impact.toFixed(3)})
                  </p>
                </div>
              </div>
            )}
          </div>

          <div className="space-y-3">
            <h4 className="text-sm font-medium text-muted-foreground">実装詳細</h4>
            <div className="space-y-2 text-xs text-muted-foreground">
              <div className="flex items-start gap-2">
                <TrendingUp className="h-4 w-4 mt-0.5 text-green-500" />
                <div>
                  <p className="font-medium">calculateFairness(events, timeWindow)</p>
                  <p>地域分布と世代分布のバランスを評価し、地域間・世代間公平性スコアを算出</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <Wind className="h-4 w-4 mt-0.5 text-emerald-500" />
                <div>
                  <p className="font-medium">calculateClimateAdaptation(events, timeWindow)</p>
                  <p>年次変化率、イベント件数、アクション多様性、インパクトレベルから気候適応スコアを算出</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <Users className="h-4 w-4 mt-0.5 text-blue-500" />
                <div>
                  <p className="font-medium">calculatePopulationFactor(events)</p>
                  <p>ユニークユーザー数を正規化して人口要因スコアを算出（100ユーザーで1.0）</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <DollarSign className="h-4 w-4 mt-0.5 text-yellow-500" />
                <div>
                  <p className="font-medium">calculateAffluenceFactor(events)</p>
                  <p>イベントの平均重みを豊かさの指標として算出</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <Cpu className="h-4 w-4 mt-0.5 text-purple-500" />
                <div>
                  <p className="font-medium">calculateTechnologyFactor(events)</p>
                  <p>アクションタイプの多様性を技術の指標として算出（10種類で1.0）</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <Calculator className="h-4 w-4 mt-0.5 text-orange-500" />
                <div>
                  <p className="font-medium">calculateIPATIntegration(events, timeWindow)</p>
                  <p>IPAT方程式による環境影響を計算し、調整済み決定性スコアを算出</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-border/50 bg-card/50 backdrop-blur">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Info className="h-5 w-5 text-blue-500" />
            後方互換性とIPAT切り替え
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <p className="text-sm text-muted-foreground">
            環境決定性拡張モジュールとIPAT統合レイヤーは、既存のDₜ計算式との完全な後方互換性を維持しています。
          </p>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li className="flex items-start gap-2">
              <div className="h-1.5 w-1.5 rounded-full bg-green-500 mt-1.5" />
              <span>engineId="carbon"または"climate"の場合のみ環境決定性計算を使用</span>
            </li>
            <li className="flex items-start gap-2">
              <div className="h-1.5 w-1.5 rounded-full bg-green-500 mt-1.5" />
              <span>その他のエンジンでは従来のcalculateDeterminacy()を継続使用</span>
            </li>
            <li className="flex items-start gap-2">
              <div className="h-1.5 w-1.5 rounded-full bg-green-500 mt-1.5" />
              <span>IPAT統合は管理者が有効/無効を切り替え可能</span>
            </li>
            <li className="flex items-start gap-2">
              <div className="h-1.5 w-1.5 rounded-full bg-green-500 mt-1.5" />
              <span>IPAT無効時は基本環境決定性スコアのみを使用</span>
            </li>
            <li className="flex items-start gap-2">
              <div className="h-1.5 w-1.5 rounded-full bg-green-500 mt-1.5" />
              <span>既存のLayer 2出力データ構造は変更なし</span>
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}

