# Routines (Claude scheduled automations)

| Routine | ID | Schedule | Status |
|---|---|---|---|
| Vantier · Instagram publisher | trig_01Q6E3koX8KjzEMQsiEoRU29 | 10:50am, 1:50pm, 6:50pm ET | ON since 2026-10-02 cutover. Fires into the persistent session "Vantier · Instagram publisher (runner)" (session_01NckoXSozcQfSDWUN7EbmQT), which has Composio. |
| Vantier · Morning brief | trig_01VjJGsrZ81DMo9eSzp2pnnc | daily 7:52am ET | On |
| Vantier · LinkedIn daily post | trig_01MM81HP7r7jzJusJBFGwrZP | weekdays 8:47am ET | On (runner session) |
| Vantier · Inbox sync + reply drafts | trig_0156Jx5jJ8f5dsydxvsQSGoM | 10:23am & 4:23pm ET | Needs approval in the runner session |
| Vantier · Email sender | trig_01HF93cKUFthHfPSwWQLUq1q | weekdays hourly 8am-5pm ET | Needs approval in the runner + mailing address in Settings |
| Vantier · Follow-up drafts | trig_01MQpqsJECCWAxhhyuEzBhw1 | weekdays 8:17am ET | Switch off in Vantier OS |
| Vantier · Client Friday reports | trig_01TfH7dXdNjnZADKA3qxvit1 | Fridays 9:37am ET | Needs approval in the runner session |
| Vantier · Weekly lead finder | trig_01TCM59PggDhaQxiMM2rERP3 | Mondays 6:41am ET | On |
| Vantier · Weekly scoreboard | trig_01HjULwHAJRT52Npuoh3gJqs | Fridays 4:47pm ET | On |
| Vantier · Content refill | trig_018iuBtja77hoVQkFRFx3BSZ | Sundays 6:29pm ET | On |

## Base44 status (2026-10-02)
All Base44 apps are rebuilt here. Base44 workflows: Instagram Scheduled Posts paused, LinkedIn Daily Post inactive, CRM Daily Onboarding Check paused. "Application Thank You" stays active until invantier.com points to GitHub Pages (the new site's form uses FormSubmit).

Prompts: `instagram-publisher.md` (the brief's prompt is stored in the Routine itself).

## Cutover from Base44 (done 2026-10-02)
- Base44 "Instagram Scheduled Posts" workflow (6ab71f7e64bcd83dc6e54c8f) paused via toggle-status.
- Post statuses verified against Instagram; Vantier OS `config/automation.instagram_publisher_enabled = true`.
- Rollback: switch the publisher off in Vantier OS → Automations, then resume the Base44 workflow.
