# SISTEM Specification

Revision 3.14. Confirmed means stated in the design conversation, not implemented or tested.

## Problem statement

The intended player/user needs tools to retain complex puzzle evidence, compare interpretations, and anticipate fictional threats without receiving an automatic solution. No usability baseline or user-research result has yet been measured.

## Goals

- Preserve investigation records across save/load without losing note identity or placement.
- Keep all W34 results symbolic π and all W34 guesses free with no finite quota.
- Make configured theft warnings available without repeated monitoring commands.
- Preserve canonical clues through presentation transformations.
- Keep every authoritative state mutation outside model-generated prose.

These are proposed acceptance targets, not measured achievements.

## Non-goals

- A new independent Atlas runtime or replacement state store.
- A complete theorem prover or universal translator.
- Training a model as a prerequisite for dice mechanics.
- Automatic answers, unlimited reward creation, or automatic theft prevention.
- AWS/Grok integration or changes to an existing beta by implication.

## User stories

- As a puzzle player, I want notes in a grid so I can compare competing explanations.
- As a returning player, I want my previous observations retained so I do not repeat bookkeeping.
- As a Legend player, I want free guesses and perceptible theft attempts so I can keep exploring while making my own decisions.
- As a symbol investigator, I want uncertain readings separated from verified evidence.
- As a user without a running local model, I want rules and saved investigations to remain usable.

## Whole tree

```text
NUNA LOÇIKA SİSTEM LOKAĞL
├── Perception × Researcher × Abyss
│   ├── ACTIVE: Notes & Grid
│   │   ├── Observations and symbol samples
│   │   ├── Hypotheses and predictions
│   │   └── Tests and comparisons
│   └── PASSIVE: Puzzle Resistance [RARE]
│       ├── Encountered pattern recognition
│       ├── Eliminated solution tracking
│       └── Persistent investigation memory
├── Fibonacci Dice
│   └── W1a → W1b → W2 → W3 → W5 → W8 → W13 → W21 → W34
│                                                        └── LEGENDARY
│                                                            ├── π every roll
│                                                            ├── Unlimited free guesses
│                                                            └── MASTERY
│                                                                ├── Controlled Contradiction
│                                                                └── Paradox Tolerance
├── Symbol Decoder [Perception extension]
│   └── Canonical clue → seeded display → observation → tested reading
└── Xenolinguistics
    └── NUUK → … → HEXIMA → … → GAIA NIRVANA
```

W1a/W1b are proposed stable identifiers for the two W1 entries. Earlier dice have no finalized faces, effects, or unlock conditions.

## Confirmed requirements

| ID | Priority | Requirement |
|---|---|---|
| R01 | P0 | English development language; preserve supplied display names. |
| R02 | P0 | Player actively creates/selects notes and places them in a grid. |
| R03 | P0 | Puzzle Resistance unlocks after a complex multi-stage puzzle without direct solution hints. |
| R04 | P0 | W34 Legendary unlocks Mastery. |
| R05 | P0 | W34 returns symbolic π, not an ordinary floating-point roll of 3.14. |
| R06 | P0 | W34 grants unlimited free guesses. |
| R07 | P0 | Taking more dice increases robbery probability within the defined playable policy. |
| R08 | P0 | Mastery lets the player see approaching theft; it does not automatically block it. |
| R09 | P0 | Routine remembering, tracking, and warning become automatic. |
| R10 | P0 | The skill gives tools, not the puzzle answer. |

These priorities apply to a future isolated SISTEM prototype, not to the existing game beta.

## Proposed implementation requirements

| ID | Priority | Proposal and dependency |
|---|---|---|
| P01 | P0 | Reuse host state and validation. Requires inspection of actual project code. |
| P02 | P0 | Preserve notes and evidence status through save/load. Requires a host persistence adapter. |
| P03 | P1 | Compare predicted and observed outcomes as consistent, contradicted, or inconclusive. |
| P04 | P1 | Keep canonical clue, displayed symbols, and player interpretation separate. |
| P05 | P1 | Reproduce symbol mappings using seed, mapping version, content version, and configuration. |
| P06 | P2 | Optional local model interprets phrasing and narrates validated events. |
| P07 | P2 | Authored runic and other glyph sets support selected encounters. |

## Mastery

Controlled Contradiction is the proposed active Mastery: compare competing predictions through the notes grid.

Paradox Tolerance is passive Mastery: retain unresolved contradictions, surface relevant comparisons, and perceive approaching theft. An unsuccessful prediction does not automatically invalidate every part of a hypothesis.

Mastery does not complete the Nuuk–Hexima–Gaia Nirvana journey automatically.

## Symbol and logic design

Proposed operator vocabulary: `¬ ∧ ∨ ⊕ → ↔ ∀ ∃ ∄`.

Proposed explanatory notation: `⊢ ⊨ ∴ ∵ ∎`. Displaying these symbols is not an implemented parser or proof system. Any evaluator needs an explicit grammar, precedence, domains, and error behavior; do not use unrestricted code evaluation.

For xenolinguistics, maintain stable English symbol IDs separately from glyphs, encountered context, player interpretations, and verification status. Real scripts must not be presented as meaningless alien language or historically translated without evidence.

Canonical information must remain unchanged by display effects. A seed specifies symbol selection, not identical rendering across devices; font and renderer behavior require separate testing. Bound combining-mark effects, handle missing fonts, and keep decorative controls out of commands and identifiers.

## Success metrics

Prototype acceptance targets:

- All defined persistence and W34 test cases pass.
- Zero authoritative state changes originate directly from model prose.
- All presented hypotheses retain their evidence status through save/load.
- All supported clue fixtures retain canonical content after display transformations.

Measure completion time and unnecessary repeated interactions in playtests before selecting improvement targets. No current baseline is claimed.

## Open decisions

| Decision | Owner | Blocking |
|---|---|---|
| What is guessed and what success rewards | Design owner | Before economy implementation |
| Earlier dice effects and unlocks | Design owner | Before full progression |
| Lifetime dice taken versus current holdings | Design owner | Before robbery implementation |
| Robbery curve, trigger, warning lead time, stealable items | Design owner | Before theft acceptance |
| Recovery if essential clues can be stolen | Design owner | Before encounter release |
| Exact xenolinguistic stages and authored symbol meanings | Narrative/design | Before content production |
| ALÜHA's application or project identity | Design owner | Before external integration |
| Selected collaborator components and permission scope | Owner/component author | Before importing code |
| Target host repository and visibility | Repository owner | Before publication |

## Suggested delivery slices

1. One clue, notes grid, two hypotheses, one test, save/load.
2. Dice configuration and W34 behavior.
3. Explicit robbery policy and perceptible warnings.
4. One seeded symbol encounter.
5. Optional local narration.

Do not invent earlier-die mechanics to fill implementation gaps.
