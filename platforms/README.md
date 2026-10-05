# Multiplatform layer

This directory isolates distribution-platform concerns from Lumen's core agents.

## Phase 1
- Preserve upstream YouTube behavior.
- Standardize 16:9 and 9:16 content profiles.
- Require human approval by default.
- Keep TikTok publishing disabled until an official, authenticated integration is configured and tested.

## Design
`PlatformAdapter` is the boundary for future publishers. Content generation should depend on a content profile, not directly on a platform API.

This keeps upstream updates easier to merge and prevents credentials/API rules from leaking into business logic.
