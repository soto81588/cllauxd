# Routines (Claude scheduled automations)

| Routine | ID | Schedule | Status |
|---|---|---|---|
| Vantier · Instagram publisher | trig_01DWRAMD6Gb5ERpraFi7mDVe | hourly at :12 | Paused until cutover (needs the Composio connector attached) |
| Vantier · Morning brief | trig_01VjJGsrZ81DMo9eSzp2pnnc | daily 7:52am ET | On |

Prompts: `instagram-publisher.md` (the brief's prompt is stored in the Routine itself).

## Cutover from Base44 (Instagram)
1. In claude.ai → Code → Routines → "Vantier · Instagram publisher", add the **Composio** connector.
2. Tell Claude "cut over". Claude will then:
   a. Pause the Base44 "Instagram Scheduled Posts" workflow (toggle-status; reversible).
   b. Sync every ScheduledPost status, permalink and caption from Base44 into Vantier OS so nothing already posted goes out again.
   c. Set `config/automation.instagram_publisher_enabled = true` and enable the Routine.
   d. Test-fire it and confirm the next post publishes.
3. Rollback: turn the switch off in Vantier OS → Automations, and resume the Base44 workflow.
