import Principal "mo:base/Principal";
import OrderedMap "mo:base/OrderedMap";
import Array "mo:base/Array";
import Iter "mo:base/Iter";
import Float "mo:base/Float";
import Int "mo:base/Int";
import Nat "mo:base/Nat";

module {
  // イベント型
  public type Event = {
    userId : Principal;
    actionType : Text;
    timestamp : Int;
    weight : Float;
  };

  // メンバー決定性型
  public type MemberDeterminacy = {
    memberId : Principal;
    averageDeterminacy : Float;
    eventCount : Nat;
  };

  // 決定性診断型
  public type DeterminacyDiagnostics = {
    totalEvents : Nat;
    averageDeterminacy : Float;
    timeWindow : Int;
  };

  // 決定性計算
  public func calculateDeterminacy(events : [Event], timeWindow : Int) : Float {
    if (events.size() == 0) return 0.0;

    let currentTime = 0;
    let filteredEvents = Array.filter(
      events,
      func(e : Event) : Bool {
        currentTime - e.timestamp <= timeWindow;
      },
    );

    if (filteredEvents.size() == 0) return 0.0;

    let consistencyScore = calculateConsistency(filteredEvents);
    let timingScore = calculateTimingRegularity(filteredEvents);
    let intentScore = calculateIntentStrength(filteredEvents);

    let determinacy = (consistencyScore + timingScore + intentScore) / 3.0;
    Float.min(1.0, Float.max(0.0, determinacy));
  };

  // 一貫性計算
  func calculateConsistency(events : [Event]) : Float {
    if (events.size() == 0) return 0.0;

    let actionTypes = Array.map(
      events,
      func(e : Event) : Text {
        e.actionType;
      },
    );

    let uniqueActions = Array.foldLeft<Text, [Text]>(
      actionTypes,
      [],
      func(acc, action) {
        if (Array.find(acc, func(a : Text) : Bool { a == action }) == null) {
          Array.append(acc, [action]);
        } else {
          acc;
        };
      },
    );

    let consistency = 1.0 - Float.fromInt(uniqueActions.size() - 1) / Float.fromInt(events.size());
    Float.min(1.0, Float.max(0.0, consistency));
  };

  // タイミング規則性計算
  func calculateTimingRegularity(events : [Event]) : Float {
    if (events.size() < 2) return 0.0;

    let sortedEvents = Array.sort(
      events,
      func(a : Event, b : Event) : { #less; #equal; #greater } {
        Int.compare(a.timestamp, b.timestamp);
      },
    );

    let intervals = Array.tabulate<Float>(
      sortedEvents.size() - 1,
      func(i : Nat) : Float {
        Float.fromInt(sortedEvents[i + 1].timestamp - sortedEvents[i].timestamp);
      },
    );

    let avgInterval = Array.foldLeft<Float, Float>(
      intervals,
      0.0,
      func(acc, interval) { acc + interval },
    ) / Float.fromInt(intervals.size());

    let variance = Array.foldLeft<Float, Float>(
      intervals,
      0.0,
      func(acc, interval) {
        acc + Float.abs(interval - avgInterval);
      },
    ) / Float.fromInt(intervals.size());

    let regularity = 1.0 - Float.min(1.0, variance / avgInterval);
    Float.min(1.0, Float.max(0.0, regularity));
  };

  // 意図強度計算
  func calculateIntentStrength(events : [Event]) : Float {
    if (events.size() == 0) return 0.0;

    let totalWeight = Array.foldLeft<Event, Float>(
      events,
      0.0,
      func(acc, event) { acc + event.weight },
    );

    let intentStrength = Float.min(1.0, totalWeight / Float.fromInt(events.size()));
    Float.min(1.0, Float.max(0.0, intentStrength));
  };

  // メンバー別決定性平均取得
  public func getMemberDeterminacyAverages() : [MemberDeterminacy] {
    let principalMap = OrderedMap.Make<Principal>(Principal.compare);
    let memberMap = principalMap.empty<[Event]>();
    let memberEvents = principalMap.map<[Event], [Event]>(
      memberMap,
      func(_id, events) { events },
    );

    Iter.toArray(
      principalMap.vals(
        principalMap.map<[Event], MemberDeterminacy>(
          memberEvents,
          func(id, events) {
            {
              memberId = id;
              averageDeterminacy = calculateDeterminacy(events, 0);
              eventCount = events.size();
            };
          },
        )
      )
    );
  };

  // 決定性システム診断
  public func getDeterminacyDiagnostics() : DeterminacyDiagnostics {
    let allEvents : [Event] = [];
    let totalEvents = allEvents.size();
    let averageDeterminacy = if (totalEvents == 0) 0.0 else calculateDeterminacy(allEvents, 0);

    {
      totalEvents;
      averageDeterminacy;
      timeWindow = 0;
    };
  };
};

