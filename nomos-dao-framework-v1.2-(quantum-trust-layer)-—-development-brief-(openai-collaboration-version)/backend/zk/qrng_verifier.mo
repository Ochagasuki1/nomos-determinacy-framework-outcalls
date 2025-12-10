import Principal "mo:base/Principal";
import Text "mo:base/Text";
import Nat "mo:base/Nat";

module {
  // 量子ビットの真正性とタイムスタンプを検証する関数
  // 注意: この関数はactorコンテキストから呼び出される必要があります
  // モジュール内では直接HTTP呼び出しができないため、検証ロジックのみを提供
  
  // 量子ビットの基本検証
  public func validateQuantumBits(quantumBits : [Bool]) : Bool {
    // 256ビットの量子ビットが必要
    if (quantumBits.size() != 256) return false;
    
    // エントロピーチェック（完全に偏っていないか）
    let trueCount = countTrueBits(quantumBits);
    let ratio = Float.fromInt(trueCount) / 256.0;
    
    // 極端な偏りがないことを確認（10%-90%の範囲）
    ratio >= 0.1 and ratio <= 0.9;
  };

  // タイムスタンプの検証
  public func validateTimestamp(qrngTimestamp : Nat, currentTime : Nat) : Bool {
    // タイムスタンプが未来でないことを確認
    if (qrngTimestamp > currentTime) return false;
    
    // タイムスタンプが古すぎないことを確認（1時間以内）
    let oneHour : Nat = 3600_000_000_000; // ナノ秒
    currentTime - qrngTimestamp <= oneHour;
  };

  // Trueビットの数をカウント
  func countTrueBits(bits : [Bool]) : Int {
    var count : Int = 0;
    for (bit in bits.vals()) {
      if (bit) { count += 1 };
    };
    count;
  };
};
