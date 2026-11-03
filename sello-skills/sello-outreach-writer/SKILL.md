---
name: sello-outreach-writer
description: Writes personalized cold outreach for a SELLO Marketing car detailing lead (Instagram DM, 20-30s voice note script, 60-90s Loom-style video script, cold email and follow-ups) using real details about that business. Use when Juan asks to write a DM, email, voice note or video script for a lead, or says "do outreach for" a business.
---

# SELLO Outreach Writer

Replaces the Base44 "generateOutreach" function.

## Gather facts
1. Lead facts: from the SELLO OS database (artifact https://claude.ai/artifact/ErYiqdmE162tkVLSzzQ1yi, collection `leads`, via ArtifactData), or from what Juan pasted. Use: business name, owner, niche, city, website status (none / weak / solid), Meta ads running or not, Google rating and review count, Instagram handle.
2. Sender facts: read `config/settings` in SELLO OS (business_name SELLO Marketing, contact name, phone, Instagram, booking link, email). Never reuse old Vantier contact details (invantier.com, @official.vantier, the old Calendly link). If a field is missing, ask Juan instead of guessing.
3. Offer: `config/settings.offer`. Always read it fresh; do not assume old Vantier pricing.
4. Web search for ONE specific, recent detail about this business (a recent before/after post, a ceramic coating job, a recent review, a seasonal angle like pollen season, rainy season or holiday gift cards, a local detail) so nothing reads generic.

## Write
Never repeat the same hook across options.
1. **DM** (2-4 sentences): casual, specific, the offer stated naturally, ends with a soft question.
2. **Voice note** (50-75 words, 20-30s spoken): conversational, one specific thing about them, plus the offer.
3. **Video script** (150-220 words, 60-90s screen recording): light stage directions in [brackets], walks through what's missing or broken (no ads running, weak site, slow follow-up) and the offer.
4. **Cold email**: subject under 7 words, under 120 words, one CTA (reply or book). Plus 2 short follow-ups (day 3 and day 7) in the same thread.

Voice: confident, operator-to-operator, short sentences, no hype words, no "I hope this finds you well". Talk about booked details, coating jobs and full calendars, not "leads" or "impressions". Use detailer language: packages, interior/exterior, ceramic, maintenance plans, repeat customers.

## After
If Juan says he sent something, log it in SELLO OS: add an `activity` doc {type: dm_sent | email_sent | call_dialed, date: today, lead_id, lead_name, notes}. Update the lead: status (dm_sent / email_sent), touch_count +1, last_touch_date today, next_follow_up_date today + 3 days. Never send emails or DMs yourself unless Juan explicitly asks you to send that specific message.
