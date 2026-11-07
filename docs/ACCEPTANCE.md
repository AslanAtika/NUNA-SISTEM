# Acceptance Plan

These scenarios are specifications, not completed runtime tests.

## Notes and memory

- Given two hypotheses, when notes are arranged and saved, then reload preserves IDs, positions, text, and evidence status.
- Given an unverified reading, when it is saved, then it remains unverified.
- Given an unchanged prior test, when revisited, then its record is available without inventing new evidence.

## Dice and Mastery

- Given distinct starting W1 entries, when progression is loaded, then neither overwrites the other.
- Given a valid W34 roll, when resolved, then its result is symbolic `pi`, displayed as π.
- Given W34 unlocked, when the skill is queried, then Mastery is available.
- Given W34 guesses, when repeated, then no guess cost is deducted and no finite skill quota is consumed.
- Given unlimited guessing, when rewards are evaluated, then only separately authorized reward rules apply.

## Theft

- Given the chosen counting policy and risk curve, when the dice count increases over its supported range, then robbery probability increases as specified.
- Given an approaching theft at Mastery, when the configured warning point is reached, then the player receives a perceptible warning.
- Given a warning, when no defensive action is chosen, then the warning alone does not block theft.
- Given repeated free guesses, when no die is taken, then acquisition risk does not automatically increase.

## Decoder

- Given a canonical clue, when transformed for display, then canonical content remains unchanged.
- Given identical content, mapping version, seed, and presentation settings, when regenerated, then the symbol mapping is identical.
- Given a missing glyph font, when shown, then a readable fallback is available.
- Given a false hypothesis, when the model narrates, then no canonical solution or state is overwritten.

## Isolation

- Given the model is offline, when local rules are used, then notes and configured dice still work.
- Given stale or malformed adapter output, when received, then host state remains unchanged.
- Given fictional signal text, when recorded, then no real network scan or external action is initiated.
