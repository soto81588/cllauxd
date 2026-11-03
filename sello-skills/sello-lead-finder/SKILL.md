---
name: sello-lead-finder
description: Finds and scores real car detailing business leads for SELLO Marketing (Meta ads + websites) and saves them to the SELLO OS lead pipeline. Use when Juan asks to find leads, prospects or businesses in a niche/city, e.g. "find 10 mobile detailers near Hialeah" or "ceramic coating shops in Doral".
---

# SELLO Lead Finder

Replaces the Base44 Lead Finder app. SELLO works ONLY with car detailing businesses: mobile detailers, detail shops, ceramic coating, paint correction, PPF and window tint studios. Skip anything else (car washes with no detailing service, dealerships, body shops).

## Inputs
- niche (optional, defaults to "car detailing"; can narrow to mobile detailing, ceramic coating, PPF, tint) and city (required). Default city Hialeah, FL; default radius 10 miles (from SELLO OS `config/settings`: service_city, service_radius).
- If no sub-niche is given, rotate: mobile detailing, detail shops, ceramic coating / paint correction, PPF / tint.

## Research (web search, never invent)
Find up to 10 REAL, currently operating businesses in the niche within the radius. Only include businesses with online evidence (Google Business profile, directories, social pages, reviews). If fewer are verifiable, return fewer.

For each, gather:
- business_name, owner_name, phone, email, website_url, address
- website_status: "none" (no site), "bad" (Facebook-only, free builder subdomain such as wixsite/godaddysites/weebly, or outdated/not mobile friendly), "solid" (real, modern site)
- instagram_handle, instagram_followers (number, 0 if unknown)
- google_rating, review_count (numbers, 0 if unknown)
- needs_website: website_status is none or bad
- needs_ads: true if there's NO evidence of currently running Meta ads. Check the Meta Ad Library: https://www.facebook.com/ads/library/?q=<business name>&active_status=active (save that link as ads_library_url)
- score 1-100 for selling Meta ads + websites. Reward no/bad website, no ads running, a decent review count (real customers and real money), an active social presence (before/after posts are a strong sign they care about growth), and mobile detailers with a booking gap (no online booking link). Penalize a solid website plus active ads, or almost no reviews (too new or small).
- score_reason: one short line, e.g. "No ads, 4.9★/132 reviews, active IG, weak site"

## Save to SELLO OS
Database: the "SELLO OS" artifact at https://claude.ai/artifact/ErYiqdmE162tkVLSzzQ1yi, collection `leads`, via the ArtifactData tool.
1. Dedupe first: list `leads` and skip any whose business name (lowercased, letters/digits only) or phone already exists.
2. Create each new lead with doc_id `lf-<slug-of-name>` and fields: business_name, niche, city, address, phone, email, owner_name, website_url, website_status, instagram_handle, instagram_followers, google_rating, review_count, needs_website, needs_ads, ads_library_url, score, score_reason, status "not_contacted", touch_count 0, source "Lead Finder", created_at (now, ISO), notes "".
3. Use one ArtifactData `batch` for all new leads.

## Report back
A table sorted by score: business, score, why, phone or email, IG. Then "Saved N new leads, skipped M duplicates" and the dashboard link. Offer to write outreach for the top 3 (sello-outreach-writer skill).
