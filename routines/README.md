# Routines (Claude scheduled automations)

| Routine | ID | Schedule | Status |
|---|---|---|---|
| Vantier · Instagram publisher | trig_01Q6E3koX8KjzEMQsiEoRU29 | hourly at :50 | ON since 2026-10-02 cutover. Fires into the persistent session "Vantier · Instagram publisher (runner)" (session_01NckoXSozcQfSDWUN7EbmQT), which has Composio. |
| Vantier · Morning brief | trig_01VjJGsrZ81DMo9eSzp2pnnc | daily 7:52am ET | On |

Prompts: `instagram-publisher.md` (the brief's prompt is stored in the Routine itself).

## Cutover from Base44 (done 2026-10-02)
- Base44 "Instagram Scheduled Posts" workflow (6ab71f7e64bcd83dc6e54c8f) paused via toggle-status.
- Post statuses verified against Instagram; Vantier OS `config/automation.instagram_publisher_enabled = true`.
- Rollback: switch the publisher off in Vantier OS → Automations, then resume the Base44 workflow.
