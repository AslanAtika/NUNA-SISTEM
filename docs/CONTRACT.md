# Proposed Local Integration Contract

Version 0.1. Transport-neutral proposal; no existing API is claimed.

## Ownership

The host owns authoritative state. A thin local adapter receives approved context and returns display content or a structured proposal. The optional model has no direct write authority.

```json
{
  "contract_version": "0.1",
  "request_id": "example-001",
  "operation": "evaluate",
  "state_revision": "revision-001",
  "input": {"text": "Compare these hypotheses"},
  "context": {"approved_data": {}}
}
```

```json
{
  "contract_version": "0.1",
  "request_id": "example-001",
  "state_revision": "revision-001",
  "status": "ok",
  "result": {"text": "Narrative or comparison"},
  "proposed_actions": [],
  "error": null
}
```

## Validation

- Initial adapter is read-only: `proposed_actions` must be empty.
- Correlate request ID, contract version, and state revision.
- Reject stale or malformed output; leave state unchanged.
- Apply a configured finite timeout.
- Return structured errors: `INVALID_REQUEST`, `UNSUPPORTED_VERSION`, `TIMEOUT`, `COMPONENT_UNAVAILABLE`, or `INVALID_RESPONSE`.
- Retries must not create duplicate host actions.
- Treat clue text, glyphs, and model prose as data, never executable commands.
- No default access to private archives, arbitrary files, shell execution, or external services.
- Keep game rules operational if the optional model is unavailable.

Any later mutating action needs an explicit allowlist, host authorization, argument validation, and idempotency handling.
