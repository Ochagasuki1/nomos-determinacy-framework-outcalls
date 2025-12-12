import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Dna, Shield, FileCheck, ScrollText, Coins, Zap, AlertTriangle, Scale, Info } from 'lucide-react';
import { useGetGGMConstants, useCheckCallerDeterminacyThreshold, useGetCallerGenomicData, useGetCallerLicense, useGetActiveCharters, useGetCallerDebtRecords, useGetCallerCompensationRecords, useGetActiveEmergencies, useGetCallerSanctionRecords } from '../hooks/useQueries';

export default function GenomicGovernancePanel() {
  const { data: constants, isLoading: constantsLoading } = useGetGGMConstants();
  const { data: meetsThreshold, isLoading: thresholdLoading } = useCheckCallerDeterminacyThreshold();
  const { data: genomicData, isLoading: genomicLoading } = useGetCallerGenomicData();
  const { data: license, isLoading: licenseLoading } = useGetCallerLicense();
  const { data: charters, isLoading: chartersLoading } = useGetActiveCharters();
  const { data: debts, isLoading: debtsLoading } = useGetCallerDebtRecords();
  const { data: compensations, isLoading: compensationsLoading } = useGetCallerCompensationRecords();
  const { data: emergencies, isLoading: emergenciesLoading } = useGetActiveEmergencies();
  const { data: sanctions, isLoading: sanctionsLoading } = useGetCallerSanctionRecords();

  const isLoading = constantsLoading || thresholdLoading || genomicLoading || licenseLoading || chartersLoading || debtsLoading || compensationsLoading || emergenciesLoading || sanctionsLoading;

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Dna className="h-5 w-5" />
            ゲノムガバナンスモジュール (GGM) v1.0
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  const unsettledDebts = debts?.filter(d => !d.settled) || [];
  const activeSanctions = sanctions?.filter(s => s.active) || [];

  return (
    <div className="space-y-6">
      {/* Hero Section */}
      <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-secondary/5">
        <CardHeader>
          <div className="flex items-start justify-between">
            <div className="space-y-2">
              <CardTitle className="flex items-center gap-2 text-2xl">
                <Dna className="h-6 w-6 text-primary" />
                ゲノムガバナンスモジュール (GGM) v1.0
              </CardTitle>
              <CardDescription className="text-base">
                バイオメトリクスとゲノムデータを活用した次世代ガバナンスシステム
              </CardDescription>
            </div>
            <img 
              src="/assets/generated/genomic-governance-hero.dim_800x600.png" 
              alt="Genomic Governance Hero" 
              className="h-24 w-32 object-cover rounded-lg shadow-md hidden md:block"
            />
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Status Overview */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">決定性閾値</p>
              <div className="flex items-center gap-2">
                {meetsThreshold ? (
                  <Badge variant="default" className="gap-1">
                    <Shield className="h-3 w-3" />
                    適格
                  </Badge>
                ) : (
                  <Badge variant="destructive" className="gap-1">
                    <AlertTriangle className="h-3 w-3" />
                    不適格
                  </Badge>
                )}
              </div>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">ゲノムデータ</p>
              <div className="flex items-center gap-2">
                {genomicData ? (
                  <Badge variant="default" className="gap-1">
                    <FileCheck className="h-3 w-3" />
                    登録済み
                  </Badge>
                ) : (
                  <Badge variant="outline" className="gap-1">
                    <Info className="h-3 w-3" />
                    未登録
                  </Badge>
                )}
              </div>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">ライセンス</p>
              <div className="flex items-center gap-2">
                {license?.active ? (
                  <Badge variant="default" className="gap-1">
                    <FileCheck className="h-3 w-3" />
                    有効
                  </Badge>
                ) : (
                  <Badge variant="outline" className="gap-1">
                    <Info className="h-3 w-3" />
                    なし
                  </Badge>
                )}
              </div>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">制裁</p>
              <div className="flex items-center gap-2">
                {activeSanctions.length > 0 ? (
                  <Badge variant="destructive" className="gap-1">
                    <AlertTriangle className="h-3 w-3" />
                    {activeSanctions.length}件
                  </Badge>
                ) : (
                  <Badge variant="default" className="gap-1">
                    <Shield className="h-3 w-3" />
                    なし
                  </Badge>
                )}
              </div>
            </div>
          </div>

          {/* Constants Display */}
          {constants && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t">
              <div className="space-y-1">
                <p className="text-xs text-muted-foreground">全塩基対数</p>
                <p className="text-sm font-mono">{constants.totalBP.toLocaleString()}</p>
              </div>
              <div className="space-y-1">
                <p className="text-xs text-muted-foreground">閾値塩基対数</p>
                <p className="text-sm font-mono">{constants.thresholdBP.toLocaleString()}</p>
              </div>
              <div className="space-y-1">
                <p className="text-xs text-muted-foreground">最小Dₜ</p>
                <p className="text-sm font-mono">{constants.minDt.toFixed(2)}</p>
              </div>
              <div className="space-y-1">
                <p className="text-xs text-muted-foreground">違反ペナルティDₜ</p>
                <p className="text-sm font-mono">{constants.violationDt.toFixed(2)}</p>
              </div>
            </div>
          )}

          {/* Warnings */}
          {!meetsThreshold && (
            <Alert variant="destructive">
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>
                決定性閾値（Dₜ ≥ 0.82）を満たしていません。ゲノムガバナンス機能の利用には決定性の向上が必要です。
              </AlertDescription>
            </Alert>
          )}

          {emergencies && emergencies.length > 0 && (
            <Alert variant="destructive">
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>
                {emergencies.length}件の緊急事態が発生しています。
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>

      {/* Tabs for Sub-Canisters */}
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-4 md:grid-cols-8">
          <TabsTrigger value="overview">概要</TabsTrigger>
          <TabsTrigger value="registry">Registry</TabsTrigger>
          <TabsTrigger value="license">License</TabsTrigger>
          <TabsTrigger value="charter">Charter</TabsTrigger>
          <TabsTrigger value="debt">Debt</TabsTrigger>
          <TabsTrigger value="compensator">補償</TabsTrigger>
          <TabsTrigger value="emergency">緊急</TabsTrigger>
          <TabsTrigger value="sanctions">制裁</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4 mt-6">
          <div className="grid md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Dna className="h-5 w-5" />
                  ゲノムデータ
                </CardTitle>
              </CardHeader>
              <CardContent>
                {genomicData ? (
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">登録日時</p>
                    <p className="text-sm font-mono">{new Date(Number(genomicData.timestamp) / 1000000).toLocaleString('ja-JP')}</p>
                    <p className="text-sm text-muted-foreground mt-2">検証状態</p>
                    <Badge variant={genomicData.verified ? "default" : "outline"}>
                      {genomicData.verified ? "検証済み" : "未検証"}
                    </Badge>
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground">ゲノムデータが登録されていません</p>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Coins className="h-5 w-5" />
                  債務・補償
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground">未決済債務</p>
                  <p className="text-2xl font-bold">{unsettledDebts.length}件</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">補償記録</p>
                  <p className="text-2xl font-bold">{compensations?.length || 0}件</p>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <ScrollText className="h-5 w-5" />
                アクティブ憲章
              </CardTitle>
            </CardHeader>
            <CardContent>
              {charters && charters.length > 0 ? (
                <div className="space-y-2">
                  {charters.map((charter) => (
                    <div key={charter.id} className="p-3 border rounded-lg">
                      <p className="font-medium">{charter.title}</p>
                      <p className="text-sm text-muted-foreground mt-1">{charter.content.substring(0, 100)}...</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">アクティブな憲章がありません</p>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="registry" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Dna className="h-5 w-5" />
                ゲノムデータレジストリ
              </CardTitle>
              <CardDescription>
                暗号化されたゲノムデータの登録と管理
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                ゲノムデータ登録機能は開発中です。FHE暗号化とZK証明による安全なゲノム比較機能を実装予定です。
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="license" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileCheck className="h-5 w-5" />
                ライセンス管理
              </CardTitle>
              <CardDescription>
                ゲノムガバナンス参加ライセンスの管理
              </CardDescription>
            </CardHeader>
            <CardContent>
              {license ? (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">ライセンスタイプ</p>
                      <p className="font-medium">{license.licenseType}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">状態</p>
                      <Badge variant={license.active ? "default" : "outline"}>
                        {license.active ? "有効" : "無効"}
                      </Badge>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">発行日時</p>
                      <p className="text-sm font-mono">{new Date(Number(license.issuedAt) / 1000000).toLocaleString('ja-JP')}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">有効期限</p>
                      <p className="text-sm font-mono">{new Date(Number(license.expiresAt) / 1000000).toLocaleString('ja-JP')}</p>
                    </div>
                  </div>
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">ライセンスが発行されていません</p>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="charter" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ScrollText className="h-5 w-5" />
                憲章管理
              </CardTitle>
              <CardDescription>
                ゲノムガバナンスの憲章とルール
              </CardDescription>
            </CardHeader>
            <CardContent>
              {charters && charters.length > 0 ? (
                <div className="space-y-4">
                  {charters.map((charter) => (
                    <div key={charter.id} className="p-4 border rounded-lg space-y-2">
                      <div className="flex items-center justify-between">
                        <h3 className="font-medium">{charter.title}</h3>
                        <Badge variant="default">アクティブ</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{charter.content}</p>
                      <p className="text-xs text-muted-foreground">
                        作成日時: {new Date(Number(charter.createdAt) / 1000000).toLocaleString('ja-JP')}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">アクティブな憲章がありません</p>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="debt" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Coins className="h-5 w-5" />
                債務管理
              </CardTitle>
              <CardDescription>
                ゲノムガバナンス関連の債務記録
              </CardDescription>
            </CardHeader>
            <CardContent>
              {debts && debts.length > 0 ? (
                <div className="space-y-4">
                  {debts.map((debt, index) => (
                    <div key={index} className="p-4 border rounded-lg space-y-2">
                      <div className="flex items-center justify-between">
                        <p className="font-medium">金額: {debt.amount.toFixed(2)}</p>
                        <Badge variant={debt.settled ? "default" : "destructive"}>
                          {debt.settled ? "決済済み" : "未決済"}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{debt.reason}</p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(Number(debt.timestamp) / 1000000).toLocaleString('ja-JP')}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">債務記録がありません</p>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="compensator" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-5 w-5" />
                量子ランダム補償
              </CardTitle>
              <CardDescription>
                QRNG Helperを使用した決定性補償システム
              </CardDescription>
            </CardHeader>
            <CardContent>
              {compensations && compensations.length > 0 ? (
                <div className="space-y-4">
                  {compensations.map((comp, index) => (
                    <div key={index} className="p-4 border rounded-lg space-y-2">
                      <div className="flex items-center justify-between">
                        <p className="font-medium">{comp.compensationType}</p>
                        <Badge variant="default">+{comp.amount.toFixed(3)}</Badge>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {new Date(Number(comp.timestamp) / 1000000).toLocaleString('ja-JP')}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">補償記録がありません</p>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="emergency" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5" />
                緊急事態管理
              </CardTitle>
              <CardDescription>
                システムの緊急事態とフェイルセーフ
              </CardDescription>
            </CardHeader>
            <CardContent>
              {emergencies && emergencies.length > 0 ? (
                <div className="space-y-4">
                  {emergencies.map((emergency) => (
                    <div key={emergency.id} className="p-4 border rounded-lg space-y-2">
                      <div className="flex items-center justify-between">
                        <p className="font-medium">{emergency.eventType}</p>
                        <Badge variant="destructive">重大度: {Number(emergency.severity)}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{emergency.details}</p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(Number(emergency.timestamp) / 1000000).toLocaleString('ja-JP')}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">アクティブな緊急事態はありません</p>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="sanctions" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Scale className="h-5 w-5" />
                制裁管理
              </CardTitle>
              <CardDescription>
                違反処理と決定性ペナルティ
              </CardDescription>
            </CardHeader>
            <CardContent>
              {sanctions && sanctions.length > 0 ? (
                <div className="space-y-4">
                  {sanctions.map((sanction, index) => (
                    <div key={index} className="p-4 border rounded-lg space-y-2">
                      <div className="flex items-center justify-between">
                        <p className="font-medium">{sanction.sanctionType}</p>
                        <Badge variant={sanction.active ? "destructive" : "outline"}>
                          {sanction.active ? "アクティブ" : "解除済み"}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{sanction.reason}</p>
                      <p className="text-sm font-mono">Dₜペナルティ: -{sanction.dtPenalty.toFixed(2)}</p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(Number(sanction.timestamp) / 1000000).toLocaleString('ja-JP')}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">制裁記録がありません</p>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
