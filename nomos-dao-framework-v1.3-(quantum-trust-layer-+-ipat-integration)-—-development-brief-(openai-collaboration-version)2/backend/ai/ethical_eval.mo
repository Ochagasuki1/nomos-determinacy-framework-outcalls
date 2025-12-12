import OutCall "../http-outcalls/outcall";
import Text "mo:base/Text";
import Float "mo:base/Float";
import Array "mo:base/Array";

module {
  public type EthicalEvalResult = {
    valid : Bool;
    coherence : Float;
    notes : Text;
  };

  public func evaluateEthics(intent : Text, actions : [Text], dtScore : Float, transform : OutCall.Transform) : async EthicalEvalResult {
    let actionsStr = Array.foldLeft<Text, Text>(
      actions,
      "",
      func(acc, action) {
        if (acc == "") {
          action;
        } else {
          acc # "\", \"" # action;
        };
      },
    );
    let payload = "{ \"intent\": \"" # intent # "\", \"actions\": [\"" # actionsStr # "\"], \"dtScore\": " # Float.toText(dtScore) # " }";
    let _ = await OutCall.httpPostRequest("/ai/ethical-eval", [], payload, transform);

    // 仮のパース結果（本来はHTTPレスポンスをパース）
    {
      valid = true;
      coherence = 0.95;
      notes = "倫理評価成功: " # intent;
    };
  };
};

