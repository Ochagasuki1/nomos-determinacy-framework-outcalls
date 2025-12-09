import Nat "mo:base/Nat";
import Array "mo:base/Array";
import Text "mo:base/Text";

module {
  public type Task = {
    id : Nat;
    name : Text;
    interval : Nat;
    lastRun : Nat;
  };

  public type SchedulerState = {
    tasks : [Task];
    lastUpdate : Nat;
  };

  // タスクが実行可能かどうかを判定する関数
  public func isTaskReady(task : Task, currentTime : Nat) : Bool {
    currentTime >= task.lastRun + task.interval;
  };

  // 次回実行時刻を計算する関数
  public func getNextRunTime(task : Task) : Nat {
    task.lastRun + task.interval;
  };

  // タスクの優先度を計算する関数（遅延時間に基づく）
  public func calculateTaskPriority(task : Task, currentTime : Nat) : Nat {
    let expectedRunTime = task.lastRun + task.interval;
    if (currentTime > expectedRunTime) {
      currentTime - expectedRunTime; // 遅延時間
    } else {
      0;
    };
  };

  // 実行可能なタスクをフィルタリングする関数
  public func getReadyTasks(tasks : [Task], currentTime : Nat) : [Task] {
    Array.filter(tasks, func(task : Task) : Bool {
      isTaskReady(task, currentTime);
    });
  };

  // タスクを優先度順にソートする関数
  public func sortTasksByPriority(tasks : [Task], currentTime : Nat) : [Task] {
    Array.sort(tasks, func(a : Task, b : Task) : { #less; #equal; #greater } {
      let priorityA = calculateTaskPriority(a, currentTime);
      let priorityB = calculateTaskPriority(b, currentTime);
      Nat.compare(priorityB, priorityA); // 降順（優先度が高い順）
    });
  };
};
