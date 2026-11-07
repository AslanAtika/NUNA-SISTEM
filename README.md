# NUNA LOÇIKA SİSTEM LOKAĞL

YUKI ATLAS // Fibonacci Dice · Notes & Grid · Symbol Decoder

Design revision: 3.14

Status: playable local command-line prototype plus design package. Not a native game build or installed AI skill.

English is the permanent development language for code, identifiers, comments, technical documentation, and contracts. This does not impose a player-facing localization.

## Start here

Requires Node.js 20 or newer. No dependencies or account are needed.

```sh
npm test
npm run playthrough
npm start
npm run build
```

In the game, use `take` nine times to reach W34, then `roll`, `guess TEXT`, `observe`, and `cross`. Use `note interpretation 0 TEXT` to place a hypothesis. `tick` advances time; if warned, `defend` before the next tick. `save` and `load` use a Git-excluded local file.

Prototype-only balance: lifetime dice count determines risk as `n / (n + 8)` per explicit tick. Three cargo tokens are initially available; each undefended theft takes at most one. These are testing fixtures, not newly confirmed canon. Earlier-die outcome mechanics remain unimplemented rather than invented.

The crossing's observation and completion are scripted fixtures, not a complete multi-stage puzzle. W34 acquisition is accelerated for testing.

- [THE ALÜHA](THE_ALUHA.md): creative overview.
- [SISTEM specification](docs/SISTEM.md): whole skill tree, requirements, boundaries, and open decisions.
- [Integration contract](docs/CONTRACT.md): proposed local component boundary.
- [Acceptance plan](docs/ACCEPTANCE.md): scenarios for future implementation.
- [Design configuration](config/sistem.json): machine-readable confirmed rules and unresolved fields.
- [Credits and reuse](CREDITS.md): acknowledgment and permission boundary.
- [Care and information boundaries](docs/CARE_BOUNDARY.md): self-report, evidence, consent, and privacy policy.

## Established core

- Active: create/select notes and place them in a grid.
- Passive: remember observations, hypotheses, and eliminated possibilities.
- Fibonacci progression: W1, W1, W2, W3, W5, W8, W13, W21, W34.
- W34 Legendary unlocks Mastery; every W34 roll returns symbolic π.
- W34 grants unlimited free guesses, not automatically unlimited rewards.
- Taking more dice from the Klabautermänners increases robbery probability.
- Mastery makes approaching theft attempts perceptible, without automatically stopping them.
- Routine tracking becomes automatic; interpretation and decisions remain with the player/user.

## Scope

This package contains original prototype code and design documents. It contains no imported collaborator source code, no trained model, no complete Unicode parser, and no connection to an existing Atlas project. AWS and Grok are not dependencies. Symbol rendering, broader xenolinguistics, local-model narration, and full game integration remain future work.

The specification is a brainstorm baseline, not an automatic addition to an existing beta.

## Publication and rights

The original code and documentation in this repository are licensed under Creative Commons Attribution 4.0 International (CC BY 4.0). See LICENSE. Attribution: AslanAtika / NUNA SISTEM contributors; retain applicable individual credits.

This grant does not license third-party work, private records, excluded saves, or collaborators' separate projects. No collaborator source code is included.

This prototype has its own repository and does not overwrite the existing YUKI-ATLAS game. No separate ALÜHA application is deployed.

## Future work

See [Roadmap](docs/ROADMAP.md). Abuse counters are a future proposal, not implemented monitoring or a claim about another service.
