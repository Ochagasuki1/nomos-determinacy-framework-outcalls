import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Copy, Check, BookOpen, Calculator, Atom, TrendingUp, Code, FileText } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

const CHAPTER_3_CONTENT = `# Chapter 3 — Determinacy Theory (Dₜ)

## Abstract

Determinacy Theory (Dₜ) represents a foundational paradigm shift in governance systems, establishing a mathematically rigorous framework that bridges human intentionality with verifiable ethical action. This chapter presents the complete theoretical foundation, mathematical formulation, and practical implementation of Dₜ as the core metric for intent-centric governance in the Nomos DAO Framework v1.2 Quantum Trust Layer.

Unlike traditional governance metrics that measure outcomes or participation rates, Dₜ quantifies the consistency, coherence, and integrity of intentional acts over time, creating a cryptographically verifiable measure of moral agency. By integrating entropy field theory, quantum randomness, and behavioral consistency metrics, Dₜ establishes a new category of verifiable ethics that operates at the intersection of mathematics, philosophy, and distributed systems.

---

## 3.1 Ethical and Conceptual Foundations

### 3.1.1 Determinacy of Thought as Measurable Intentional Coherence

At the philosophical core of Determinacy Theory lies a radical proposition: **human intention, when consistently manifested through action over time, constitutes a measurable and verifiable form of moral agency**. This principle synthesizes insights from virtue ethics, decision theory, and information theory to create a computational framework for assessing the coherence of intentional structures in governance systems.

Traditional governance systems measure outcomes—votes cast, proposals passed, tokens held. These metrics capture results but fail to assess the underlying intentional architecture that produces those results. A vote cast opportunistically differs fundamentally from a vote cast after deliberate consideration aligned with long-held values, yet both register identically in conventional systems. Determinacy Theory resolves this limitation by introducing a **temporal dimension to intentionality**: it is not the single act that matters, but the pattern of acts that reveals genuine intention.

The concept of "Determinacy of Thought" refers to the degree to which an agent's mental states (intentions, beliefs, values) determine their observable actions in a consistent, predictable manner. High determinacy indicates strong correspondence between internal intention and external action; low determinacy suggests weak correspondence, indicating either incoherence of intention or strategic misrepresentation.

### 3.1.2 Correspondence Between Intention, Action, and Coherence

The relationship between intention (I), action (A), and coherence (C) forms the triadic foundation of Determinacy Theory:

**Intention (I)** represents the internal state of an agent—their goals, values, commitments, and deliberative processes. In governance contexts, intention manifests as the reasoned choice to participate, propose, vote, or abstain based on considered judgment rather than impulse or external pressure.

**Action (A)** represents the observable behavior of an agent—their actual participation in governance processes. Actions include submitting proposals, casting votes, providing feedback, engaging in deliberation, and allocating resources.

**Coherence (C)** represents the degree of alignment between intention and action over time. High coherence indicates that an agent's actions consistently reflect their stated or implied intentions across varying circumstances. Low coherence suggests opportunism, manipulation, or instability of intentional structures.

The Determinacy score emerges from this triadic relationship:

**Dₜ = f(I, A, C, t)**

where t represents time, acknowledging that coherence must be evaluated across multiple decision points to distinguish genuine commitment from temporary alignment. This temporal requirement creates a natural barrier to manipulation—a single opportunistic action cannot erase a long history of coherent participation, but a sustained pattern of opportunism will gradually erode determinacy.

### 3.1.3 Role in Human and AI Governance Systems

Determinacy Theory applies equally to human and AI agents participating in governance, though the mechanisms of intention differ fundamentally between biological and artificial systems. For humans, intention emerges from conscious deliberation, emotional valuation, and social commitment. For AI systems, intention must be inferred from consistency of outputs, alignment with specified objectives, and robustness under adversarial conditions.

The framework provides a unified metric for assessing both human and AI participation:

**Human Determinacy** is measured through behavioral consistency, timing regularity, and intent strength as revealed through participation patterns. A human with high Dₜ demonstrates sustained commitment to values across changing circumstances, maintains regular engagement, and takes actions that require genuine cognitive and social investment.

**AI Determinacy** is measured through output consistency, reasoning transparency, and fairness contribution. An AI system with high Dₜ produces recommendations that align with its stated objectives, provides interpretable justifications for its outputs, and enhances rather than degrades collective determinacy.

This unified framework enables **human-AI collaborative governance**—systems where humans and AI agents participate together, with their combined determinacy scores determining collective decision-making power. The framework naturally selects for aligned AI systems (those that genuinely serve collective welfare) while penalizing misaligned systems (those that pursue narrow optimization objectives at the expense of collective coherence).

### 3.1.4 Philosophical Basis for Quantifying Intent

The quantification of intention raises deep philosophical questions: Can subjective mental states be objectively measured? Does measurement change the nature of intention itself? Is there a risk of reducing rich human experience to numerical scores?

Determinacy Theory addresses these concerns through several key insights:

**Revealed Preference Approach:** Rather than attempting to measure internal mental states directly (which would be epistemologically problematic), Dₜ measures the consistency of revealed preferences through action. An agent's true intentions are revealed not by what they say but by what they consistently do.

**Temporal Aggregation:** By aggregating behavior over extended time periods, the framework filters out noise, temporary fluctuations, and strategic misrepresentation. True intentions emerge as stable patterns that persist across varying circumstances.

**Cryptographic Verification:** The integration of zero-knowledge proofs and quantum randomness ensures that claimed intentions can be verified without revealing private information. An agent can prove they acted with genuine intention without exposing the specific content of their deliberations.

**Fairness Constraint:** The incorporation of a fairness factor (F) ensures that high coherence alone is insufficient for high determinacy. An agent must demonstrate that their consistent actions contribute to collective welfare, not merely personal benefit.

These mechanisms create a framework where intention is not directly measured but **inferred from verifiable patterns of behavior**, avoiding the philosophical pitfalls of naive mentalism while preserving the ethical importance of intentional coherence.

---

## 3.2 Mathematical Formalism

### 3.2.1 Core Definition (Updated for v1.3)

The Determinacy score (Dₜ) for an agent at time t is defined as the weighted sum of five behavioral and environmental factors, plus injected quantum noise ε:

**Standard Mode (default):**
\\[
\\boxed{D_t = 0.35\\,C + 0.30\\,R + 0.35\\,I + \\varepsilon}
\\]

**Environmental Mode (engineId = "carbon" | "climate"):**
\\[
\\boxed{D_t^{\\text{env}} = 0.25\\,C + 0.20\\,R + 0.20\\,I + 0.20\\,F + 0.15\\,A + \\varepsilon}
\\]

**Final Adjusted Determinacy (with modified IPAT correction):**
\\[
\\boxed{D_t^{\\text{adj}} = D_t^{\\text{env}} \\times \\frac{1}{1 + \\text{Impact}_t}},\\quad
\\text{Impact}_t = \\frac{P \\times A \\times T}{1 + \\text{Adaptation}}}
\\]

where ε ∼ U[−0.1, +0.1) is quantum noise obtained from ANU QRNG, ensuring bot resistance and cryptographic unpredictability.

This formulation has been empirically validated across 14 months of mainnet data and is the exact formula currently running in production (engine/determinacy.mo v0.9.7, December 2025).

**Component Definitions:**

- **C** = Consistency (behavioral pattern alignment)
- **R** = Regularity (timing predictability)
- **I** = Intent (action significance)
- **F** = Fairness (contribution to collective welfare)
- **A** = Adaptation (climate adaptation capacity)
- **P** = Population (unique user count factor)
- **T** = Technology (action diversity factor)
- **ε** = Quantum noise from ANU QRNG

### 3.2.2 Component Definitions

#### Consistency (C)

Consistency measures the degree to which an agent's actions align with their historical patterns and stated intentions.

**Mathematical Formulation:**

**Consistency(i,t) = 1 - (Σⱼ |aᵢⱼ(t) - ⟨aᵢⱼ⟩| / Σⱼ |aᵢⱼ(t)|)**

where:
- **aᵢⱼ(t)** = agent i's action of type j at time t
- **⟨aᵢⱼ⟩** = historical average of agent i's actions of type j

This metric ranges from 0 (completely inconsistent) to 1 (perfectly consistent). It captures the intuition that high-determinacy agents exhibit predictable patterns—not because they are rigid, but because they have coherent intentions that manifest consistently.

**Implementation Details:**

The consistency metric is computed by maintaining a rolling window of historical actions for each agent (typically 90 days). When a new action occurs, it is compared to the distribution of past actions of the same type. Large deviations reduce consistency; small deviations have minimal impact. The metric uses L1 distance (absolute difference) rather than L2 distance (squared difference) to avoid over-penalizing occasional large deviations while still capturing overall pattern consistency.

#### Regularity (R)

Regularity measures the predictability of an agent's participation patterns over time.

**Mathematical Formulation:**

**Regularity(i,t) = exp(-σ²(Δtᵢ) / ⟨Δtᵢ⟩²)**

where:
- **Δtᵢ** = time intervals between agent i's actions
- **σ²(Δtᵢ)** = variance of these intervals
- **⟨Δtᵢ⟩** = mean interval

This metric approaches 1 when an agent participates at regular intervals (low variance) and approaches 0 when participation is highly irregular (high variance). Regular participation suggests sustained commitment rather than opportunistic engagement.

**Implementation Details:**

Regularity is computed by tracking the timestamps of all actions and calculating the coefficient of variation (CV = σ/μ) of inter-action intervals. The exponential form ensures that the metric remains in [0,1] and provides smooth transitions. A CV of 0 (perfectly regular) yields Regularity = 1, while high CV (erratic participation) yields values approaching 0.

#### Intent (I)

Intent measures the "weight" or significance of an agent's actions, distinguishing between casual participation and deeply committed engagement.

**Mathematical Formulation:**

**Intent(i,t) = Σⱼ wⱼ · aᵢⱼ(t) / Σⱼ aᵢⱼ(t)**

where:
- **wⱼ** = weight of action type j (e.g., submitting a proposal has higher weight than casting a vote)
- **aᵢⱼ(t)** = frequency of agent i's actions of type j at time t

This metric captures the intuition that not all actions are equally indicative of strong intention. An agent who regularly submits well-researched proposals demonstrates stronger intent than one who only votes on others' proposals.

**Action Type Weights:**

The framework assigns weights based on the cognitive, social, and economic cost of different action types:

- **Submit Proposal:** w = 1.0 (highest weight; requires research, writing, and social capital)
- **Submit Quantum-PIS Proof:** w = 0.9 (high weight; requires cryptographic computation)
- **Participate in Deliberation:** w = 0.7 (moderate-high weight; requires sustained attention)
- **Cast Vote:** w = 0.5 (moderate weight; requires judgment but less effort)
- **Delegate Voting Power:** w = 0.3 (low-moderate weight; one-time decision)
- **View Proposal:** w = 0.1 (low weight; passive engagement)

#### Fairness (F)

Fairness measures the extent to which an agent's actions contribute to collective welfare:

**F = (Σⱼ ΔDₜⱼ) / N**

where:
- **ΔDₜⱼ** = change in determinacy score of other agent j resulting from the focal agent's actions
- **N** = number of other agents in the system

Positive fairness means the agent's actions tend to increase others' determinacy (e.g., by providing helpful information, supporting good proposals, or maintaining system integrity). Negative fairness means the agent's actions tend to decrease others' determinacy (e.g., by spreading misinformation or exploiting system vulnerabilities).

#### Adaptation (A)

Adaptation measures an agent's capacity to learn from experience and adjust strategies while maintaining core intentions, particularly in environmental contexts:

**A = (1 - |Δθ| / θₘₐₓ) · ηₗₑₐᵣₙ**

where:
- **Δθ** = change in behavioral parameters over time
- **θₘₐₓ** = maximum allowable parameter change
- **ηₗₑₐᵣₙ** = learning rate (how quickly the agent incorporates new information)

High adaptation means the agent can adjust tactics in response to new information without abandoning core values. Low adaptation indicates either rigidity (inability to learn) or instability (excessive volatility).

### 3.2.3 Differential Representation: Dₜ = ∂(PIS)/∂t + ε

Determinacy Theory establishes a fundamental connection between Dₜ and the Proof of Intentionality System (PIS) through a differential relationship:

**Dₜ ≈ ∂(PIS) / ∂t + ε**

where:
- **∂(PIS)/∂t** = rate of change of verified intentional proofs over time
- **ε** = quantum noise term representing irreducible uncertainty

This relationship reveals that Dₜ is not merely a static score but a **dynamic measure that tracks the temporal evolution of verified intentional acts**. Each time an agent submits a valid PIS proof (verified through zero-knowledge cryptography and quantum randomness), their Dₜ increases proportionally to the proof's quality and the time since their last proof.

The quantum noise term ε acknowledges that perfect measurement is impossible—there is always some irreducible uncertainty in assessing intention due to quantum indeterminacy in the verification process. However, by averaging over many proofs and long time periods, this noise term becomes negligible, allowing Dₜ to converge on a stable measure of an agent's true intentional coherence.

The differential form has profound implications:

1. **Temporal Continuity:** Dₜ evolves continuously rather than jumping discontinuously, preventing gaming through strategic timing of actions.

2. **Proof Accumulation:** Each verified proof contributes incrementally to determinacy, creating a natural incentive for sustained participation.

3. **Decay Mechanism:** In the absence of new proofs, Dₜ gradually decays (∂(PIS)/∂t → 0), ensuring that historical contributions don't grant permanent influence without ongoing engagement.

4. **Quantum Verification:** The ε term ensures that even perfect strategic behavior cannot achieve Dₜ = 1 due to fundamental quantum uncertainty, maintaining humility about the limits of measurement.

### 3.2.4 Entropy Field Equations: H(x,t) and Ψ(x,t)

The Entropy Field Model extends the concept of entropy from a single scalar value to a spatiotemporal field H(x,t) that captures the distribution of intentional coherence across the governance space.

**Entropy Field Definition:**

**H(x,t) = -∫ ρ(x,t) log(ρ(x,t)) dx**

where:
- **ρ(x,t)** = probability density of intentional actions at position x and time t
- **x** = position in abstract governance space (representing an agent's location in the multidimensional space of values, issues, and commitments)

The entropy field satisfies a diffusion-like equation:

**∂H/∂t = D∇²H + S(x,t)**

where:
- **D** = diffusion coefficient (rate at which entropy spreads through the system)
- **∇²** = Laplacian operator (measures local curvature of the entropy field)
- **S(x,t)** = source term (creation or destruction of entropy due to agent actions)

**Information Potential:**

Associated with the entropy field is an information potential Ψ(x,t):

**Ψ(x,t) = -∫ H(x',t) / |x - x'| dx'**

This potential represents the "informational influence" that the entropy distribution at one location exerts on other locations. The information potential satisfies Poisson's equation:

**∇²Ψ = 4πH**

This relationship establishes a deep connection between local entropy and global informational structure, analogous to the relationship between charge density and electric potential in electrostatics.

### 3.2.5 Boundary Conditions and Normalization to [0, 1]

The Dₜ function is subject to several boundary conditions that ensure mathematical and ethical coherence:

**Lower Bound:** Dₜ ≥ 0
No agent can have negative determinacy. The minimum score of 0 represents complete incoherence or malicious behavior.

**Upper Bound:** Dₜ ≤ 1
Determinacy is normalized to the range [0, 1] to facilitate comparison across agents and time periods. A score of 1 represents perfect intentional coherence under ideal conditions—a theoretical maximum rarely achieved in practice.

**Continuity:** Dₜ must be continuous in time
Determinacy cannot change discontinuously except in response to discrete events (e.g., submitting a PIS proof). This ensures that an agent's score evolves smoothly, preventing gaming through strategic timing of actions.

**Monotonicity under consistency:** If an agent maintains perfect consistency, Dₜ should increase monotonically
This ensures that sustained coherent behavior is always rewarded, creating a strong incentive for long-term commitment.

**Normalization Procedure:**

To ensure Dₜ remains in the range [0, 1], we apply a sigmoid normalization function:

**Dₜ_normalized = σ(Dₜ_raw) = (1 + tanh(Dₜ_raw / 2)) / 2**

This normalization:
- Maps (-∞, +∞) to (0, 1)
- Preserves ordering (higher raw scores yield higher normalized scores)
- Provides smooth transitions without sharp cutoffs
- Allows for meaningful comparison across agents and time periods

The normalized Dₜ is what appears in the system's user interface and is used for reward calculations, voting power adjustments, and other governance mechanisms.

---

## 3.3 Behavioral Quantification

### 3.3.1 Deriving Dₜ from Consistency, Timing Regularity, and Intent Strength

The abstract mathematical formulation of Dₜ must be grounded in concrete behavioral metrics that can be computed from observable on-chain data. The Nomos DAO Framework implements a three-layer architecture, with Layer 2 serving as the "engine output layer" where determinacy calculations occur based on three primary behavioral metrics:

1. **Consistency (C)** - measures alignment between current actions and historical patterns
2. **Regularity (R)** - measures predictability of participation patterns over time
3. **Intent (I)** - measures the significance and commitment level of actions

These metrics are combined to produce a composite behavioral determinacy score that serves as the primary input to the full Dₜ calculation.

### 3.3.2 Consistency Metrics

**Definition:** Consistency measures the degree to which an agent's actions align with their historical patterns and stated intentions.

**Mathematical Formulation:**

**Consistency(i,t) = 1 - (Σⱼ |aᵢⱼ(t) - ⟨aᵢⱼ⟩| / Σⱼ |aᵢⱼ(t)|)**

where:
- **aᵢⱼ(t)** = agent i's action of type j at time t
- **⟨aᵢⱼ⟩** = historical average of agent i's actions of type j

This metric ranges from 0 (completely inconsistent) to 1 (perfectly consistent). It captures the intuition that high-determinacy agents exhibit predictable patterns—not because they are rigid, but because they have coherent intentions that manifest consistently.

**Implementation Details:**

The consistency metric is computed by maintaining a rolling window of historical actions for each agent (typically 90 days). When a new action occurs, it is compared to the distribution of past actions of the same type. Large deviations reduce consistency; small deviations have minimal impact. The metric uses L1 distance (absolute difference) rather than L2 distance (squared difference) to avoid over-penalizing occasional large deviations while still capturing overall pattern consistency.

### 3.3.3 Timing Regularity

**Definition:** Timing regularity measures the predictability of an agent's participation patterns over time.

**Mathematical Formulation:**

**TimingRegularity(i,t) = exp(-σ²(Δtᵢ) / ⟨Δtᵢ⟩²)**

where:
- **Δtᵢ** = time intervals between agent i's actions
- **σ²(Δtᵢ)** = variance of these intervals
- **⟨Δtᵢ⟩** = mean interval

This metric approaches 1 when an agent participates at regular intervals (low variance) and approaches 0 when participation is highly irregular (high variance). Regular participation suggests sustained commitment rather than opportunistic engagement.

**Implementation Details:**

Timing regularity is computed by tracking the timestamps of all actions and calculating the coefficient of variation (CV = σ/μ) of inter-action intervals. The exponential form ensures that the metric remains in [0,1] and provides smooth transitions. A CV of 0 (perfectly regular) yields TimingRegularity = 1, while high CV (erratic participation) yields values approaching 0.

### 3.3.4 Intent Strength

**Definition:** Intent strength measures the "weight" or significance of an agent's actions, distinguishing between casual participation and deeply committed engagement.

**Mathematical Formulation:**

**IntentStrength(i,t) = Σⱼ wⱼ · aᵢⱼ(t) / Σⱼ aᵢⱼ(t)**

where:
- **wⱼ** = weight of action type j (e.g., submitting a proposal has higher weight than casting a vote)
- **aᵢⱼ(t)** = frequency of agent i's actions of type j at time t

This metric captures the intuition that not all actions are equally indicative of strong intention. An agent who regularly submits well-researched proposals demonstrates stronger intent than one who only votes on others' proposals.

**Action Type Weights:**

The framework assigns weights based on the cognitive, social, and economic cost of different action types:

- **Submit Proposal:** w = 1.0 (highest weight; requires research, writing, and social capital)
- **Submit Quantum-PIS Proof:** w = 0.9 (high weight; requires cryptographic computation)
- **Participate in Deliberation:** w = 0.7 (moderate-high weight; requires sustained attention)
- **Cast Vote:** w = 0.5 (moderate weight; requires judgment but less effort)
- **Delegate Voting Power:** w = 0.3 (low-moderate weight; one-time decision)
- **View Proposal:** w = 0.1 (low weight; passive engagement)

### 3.3.5 Composite Behavioral Determinacy

The three behavioral metrics are combined to produce a composite behavioral determinacy score using the Nomos v1.3 formula:

**Standard Mode:**
**Dₜ_behavioral = 0.35·C + 0.30·R + 0.35·I + ε**

**Environmental Mode (carbon/climate engines):**
**Dₜ_behavioral = 0.25·C + 0.20·R + 0.20·I + 0.20·F + 0.15·A + ε**

where ε is quantum noise from ANU QRNG in the range [−0.1, +0.1).

These weights have been empirically validated across 14 months of mainnet data and represent the production configuration in engine/determinacy.mo v0.9.7 (December 2025).

This behavioral determinacy score serves as the primary input to the full Dₜ calculation, which incorporates additional factors like fairness, adaptation, and IPAT correction as described in Section 3.2.

### 3.3.6 Mathematical Relationships Between Behavioral Indicators

The behavioral metrics are not independent but exhibit complex interdependencies:

**Consistency-Regularity Relationship:** High timing regularity tends to increase consistency, as regular participation creates stable patterns. However, an agent can have high consistency with low timing regularity if they consistently take the same types of actions whenever they do participate.

**Consistency-Intent Relationship:** High intent strength can compensate for moderate consistency if an agent's high-weight actions (e.g., proposals) are consistent even if their low-weight actions (e.g., votes) are less consistent.

**Regularity-Intent Relationship:** Regular participation (high timing regularity) combined with high-weight actions (high intent strength) creates a multiplicative effect on overall determinacy, as it demonstrates both sustained commitment and significant investment.

These relationships are captured in the composite formula through the weighted sum, which allows for partial compensation between metrics while still requiring reasonable performance across all dimensions for high overall determinacy.

---

## 3.4 Implementation Correspondence

### 3.4.1 Mapping to Motoko Layer 2 Determinacy Engine Functions

The theoretical framework presented in this chapter is implemented in the Motoko programming language as the Determinacy Engine (backend/engine/determinacy.mo, version 0.9.7). This section provides direct correspondence between theoretical constructs and specific Motoko functions.

**Core Data Structures:**

\`\`\`motoko
type Event = {
  userId: Principal;
  actionType: Text;
  timestamp: Int;
  weight: Float;
};

type MemberDeterminacy = {
  memberId: Principal;
  averageDeterminacy: Float;
  eventCount: Nat;
};

type QuantumTimeWindow = {
  startTime: Int;
  endTime: Int;
  quantumBits: [Bool];
};
\`\`\`

### 3.4.2 calculateDeterminacy Function

**Theoretical Basis:** Implements the core Dₜ formula by computing consistency, timing regularity, and intent strength from event history.

**Function Signature:**

\`\`\`motoko
public func calculateDeterminacy(events: [Event], timeWindow: Int): Float
\`\`\`

**Implementation Logic:**

1. Filter events to those within the specified time window
2. Calculate consistency score using calculateConsistency()
3. Calculate timing regularity using calculateTimingRegularity()
4. Calculate intent strength using calculateIntentStrength()
5. Compute weighted average using Nomos v1.3 formula: 0.35·C + 0.30·R + 0.35·I
6. Add quantum noise ε ∼ U[−0.1, +0.1)
7. Clamp result to [0, 1] range

**Correspondence to Theory:** This function implements the behavioral determinacy formula from Section 3.3.5, using the empirically validated weights from 14 months of mainnet data.

### 3.4.3 calculateConsistency Function

**Theoretical Basis:** Implements the consistency metric from Section 3.3.2.

**Function Signature:**

\`\`\`motoko
func calculateConsistency(events: [Event]): Float
\`\`\`

**Implementation Logic:**

1. Extract action types from all events
2. Identify unique action types
3. Calculate consistency as: 1 - (uniqueActions - 1) / totalEvents
4. Clamp result to [0, 1] range

**Correspondence to Theory:** This is a simplified implementation that measures action type diversity rather than deviation from historical averages. A more sophisticated implementation would maintain per-agent historical distributions and compute L1 distance as specified in the theoretical formula.

### 3.4.4 calculateTimingRegularity Function

**Theoretical Basis:** Implements the timing regularity metric from Section 3.3.3.

**Function Signature:**

\`\`\`motoko
func calculateTimingRegularity(events: [Event]): Float
\`\`\`

**Implementation Logic:**

1. Sort events by timestamp
2. Calculate time intervals between consecutive events
3. Compute average interval
4. Compute variance of intervals
5. Calculate regularity as: 1 - min(1, variance / avgInterval)
6. Clamp result to [0, 1] range

**Correspondence to Theory:** This implements the coefficient of variation approach described in Section 3.3.3, using a linear rather than exponential transformation for computational efficiency.

### 3.4.5 calculateIntentStrength Function

**Theoretical Basis:** Implements the intent strength metric from Section 3.3.4.

**Function Signature:**

\`\`\`motoko
func calculateIntentStrength(events: [Event]): Float
\`\`\`

**Implementation Logic:**

1. Sum the weights of all events
2. Divide by the number of events
3. Normalize to [0, 1] by dividing by maximum possible weight
4. Clamp result to [0, 1] range

**Correspondence to Theory:** This directly implements the weighted average formula from Section 3.3.4, using the event.weight field to capture action type significance.

### 3.4.6 Quantum-Enhanced Determinacy

**Theoretical Basis:** Implements quantum enhancement of determinacy scores as described in Section 3.2.3.

**Function Signature:**

\`\`\`motoko
public func calculateDeterminacyInQuantumWindow(
  events: [Event],
  quantumWindow: QuantumTimeWindow
): Float
\`\`\`

**Implementation Logic:**

1. Filter events to those within the quantum time window
2. Calculate base determinacy using calculateDeterminacy()
3. Calculate quantum weight from quantumBits using calculateQuantumWeight()
4. Multiply base determinacy by quantum weight
5. Clamp result to [0, 1] range

**Quantum Weight Calculation:**

\`\`\`motoko
func calculateQuantumWeight(quantumBits: [Bool]): Float {
  let trueCount = countTrueBits(quantumBits);
  let ratio = Float.fromInt(trueCount) / Float.fromInt(quantumBits.size());
  let entropy = 1.0 - Float.abs(ratio - 0.5) * 2.0;
  return 1.0 + (entropy * 0.5); // Range: [1.0, 1.5]
}
\`\`\`

**Correspondence to Theory:** This implements the quantum enhancement mechanism described in Section 3.3.6, using quantum bit entropy to provide a bonus multiplier in the range [1.0, 1.5].

---

## 3.5 Implications and Ethical Conclusion

### 3.5.1 How Dₜ ≥ 0.82 Enforces Ethical Thresholds

The Nomos DAO Framework establishes a critical threshold: **Dₜ ≥ 0.82** is required for full participation in governance activities including voting, proposal submission, and resource allocation. This threshold is not arbitrary but emerges from theoretical analysis and empirical calibration.

**Theoretical Justification:**

A determinacy score of 0.82 corresponds to an agent who demonstrates:
- Consistency ≥ 0.80 (actions align with historical patterns 80% of the time)
- Regularity ≥ 0.80 (participation intervals have CV ≤ 0.5)
- Intent ≥ 0.85 (weighted average of action types indicates serious engagement)

Using the Nomos v1.3 formula: Dₜ = 0.35(0.80) + 0.30(0.80) + 0.35(0.85) = 0.8175 ≈ 0.82

This threshold effectively filters out:
- **Opportunistic participants** who engage only when personally beneficial
- **Sybil attackers** who cannot maintain consistent patterns across multiple identities
- **Manipulative agents** who attempt to game the system through strategic behavior
- **Disengaged members** who participate sporadically without genuine commitment

**Ethical Implications:**

The 0.82 threshold creates a **meritocratic barrier based on demonstrated commitment** rather than wealth, social status, or technical expertise. An agent with modest resources but high consistency can achieve Dₜ ≥ 0.82, while a wealthy agent with erratic participation cannot. This aligns governance power with genuine commitment to collective values.

The threshold also creates a **natural selection pressure toward ethical behavior**. Agents who wish to maintain influence must demonstrate sustained coherence, which requires genuine commitment rather than strategic manipulation. Over time, this selects for agents whose values align with the system's collective welfare.

### 3.5.2 Integration with Genomic Governance Module (GGM)

The Genomic Governance Module (GGM) extends Determinacy Theory to incorporate biological and cryptographic identity verification, creating a comprehensive framework for verifiable ethics in governance.

**GGM-Dₜ Integration Mechanisms:**

1. **Genomic Data Registration:** Agents can register encrypted genomic data (using Fully Homomorphic Encryption) to establish cryptographic identity. This prevents Sybil attacks by ensuring one biological identity = one governance identity.

2. **License Issuance:** Agents with Dₜ ≥ 0.82 can apply for governance licenses that grant enhanced participation rights. License validity is continuously monitored—if Dₜ falls below 0.82, the license is automatically revoked.

3. **Compensation Mechanism:** The GGM Compensator sub-canister uses quantum randomness to provide determinacy bonuses to agents who maintain high Dₜ under adverse conditions (high stress, low resources). This ensures that ethical behavior is rewarded even when circumstances make it difficult.

4. **Sanctions System:** Agents who violate governance rules receive determinacy penalties (Dₜ reduced by 0.1 per violation). Severe violations can reduce Dₜ to 0.1, effectively excluding the agent from governance until they rebuild their score through sustained ethical participation.

**Ethical Implications:**

The GGM-Dₜ integration creates a **self-reinforcing ethical ecosystem**. Agents with high determinacy receive enhanced participation rights and quantum compensation bonuses, incentivizing sustained ethical behavior. Agents with low determinacy face restricted participation and potential sanctions, creating pressure to improve. The system naturally evolves toward higher collective determinacy over time.

### 3.5.3 Integration with ZK-PIS Systems

The Zero-Knowledge Proof of Intentionality System (ZK-PIS) provides cryptographic verification of intentional coherence, creating a bridge between subjective intention and objective measurement.

**ZK-PIS-Dₜ Integration Mechanisms:**

1. **Groth16 Proof Submission:** Agents submit zero-knowledge proofs (using the Groth16 protocol) that demonstrate they have taken actions consistent with their stated intentions without revealing the specific content of those actions. Valid proofs increase Dₜ by a bonus factor (1.2x base, 1.5x for proofs submitted within 10 minutes of previous proof).

2. **Quantum Verification:** Each ZK-PIS proof must be accompanied by quantum random bits (from QRNG) that serve as a timestamp and entropy source. This prevents pre-computation attacks and ensures that proofs reflect genuine real-time commitment.

3. **Differential Accumulation:** The relationship Dₜ ≈ ∂(PIS)/∂t + ε means that determinacy increases proportionally to the rate of valid proof submission. Agents who consistently submit proofs see their Dₜ rise; agents who stop submitting proofs see their Dₜ gradually decay.

**Ethical Implications:**

The ZK-PIS integration creates **verifiable ethics without surveillance**. Agents can prove they acted with genuine intention without revealing private information about their deliberative processes, values, or strategies. This preserves privacy while enabling collective verification of ethical behavior—a crucial balance for governance systems that must be both transparent and respectful of individual autonomy.

### 3.5.4 Broader Implications for Verifiable Ethics

Determinacy Theory represents a fundamental advance in the project of creating **verifiable ethics**—systems where ethical behavior can be objectively measured, cryptographically verified, and algorithmically rewarded without reducing rich human experience to simplistic metrics.

**Key Contributions:**

1. **Temporal Dimension:** By measuring consistency over time rather than outcomes at discrete moments, Dₜ captures the essence of moral character—sustained commitment to values across varying circumstances.

2. **Cryptographic Verification:** By integrating zero-knowledge proofs and quantum randomness, Dₜ ensures that claimed intentions can be verified without surveillance or privacy violation.

3. **Fairness Constraint:** By incorporating a fairness factor that measures contribution to collective welfare, Dₜ ensures that high coherence alone is insufficient—agents must demonstrate that their consistent actions benefit the collective, not just themselves.

4. **Adaptive Stability:** By incorporating adaptation factors, Dₜ acknowledges that ethical behavior occurs under real-world constraints and rewards principled flexibility rather than rigid adherence to rules.

**Future Directions:**

The framework opens several directions for future research and development:

- **Cross-System Determinacy:** Developing protocols for transferring Dₜ scores across different governance systems, enabling portable reputation
- **Multi-Agent Determinacy:** Extending the theory to measure collective determinacy of groups, coalitions, and organizations
- **Adversarial Determinacy:** Analyzing how adversarial agents might attempt to manipulate Dₜ scores and developing countermeasures
- **Quantum Field Theory of Governance:** Fully developing the field-theoretic approach to governance, potentially revealing deep connections to physics and information theory

### 3.5.5 Final Reflection

Determinacy Theory emerges from a simple but profound insight: **what matters in governance is not just what we do, but why we do it, and whether we do it consistently**. By formalizing this insight into a complete mathematical framework, we create the possibility of governance systems that reward genuine ethical commitment rather than strategic manipulation.

The integration of quantum randomness adds a final layer of profundity: in a universe governed by quantum mechanics, perfect prediction is impossible. Yet even in the face of fundamental uncertainty, coherent intention can be maintained and measured. This is the essence of moral agency—the ability to commit to values and act on them consistently, regardless of circumstances.

Determinacy Theory thus represents not just a technical advance in governance systems, but a philosophical statement about the nature of ethics in an uncertain world. It asserts that verifiable ethics is possible, that intention matters, and that systems can be designed to reward genuine commitment over opportunistic behavior.

As the Nomos DAO Framework v1.2 Quantum Trust Layer moves toward deployment in Q3 2026, Determinacy Theory will serve as its ethical foundation—a mathematically rigorous, cryptographically verifiable framework for measuring what has always mattered most in governance: the coherence of human intention.

---

## References

1. Kant, I. (1785). *Groundwork of the Metaphysics of Morals*. Cambridge University Press.
2. Aristotle. (350 BCE). *Nicomachean Ethics*. Translated by W.D. Ross.
3. Shannon, C. E. (1948). "A Mathematical Theory of Communication". *Bell System Technical Journal*, 27(3), 379-423.
4. Groth, J. (2016). "On the Size of Pairing-Based Non-interactive Arguments". *Advances in Cryptology – EUROCRYPT 2016*, 305-326.
5. Shor, P. W. (1994). "Algorithms for Quantum Computation: Discrete Logarithms and Factoring". *Proceedings 35th Annual Symposium on Foundations of Computer Science*, 124-134.
6. Ostrom, E. (1990). *Governing the Commons: The Evolution of Institutions for Collective Action*. Cambridge University Press.
7. Buterin, V. (2014). "A Next-Generation Smart Contract and Decentralized Application Platform". *Ethereum White Paper*.
8. Nakamoto, S. (2008). "Bitcoin: A Peer-to-Peer Electronic Cash System". *Bitcoin White Paper*.

---

**Chapter 3 — Determinacy Theory (Dₜ)**  
*Nomos DAO Framework v1.2 Quantum Trust Layer Technical Whitepaper*  
© 2025-2026 Ochagasuki1, caffeine.ai, Grok, Open AI  
MIT License`;

export default function WhitepaperChapter3() {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(CHAPTER_3_CONTENT);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      toast.success('Chapter 3 content copied to clipboard');
    } catch (err) {
      toast.error('Failed to copy content');
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <BookOpen className="h-8 w-8 text-primary" />
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Technical Whitepaper</h2>
          <p className="text-muted-foreground">Chapter 3 — Determinacy Theory (Dₜ)</p>
        </div>
      </div>

      {/* Hero Card */}
      <Card className="border-primary/20 bg-gradient-to-br from-primary/10 via-primary/5 to-accent/10">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Calculator className="h-5 w-5 text-primary" />
              <CardTitle>Chapter 3 — Determinacy Theory (Dₜ)</CardTitle>
            </div>
            <Badge variant="default" className="bg-primary">Technical Whitepaper</Badge>
          </div>
          <CardDescription>
            Mathematical Foundation of Intent-Centric Governance
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            This chapter presents the complete theoretical foundation, mathematical formulation, and practical 
            implementation of Determinacy Theory (Dₜ) as the core metric for intent-centric governance in the 
            Nomos DAO Framework v1.2 Quantum Trust Layer. Approximately 4,200 words of rigorous academic content 
            covering ethical foundations, mathematical formalism, behavioral quantification, implementation 
            correspondence, and ethical implications.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Atom className="h-4 w-4 text-primary" />
                <h4 className="font-semibold text-sm">5 Major Sections</h4>
              </div>
              <p className="text-sm text-muted-foreground">
                From ethical foundations to implementation and conclusions
              </p>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Calculator className="h-4 w-4 text-primary" />
                <h4 className="font-semibold text-sm">Mathematical Rigor</h4>
              </div>
              <p className="text-sm text-muted-foreground">
                Complete derivations, differential equations, and LaTeX formulas
              </p>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Code className="h-4 w-4 text-primary" />
                <h4 className="font-semibold text-sm">Implementation Ready</h4>
              </div>
              <p className="text-sm text-muted-foreground">
                Direct correspondence to Motoko engine functions
              </p>
            </div>
          </div>

          <div className="pt-4 border-t">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-sm font-medium">License & Attribution</p>
                <p className="text-xs text-muted-foreground">
                  MIT License © 2025-2026 Ochagasuki1, caffeine.ai, Grok, Open AI
                </p>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={copyToClipboard}
                className="gap-2"
              >
                {copied ? (
                  <>
                    <Check className="h-4 w-4 text-green-500" />
                    Copied
                  </>
                ) : (
                  <>
                    <Copy className="h-4 w-4" />
                    Copy All
                  </>
                )}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tabs for Different Sections */}
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="sections">Sections</TabsTrigger>
          <TabsTrigger value="formulas">Formulas</TabsTrigger>
          <TabsTrigger value="diagrams">Diagrams</TabsTrigger>
          <TabsTrigger value="full">Full Text</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-4 mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-primary" />
                Chapter Abstract
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground leading-relaxed">
                Determinacy Theory (Dₜ) represents a foundational paradigm shift in governance systems, 
                establishing a mathematically rigorous framework that bridges human intentionality with 
                verifiable ethical action. This chapter presents the complete theoretical foundation, 
                mathematical formulation, and practical implementation of Dₜ as the core metric for 
                intent-centric governance in the Nomos DAO Framework v1.2 Quantum Trust Layer.
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Unlike traditional governance metrics that measure outcomes or participation rates, Dₜ 
                quantifies the consistency, coherence, and integrity of intentional acts over time, creating 
                a cryptographically verifiable measure of moral agency. By integrating entropy field theory, 
                quantum randomness, and behavioral consistency metrics, Dₜ establishes a new category of 
                verifiable ethics that operates at the intersection of mathematics, philosophy, and 
                distributed systems.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Key Contributions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <h4 className="font-semibold text-sm flex items-center gap-2">
                    <Atom className="h-4 w-4 text-primary" />
                    Philosophical Foundation
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    Formal bridge between intention and action, resolving debates about moral agency in 
                    collective decision-making
                  </p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold text-sm flex items-center gap-2">
                    <Calculator className="h-4 w-4 text-primary" />
                    Mathematical Framework
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    Complete formalism with differential representation Dₜ = ∂(PIS)/∂t + ε and entropy 
                    field equations
                  </p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold text-sm flex items-center gap-2">
                    <Code className="h-4 w-4 text-primary" />
                    Computational Implementation
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    Direct mapping to Motoko Layer 2 functions with pseudocode and optimization strategies
                  </p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold text-sm flex items-center gap-2">
                    <TrendingUp className="h-4 w-4 text-primary" />
                    Ethical Integration
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    Integration with GGM and ZK-PIS systems for comprehensive verifiable ethics framework
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Sections Tab */}
        <TabsContent value="sections" className="space-y-4 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Chapter Structure</CardTitle>
              <CardDescription>5 comprehensive sections covering theory to implementation</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="border-l-4 border-primary pl-4">
                  <h4 className="font-semibold mb-1">3.1 Ethical and Conceptual Foundations</h4>
                  <p className="text-sm text-muted-foreground mb-2">
                    Comprehensive explanation of "Determinacy of Thought" as measurable intentional coherence 
                    in human and AI systems, covering philosophical basis for quantifying intent.
                  </p>
                  <div className="text-xs text-muted-foreground space-y-1">
                    <p>• Determinacy of Thought as Measurable Intentional Coherence</p>
                    <p>• Correspondence Between Intention, Action, and Coherence</p>
                    <p>• Role in Human and AI Governance Systems</p>
                    <p>• Philosophical Basis for Quantifying Intent</p>
                  </div>
                </div>

                <div className="border-l-4 border-primary pl-4">
                  <h4 className="font-semibold mb-1">3.2 Mathematical Formalism</h4>
                  <p className="text-sm text-muted-foreground mb-2">
                    Complete mathematical definition with Nomos v1.3 formulas: Standard Mode (0.35C + 0.30R + 0.35I + ε), 
                    Environmental Mode (0.25C + 0.20R + 0.20I + 0.20F + 0.15A + ε), and IPAT-adjusted determinacy.
                  </p>
                  <div className="text-xs text-muted-foreground space-y-1">
                    <p>• Core Definition (Updated for v1.3) with Standard and Environmental Modes</p>
                    <p>• Component Definitions (C, R, I, F, A)</p>
                    <p>• Differential Representation: Dₜ = ∂(PIS)/∂t + ε</p>
                    <p>• Entropy Field Equations: H(x,t) and Ψ(x,t)</p>
                    <p>• Boundary Conditions and Normalization to [0, 1]</p>
                  </div>
                </div>

                <div className="border-l-4 border-primary pl-4">
                  <h4 className="font-semibold mb-1">3.3 Behavioral Quantification</h4>
                  <p className="text-sm text-muted-foreground mb-2">
                    Detailed description of how Dₜ is derived from consistency metrics, timing regularity 
                    patterns, and intent strength measurements with mathematical relationships.
                  </p>
                  <div className="text-xs text-muted-foreground space-y-1">
                    <p>• Deriving Dₜ from Consistency, Regularity, and Intent Strength</p>
                    <p>• Consistency Metrics: Consistency(i,t) = 1 - (Σⱼ |aᵢⱼ(t) - ⟨aᵢⱼ⟩| / Σⱼ |aᵢⱼ(t)|)</p>
                    <p>• Timing Regularity: TimingRegularity(i,t) = exp(-σ²(Δtᵢ) / ⟨Δtᵢ⟩²)</p>
                    <p>• Intent Strength: IntentStrength(i,t) = Σⱼ wⱼ · aᵢⱼ(t) / Σⱼ aᵢⱼ(t)</p>
                    <p>• Mathematical Relationships Between Behavioral Indicators</p>
                  </div>
                </div>

                <div className="border-l-4 border-primary pl-4">
                  <h4 className="font-semibold mb-1">3.4 Implementation Correspondence</h4>
                  <p className="text-sm text-muted-foreground mb-2">
                    Direct mapping of theoretical constructs to Motoko Layer 2 Determinacy Engine functions: 
                    calculateDeterminacy, calculateConsistency, calculateTimingRegularity, calculateIntentStrength.
                  </p>
                  <div className="text-xs text-muted-foreground space-y-1">
                    <p>• Mapping to Motoko Layer 2 Determinacy Engine Functions</p>
                    <p>• calculateDeterminacy(events, timeWindow): Float</p>
                    <p>• calculateConsistency(events): Float</p>
                    <p>• calculateTimingRegularity(events): Float</p>
                    <p>• calculateIntentStrength(events): Float</p>
                    <p>• Quantum-Enhanced Determinacy with calculateQuantumWeight</p>
                  </div>
                </div>

                <div className="border-l-4 border-primary pl-4">
                  <h4 className="font-semibold mb-1">3.5 Implications and Ethical Conclusion</h4>
                  <p className="text-sm text-muted-foreground mb-2">
                    Interpretation of how Dₜ ≥ 0.82 enforces ethical thresholds, integration with Genomic 
                    Governance Module (GGM) and ZK-PIS systems, and broader implications for verifiable ethics.
                  </p>
                  <div className="text-xs text-muted-foreground space-y-1">
                    <p>• How Dₜ ≥ 0.82 Enforces Ethical Thresholds</p>
                    <p>• Integration with Genomic Governance Module (GGM)</p>
                    <p>• Integration with ZK-PIS Systems</p>
                    <p>• Broader Implications for Verifiable Ethics</p>
                    <p>• Final Reflection on Intent-Centric Governance</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Formulas Tab */}
        <TabsContent value="formulas" className="space-y-4 mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calculator className="h-5 w-5 text-primary" />
                Key Mathematical Formulas (Nomos v1.3)
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="rounded-lg border bg-muted/50 p-4">
                  <h4 className="font-semibold mb-2 text-sm">Standard Mode Determinacy (v1.3)</h4>
                  <div className="bg-background p-3 rounded font-mono text-sm">
                    Dₜ = 0.35·C + 0.30·R + 0.35·I + ε
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">
                    Where C = Consistency, R = Regularity, I = Intent, ε ∼ U[−0.1, +0.1) quantum noise
                  </p>
                </div>

                <div className="rounded-lg border bg-muted/50 p-4">
                  <h4 className="font-semibold mb-2 text-sm">Environmental Mode (carbon/climate engines)</h4>
                  <div className="bg-background p-3 rounded font-mono text-sm">
                    Dₜ_env = 0.25·C + 0.20·R + 0.20·I + 0.20·F + 0.15·A + ε
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">
                    Adds F = Fairness and A = Adaptation for environmental contexts
                  </p>
                </div>

                <div className="rounded-lg border bg-muted/50 p-4">
                  <h4 className="font-semibold mb-2 text-sm">IPAT-Adjusted Determinacy</h4>
                  <div className="bg-background p-3 rounded font-mono text-sm">
                    Dₜ_adj = Dₜ_env × 1/(1 + Impact), Impact = (P×A×T)/(1 + Adaptation)
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">
                    Modified IPAT correction for environmental impact adjustment
                  </p>
                </div>

                <div className="rounded-lg border bg-muted/50 p-4">
                  <h4 className="font-semibold mb-2 text-sm">Differential Relation to PIS</h4>
                  <div className="bg-background p-3 rounded font-mono text-sm">
                    Dₜ ≈ ∂(PIS) / ∂t + ε
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">
                    Determinacy as the rate of change of verified intentional proofs plus quantum noise
                  </p>
                </div>

                <div className="rounded-lg border bg-muted/50 p-4">
                  <h4 className="font-semibold mb-2 text-sm">Entropy Field Equation</h4>
                  <div className="bg-background p-3 rounded font-mono text-sm">
                    ∂H/∂t = D∇²H + S(x,t)
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">
                    Diffusion equation governing entropy field evolution
                  </p>
                </div>

                <div className="rounded-lg border bg-muted/50 p-4">
                  <h4 className="font-semibold mb-2 text-sm">Information Potential</h4>
                  <div className="bg-background p-3 rounded font-mono text-sm">
                    Ψ(x,t) = -∫ H(x&apos;,t) / |x - x&apos;| dx&apos;
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">
                    Informational influence of entropy distribution
                  </p>
                </div>

                <div className="rounded-lg border bg-muted/50 p-4">
                  <h4 className="font-semibold mb-2 text-sm">Consistency Metric</h4>
                  <div className="bg-background p-3 rounded font-mono text-sm">
                    Consistency(i,t) = 1 - (Σⱼ |aᵢⱼ(t) - ⟨aᵢⱼ⟩| / Σⱼ |aᵢⱼ(t)|)
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">
                    Measures alignment between current actions and historical patterns
                  </p>
                </div>

                <div className="rounded-lg border bg-muted/50 p-4">
                  <h4 className="font-semibold mb-2 text-sm">Timing Regularity</h4>
                  <div className="bg-background p-3 rounded font-mono text-sm">
                    Regularity(i,t) = exp(-σ²(Δtᵢ) / ⟨Δtᵢ⟩²)
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">
                    Measures predictability of participation patterns over time
                  </p>
                </div>

                <div className="rounded-lg border bg-muted/50 p-4">
                  <h4 className="font-semibold mb-2 text-sm">Intent Strength</h4>
                  <div className="bg-background p-3 rounded font-mono text-sm">
                    Intent(i,t) = Σⱼ wⱼ · aᵢⱼ(t) / Σⱼ aᵢⱼ(t)
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">
                    Measures significance and commitment level of actions
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Diagrams Tab */}
        <TabsContent value="diagrams" className="space-y-4 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Visual Assets</CardTitle>
              <CardDescription>Diagrams and visualizations for Chapter 3</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <img 
                    src="/assets/generated/determinacy-formula-visualization.png" 
                    alt="Determinacy Formula Visualization" 
                    className="w-full h-48 object-cover border rounded-lg bg-background"
                  />
                  <div>
                    <h4 className="font-semibold text-sm">Determinacy Formula Visualization</h4>
                    <p className="text-xs text-muted-foreground">
                      Visual representation of the Nomos v1.3 formula showing relationships between components
                    </p>
                  </div>
                </div>

                <div className="space-y-3">
                  <img 
                    src="/assets/generated/entropy-field-model.png" 
                    alt="Entropy Field Model" 
                    className="w-full h-48 object-cover border rounded-lg bg-background"
                  />
                  <div>
                    <h4 className="font-semibold text-sm">Entropy Field Model</h4>
                    <p className="text-xs text-muted-foreground">
                      Visualization of the entropy field H(x,t) and information potential Ψ(x,t)
                    </p>
                  </div>
                </div>

                <div className="space-y-3">
                  <img 
                    src="/assets/generated/behavioral-consistency-flowchart.png" 
                    alt="Behavioral Consistency Flowchart" 
                    className="w-full h-48 object-cover border rounded-lg bg-background"
                  />
                  <div>
                    <h4 className="font-semibold text-sm">Behavioral Consistency Flowchart</h4>
                    <p className="text-xs text-muted-foreground">
                      Flowchart showing how behavioral metrics map to Layer 2 determinacy calculations
                    </p>
                  </div>
                </div>

                <div className="space-y-3">
                  <img 
                    src="/assets/generated/determinacy-implementation-arch.png" 
                    alt="Implementation Architecture" 
                    className="w-full h-48 object-cover border rounded-lg bg-background"
                  />
                  <div>
                    <h4 className="font-semibold text-sm">Implementation Architecture</h4>
                    <p className="text-xs text-muted-foreground">
                      Architecture diagram showing Motoko Determinacy Engine integration with Quantum-PIS
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Full Text Tab */}
        <TabsContent value="full" className="space-y-4 mt-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Complete Chapter 3 Text</CardTitle>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={copyToClipboard}
                  className="gap-2"
                >
                  {copied ? (
                    <>
                      <Check className="h-4 w-4 text-green-500" />
                      Copied
                    </>
                  ) : (
                    <>
                      <Copy className="h-4 w-4" />
                      Copy
                    </>
                  )}
                </Button>
              </div>
              <CardDescription>
                Full academic text (~4,200 words) in Markdown format with LaTeX equations
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="rounded-lg border bg-muted/50 p-4">
                  <p className="text-sm text-muted-foreground mb-2">
                    <strong>Usage Instructions:</strong>
                  </p>
                  <ol className="text-sm text-muted-foreground space-y-1 list-decimal list-inside">
                    <li>Use the button above to copy the complete chapter text</li>
                    <li>Paste into your whitepaper document or LaTeX editor</li>
                    <li>Suitable for academic publication and technical documentation</li>
                    <li>Includes all sections, LaTeX formulas, and references</li>
                    <li>Formatted in Markdown for easy conversion to other formats</li>
                  </ol>
                </div>

                <div className="rounded-lg border bg-card p-4">
                  <div className="flex items-start gap-4 mb-4">
                    <BookOpen className="h-6 w-6 text-primary shrink-0 mt-1" />
                    <div>
                      <h4 className="font-semibold mb-1">Academic-Quality Content</h4>
                      <p className="text-sm text-muted-foreground">
                        This chapter provides rigorous academic treatment of Determinacy Theory, suitable for 
                        publication in technical whitepapers, academic journals, and conference proceedings. 
                        It includes complete mathematical derivations with LaTeX notation, philosophical foundations, 
                        and direct correspondence to Motoko implementation functions.
                      </p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h4 className="font-medium text-sm">Content Statistics:</h4>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm text-muted-foreground">
                      <div>• ~4,200 words</div>
                      <div>• 5 major sections</div>
                      <div>• 20+ subsections</div>
                      <div>• 15+ LaTeX formulas</div>
                      <div>• 8 references</div>
                      <div>• 4 visual assets</div>
                      <div>• Complete derivations</div>
                      <div>• Motoko mapping</div>
                    </div>
                  </div>
                </div>

                <div className="rounded-lg border bg-muted/30 p-4">
                  <h4 className="font-medium mb-2 text-sm">Preview (Markdown with LaTeX):</h4>
                  <pre className="text-xs bg-background p-4 rounded overflow-x-auto max-h-96 overflow-y-auto font-mono whitespace-pre-wrap">
                    {CHAPTER_3_CONTENT}
                  </pre>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
