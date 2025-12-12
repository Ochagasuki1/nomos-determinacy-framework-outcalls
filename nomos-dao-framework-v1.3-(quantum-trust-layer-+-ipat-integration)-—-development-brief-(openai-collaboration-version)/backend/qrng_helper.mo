import Text "mo:base/Text";
import Array "mo:base/Array";
import Nat "mo:base/Nat";

module {
  public type RandomWindow = {
    startTime : Nat;
    endTime : Nat;
    quantumBits : [Bool];
  };

  // 量子乱数時間窓を取得するヘルパー関数
  // 注意: この関数はactorコンテキストから呼び出される必要があります
  public func parseRandomWindowResponse(response : Text) : RandomWindow {
    // TODO: 実際のJSONパース実装
    // 現在はモックデータを返す
    {
      startTime = 0;
      endTime = 0;
      quantumBits = Array.tabulate(10, func(i : Nat) : Bool { i % 2 == 0 });
    };
  };

  // 量子ビット検証レスポンスをパースするヘルパー関数
  public func parseVerificationResponse(response : Text) : Bool {
    // TODO: 実際のJSONパース実装
    // 現在は常にtrueを返す
    true;
  };

  // 量子ビットを文字列に変換するヘルパー関数
  public func bitsToString(bits : [Bool]) : Text {
    Array.foldLeft<Bool, Text>(
      bits,
      "",
      func(acc, b) { acc # (if b { "1" } else { "0" }) }
    );
  };
};

