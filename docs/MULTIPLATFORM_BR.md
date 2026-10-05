# Lumen Multiplatform BR

## Goal
Extend the fork for Brazilian creator workflows without coupling TikTok/commerce logic to Lumen's upstream YouTube agents.

## Pipeline
Trend/input -> strategy -> script -> assets -> render -> review -> platform adapter -> publish -> analytics.

## Product rules
1. Human approval is mandatory before publishing.
2. Secrets must stay outside source control.
3. 9:16 uses 1080x1920 as the canonical vertical render target.
4. TikTok publishing remains disabled until an official integration is configured and validated.
5. Platform adapters own API-specific validation and publishing behavior.

## Planned modules
- YouTube adapter around the existing publisher.
- Shorts preset integration with the existing production pipeline.
- TikTok adapter using supported authentication/API flows.
- TikTok Shop campaign metadata and product-content workflow.
- PT-BR dashboard surfaces for platform, format, status, cost and approval.
- Cost guardrails and retry/idempotency controls.

## Validation
Run the upstream suite first, then the multiplatform tests. Never enable unattended publishing until credentials, dry-run rendering, failure recovery and approval gates have passed.
