import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useSubmitQuantumPIS, useGetQuantumPISRecords } from '../hooks/useQueries';
import { Loader2, Sparkles, Shield, CheckCircle2, AlertCircle } from 'lucide-react';
import type { Proof } from '../backend';

export default function QuantumPISPanel() {
  const [proofInput, setProofInput] = useState('');
  const [publicSignalsInput, setPublicSignalsInput] = useState('');
  const [quantumBitsInput, setQuantumBitsInput] = useState('');
  
  const submitMutation = useSubmitQuantumPIS();
  const { data: pisRecords, isLoading: recordsLoading } = useGetQuantumPISRecords();

  const handleSubmit = async () => {
    try {
      const proof: Proof = JSON.parse(proofInput);
      const publicSignals: bigint[] = JSON.parse(publicSignalsInput).map((n: string) => BigInt(n));
      const quantumBits: boolean[] = JSON.parse(quantumBitsInput);

      await submitMutation.mutateAsync({ proof, publicSignals, quantumBits });
      
      setProofInput('');
      setPublicSignalsInput('');
      setQuantumBitsInput('');
    } catch (error) {
      console.error('Invalid input format:', error);
    }
  };

  const isValidInput = () => {
    try {
      if (!proofInput || !publicSignalsInput || !quantumBitsInput) return false;
      JSON.parse(proofInput);
      JSON.parse(publicSignalsInput);
      JSON.parse(quantumBitsInput);
      return true;
    } catch {
      return false;
    }
  };

  return (
    <div className="space-y-6">
      <Card className="border-border/50 bg-card/50 backdrop-blur">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-primary" />
              量子PIS提出
            </CardTitle>
            <Badge variant="outline" className="bg-gradient-to-r from-purple-500/10 to-pink-500/10">
              ZK-Proof + QRNG
            </Badge>
          </div>
          <CardDescription>
            ゼロ知識証明と量子乱数を組み合わせた意図性証明を提出
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="proof">Groth16証明 (JSON)</Label>
            <Textarea
              id="proof"
              placeholder='{"a": [...], "b": [[...], [...]], "c": [...]}'
              value={proofInput}
              onChange={(e) => setProofInput(e.target.value)}
              className="font-mono text-sm"
              rows={4}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="publicSignals">公開信号 (JSON配列)</Label>
            <Textarea
              id="publicSignals"
              placeholder='["123456789", "987654321"]'
              value={publicSignalsInput}
              onChange={(e) => setPublicSignalsInput(e.target.value)}
              className="font-mono text-sm"
              rows={2}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="quantumBits">量子ビット (JSON配列)</Label>
            <Textarea
              id="quantumBits"
              placeholder='[true, false, true, true, false]'
              value={quantumBitsInput}
              onChange={(e) => setQuantumBitsInput(e.target.value)}
              className="font-mono text-sm"
              rows={2}
            />
          </div>

          <Button
            onClick={handleSubmit}
            disabled={!isValidInput() || submitMutation.isPending}
            className="w-full"
          >
            {submitMutation.isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                提出中...
              </>
            ) : (
              <>
                <Sparkles className="mr-2 h-4 w-4" />
                量子PISを提出
              </>
            )}
          </Button>

          {submitMutation.isSuccess && (
            <div className="flex items-center gap-2 p-3 rounded-lg bg-green-500/10 text-green-500">
              <CheckCircle2 className="h-4 w-4" />
              <span className="text-sm">提出が成功しました！重み付けボーナスが適用されます。</span>
            </div>
          )}

          {submitMutation.isError && (
            <div className="flex items-center gap-2 p-3 rounded-lg bg-destructive/10 text-destructive">
              <AlertCircle className="h-4 w-4" />
              <span className="text-sm">提出に失敗しました。入力を確認してください。</span>
            </div>
          )}
        </CardContent>
      </Card>

      <Card className="border-border/50 bg-card/50 backdrop-blur">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" />
            量子PIS提出記録
          </CardTitle>
          <CardDescription>ユーザーの量子強化意図性証明の履歴</CardDescription>
        </CardHeader>
        <CardContent>
          {recordsLoading ? (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
            </div>
          ) : pisRecords && pisRecords.length > 0 ? (
            <div className="space-y-3">
              {pisRecords.map(([principal, record], index) => (
                <div
                  key={index}
                  className="p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
                >
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-xs font-mono text-muted-foreground truncate flex-1">
                      {principal.toString()}
                    </p>
                    <Badge variant="outline" className="ml-2">
                      {record.bonusWeight}x
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    タイムスタンプ: {new Date(Number(record.timestamp) / 1000000).toLocaleString('ja-JP')}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <Shield className="h-12 w-12 mx-auto text-muted-foreground/50 mb-3" />
              <p className="text-muted-foreground">量子PIS提出記録がありません</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
