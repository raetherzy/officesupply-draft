# TODO - Match PRD to buyer-dashboard

## Phase A — Align navigation & features to PRD
- [ ] Remove Buyer “Contract” feature from navigation (PRD does not include Contract for Buyer).
- [ ] Hide/disable Buyer `/contract` routes so UI follows PRD only.

## Phase B — Align status enums & UI labels to PRD
- [ ] Fix `buyer-dashboard/src/lib/types.ts` Quotation `QnStatus` so it matches statuses actually used in `buyer-dashboard/src/lib/mock-data.ts` AND follows PRD labels (Draft/Issued/Approved/Rejected/Expired).
- [ ] Update dashboard (`buyer-dashboard/src/app/(buyer)/dashboard/page.tsx`) so:
  - KPI counters use correct statuses per PRD
  - SO status badge mapping uses the exact PRD SO statuses
  - Quotation-related counters map correctly

## Phase C — Page-by-page verification
- [ ] Verify buyer pages vs PRD (labels, buttons/actions, and state transitions):
  - `/dashboard`
  - `/so`, `/so/create`, `/so/[id]`
  - `/rfq`, `/rfq/create`, `/rfq/[id]`
  - `/quotation`, `/quotation/[id]`
  - `/tracking`
  - `/invoice`, `/invoice/[id]`
  - `/payment`, `/payment/history`
  - `/history`
  - `/users` (only if PRD includes it for the relevant buyer role: HeadPurchasing)
- [ ] Ensure role-based menu matches PRD “Skema 2 Role” vs “Skema 3 Role”.

## Phase D — Smoke testing
- [ ] Build/typecheck and run Next dev (manual verification per main routes).

## New Requirement — Build Internal Admin Dashboard (Super Admin / Super User / SalesAdmin / Purchasing / Finance)
- [ ] Create 1 additional dashboard route per PRD (third dashboard) under `buyer-dashboard/src/app/.../admin/dashboard` (matching role access).
- [ ] Implement dashboard UI and KPI mapping sesuai PRD.
- [ ] Add menu entry (if PRD requires it) so it becomes accessible from internal console navigation.
- [ ] Update/extend mock data & types only if required to render KPIs.
- [ ] Typecheck + run Next dev.

