from dsl import *

REELS_A = [
dict(
    id="R01", slug="not-a-lead-problem", title="You Don't Have a Lead Problem",
    pillar="Conversion", industry="Plumbing / HVAC", music="pulse",
    beats=[
        ("Your business doesn't have a lead problem.", T("You don't have a lead problem.", accent="lead problem", kicker="CONVERSION")),
        ("It has a what-happens-next problem.", T("You have a what-happens-next problem.", accent="what-happens-next", bg="ivory")),
        ("Think about the last ten people who called you.", PH("missed_call_jobsite", move="in", stock="Phone ringing face-up on a toolbox while a plumber works under a sink in the background")),
        ("How many hit voicemail while you were under a sink?", PHONE("missed", calls=["Mobile · 9:14 AM", "Mobile · 10:02 AM", "Mobile · 11:47 AM", "Mobile · 1:20 PM"])),
        ("How many got a callback the next morning?", PHONE("sms", msgs=[["me", "Hey, sorry, just seeing this. Still need help?"], ["them", "All set. Found someone last night."]], header="Yesterday's caller")),
        ("By then, they'd already booked someone else.", IL("house_tech", label="SOMEONE ELSE GOT THE JOB", stock="Homeowner opening the door to a competitor's technician")),
        ("More ads won't fix that. They just pour water into a leaky bucket.", BARS("Where the leads go", [("Leads", 40, "40"), ("Reached", 22, "22"), ("Booked", 9, "9")], win=2)),
        ("Fix the bucket first. Answer fast, text back in minutes, and follow up.", LIST(["Answer every call", "Text back in under 5 minutes", "Follow up 4+ times"], title="Fix the bucket", mode="check")),
        ("Then turn the ads up.", T("Then turn the ads up.", accent="ads up", bg="gold")),
        ("Follow Vantier for marketing that books jobs, not just calls.", CTA("Marketing that books jobs.")),
    ],
    caption="""Most service businesses don't need more leads. They need fewer leads leaking out of the bucket.

Before you spend another dollar on Facebook or Instagram ads, look at what happens after the phone rings:

→ How many calls go to voicemail while you're on a job?
→ How fast does someone call back?
→ Does anyone follow up after the first try?

If any of those answers make you wince, that's where your growth is hiding. Fix it and every dollar you spend on lead generation works harder.

Save this for your next team meeting, and follow @official.vantier for marketing that books jobs, not just calls.""",
    tags=["servicebusiness", "leadgeneration", "plumbingbusiness", "hvacbusiness", "smallbusinessmarketing"],
    cta="Follow",
),
dict(
    id="R02", slug="stop-boosting-posts", title="Stop Boosting Posts",
    pillar="Paid Advertising", industry="Cleaning", music="drive",
    beats=[
        ("Stop hitting the boost button.", PHONE("boost")),
        ("Boost tells Meta to find people who like and comment.", PHONE("notif", items=["liked your post", "liked your post", "commented: 🔥", "liked your post", "liked your post"])),
        ("Not people who need their house cleaned.", IL("spray", label="WHO YOU ACTUALLY WANT", stock="House cleaner wiping a kitchen island in a bright modern home")),
        ("So you get likes from your cousin, and zero booked cleanings.", STAT("0", "booked cleanings", sub="142 likes")),
        ("If you want customers, run an actual campaign with a leads objective.", SPLIT("Boosted post", ["Optimizes for likes", "Random reach", "No lead form"], "Leads campaign", ["Optimizes for inquiries", "Your service area", "Qualifying form"])),
        ("Tight service area. One clear offer. A form that asks the right questions.", LIST(["Tight service area", "One clear offer", "A form that qualifies"], mode="check")),
        ("Same budget. Completely different result.", T("Same budget. Different result.", accent="Different result.")),
        ("Send this to a business owner who's still boosting.", CTA("Send this to an owner who still boosts.")),
    ],
    caption="""The boost button is the most expensive "easy" button in marketing.

When you boost a post, you're telling Meta to find people likely to like, comment and share. That's great for engagement. It's terrible for getting a cleaning, a quote request or a booked job.

If your goal is customers, build a real campaign in Ads Manager:
1. Choose the Leads objective
2. Set a tight radius around the areas you actually serve
3. Lead with one clear offer
4. Use a form that asks one or two qualifying questions

Same budget. Very different results.

Know someone who's still boosting? Send this to them.""",
    tags=["facebookads", "instagramads", "paidadvertising", "cleaningbusiness", "servicebusinessmarketing"],
    cta="Share",
),
dict(
    id="R03", slug="1000-dollar-plan", title="If I Had $1,000 to Market a Local Service Business",
    pillar="Business Growth", industry="Local service (any)", music="drive",
    beats=[
        ("If I had a thousand dollars to market a local service business, here's where it goes.", T("$1,000. Here's where it goes.", accent="where it goes.", kicker="THE PLAYBOOK")),
        ("Zero on a new logo. Zero on a website redesign.", LIST(["New logo — $0", "Website redesign — $0"], mode="strike")),
        ("Six hundred goes into one Meta lead campaign.", BUDGET(1000, [("Lead campaign", 600), ("Retargeting", 200), ("Reserve", 200)], hl=0)),
        ("One service, one offer, three different video hooks.", LIST(["1 service", "1 offer", "3 video hooks"])),
        ("Two hundred goes to retargeting the people who watched those videos.", BUDGET(1000, [("Lead campaign", 600), ("Retargeting", 200), ("Reserve", 200)], hl=1)),
        ("They know you. They just need a reason.", PHONE("feed", sponsored=True, headline="Still thinking about it?", stock="Person scrolling Instagram on the couch in the evening")),
        ("The last two hundred stays in reserve.", BUDGET(1000, [("Lead campaign", 600), ("Retargeting", 200), ("Reserve", 200)], hl=2)),
        ("After two weeks, whichever ad booked the most jobs gets it.", BARS("Booked jobs after 14 days", [("Hook A", 3, "3"), ("Hook B", 9, "9"), ("Hook C", 4, "4")], win=1)),
        ("No guessing. Just money following results.", T("Money follows results.", accent="results.", bg="ivory")),
        ("Save this so the plan's ready when you are.", CTA("Save the plan.")),
    ],
    caption="""If I had $1,000 to market a local service business, here's exactly where it would go:

$0 → new logo, website redesign, "branding"
$600 → one Meta lead campaign. One service, one offer, three different video hooks.
$200 → retargeting everyone who watched those videos but didn't reach out
$200 → reserve. After two weeks, it goes to whichever hook booked the most jobs.

No guessing. No spreading a small budget across ten ideas. Just money following results.

This works for roofers, HVAC, cleaners, detailers, landscapers and almost any local service business.

Save this so the plan is ready when you are.""",
    tags=["smallbusinessmarketing", "metaads", "advertisingstrategy", "localbusiness", "businessgrowth"],
    cta="Save",
),
dict(
    id="R04", slug="worse-work-busier", title="Why Your Competitor Gets Customers You Should Be Getting",
    pillar="Competitor / Market Analysis", industry="Home services", music="pulse",
    beats=[
        ("Your competitor does worse work than you, and they're still busier.", T("They do worse work. They're still busier.", accent="still busier.", kicker="COMPETITOR ANALYSIS")),
        ("Here's why. Homeowners can't judge quality until after the job.", IL("house", label="QUALITY IS INVISIBLE UP FRONT", stock="Homeowner looking out the window at a contractor's truck in the driveway")),
        ("So they choose based on what they can see.", T("They choose what they can see.", accent="see.", bg="ivory")),
        ("Who shows up when they scroll.", PHONE("feed", sponsored=True, headline="Same-day service. Book in 60 seconds.")),
        ("Who answers first.", PHONE("sms", msgs=[["them", "Hi, do you have anything today?"], ["me", "Yes! We can be there at 3. Want it?"]], header="Replied in 2 min")),
        ("Who looks the most established.", IL("van_fleet", label="LOOKS ESTABLISHED", stock="Owner standing in front of a clean fleet of service vans")),
        ("They're not winning on skill. They're winning on visibility.", SPLIT("You", ["Better work", "Hard to find", "Slow to reply"], "Them", ["Average work", "Everywhere", "Answers fast"])),
        ("The good news? That's the easiest part to fix.", T("That's the easy part to fix.", accent="easy part", bg="gold")),
        ("Follow for the playbook.", CTA("Follow for the playbook.")),
    ],
    caption="""It's one of the most frustrating things in a service business: watching a competitor who does worse work stay busier than you.

Here's the uncomfortable truth. Homeowners can't judge your quality until after the job is done. So they decide based on what they CAN see:

• Who shows up when they're scrolling
• Who answers or texts back first
• Who looks the most established

Your competitor isn't beating you on skill. They're beating you on visibility and speed. And unlike skill, those are fast to fix.

Follow @official.vantier for the playbook on winning the jobs you should already be getting.""",
    tags=["competitoranalysis", "localbusinessmarketing", "homeservices", "contractormarketing", "customeracquisition"],
    cta="Follow",
),
dict(
    id="R05", slug="views-dont-pay-bills", title="Fifty Thousand Views. Zero Bookings.",
    pillar="Social Media Marketing", industry="Auto detailing", music="glass",
    beats=[
        ("Fifty thousand views. Zero bookings.", STAT("50,000", "views", sub="0 bookings")),
        ("A detailing video blows up, and the calendar doesn't move.", IL("car_shine", label="AUTO DETAILING", stock="Detailer polishing a black SUV under LED light panels")),
        ("Because views measure attention, not intent.", SPLIT("Views", ["Attention", "Entertainment"], "Bookings", ["Intent", "Revenue"])),
        ("Attention is watching a car get polished. Intent is asking how much for yours.", PHONE("dm", msgs=[["them", "How much for a full interior on a 2021 Tahoe?"]], header="New message")),
        ("So track the numbers that show intent.", T("Track intent.", accent="intent.", bg="ivory")),
        ("Price DMs. Clicks to your booking page. Slots filled this week.", LIST(["Price DMs", "Booking-page clicks", "Slots filled this week"], mode="check")),
        ("Two thousand views with six booking requests beats fifty thousand with none. Every time.", BARS("Booking requests", [("50K-view video", 0, "0"), ("2K-view video", 6, "6")], win=1)),
        ("Save this, and check your numbers this week.", CTA("Save this. Check your numbers.")),
    ],
    caption="""A video can go viral and your calendar can stay exactly the same.

Views measure attention. Bookings come from intent. For a local service business like auto detailing, the numbers worth tracking are a lot less exciting:

✔ DMs asking for a price
✔ Clicks to your booking page
✔ Slots filled this week

A 2,000-view video that brings in six booking requests beats a 50,000-view video that brings in none. Every time.

Make content for the people near you who need your service this month, not for the algorithm.

Save this and check your real numbers this week.""",
    tags=["socialmediamarketing", "autodetailing", "detailingbusiness", "instagrammarketing", "smallbusinesstips"],
    cta="Save",
),
dict(
    id="R06", slug="roofing-from-zero", title="How We'd Market a Roofing Company From Zero",
    pillar="Customer Acquisition", industry="Roofing", music="drive",
    beats=[
        ("Here's how we'd market a roofing company starting from zero.", IL("roof", text="Roofing company. Zero to booked.", accent="booked.", label="ROOFING PLAYBOOK", stock="Roofer nailing shingles at golden hour, drone pull-back")),
        ("Step one. Sell an inspection, not a roof.", T("1 — Sell the inspection, not the roof.", accent="inspection,", bg="ivory")),
        ("Nobody buys a fifteen thousand dollar roof from an ad. A free inspection with a photo report? Easy yes.", SPLIT("The ask", ["$15,000 roof", "Big, scary decision"], "The offer", ["Free inspection", "Photo report of every issue"])),
        ("Step two. Show real roofs in their neighborhood.", IL("map", label="2 — LOCAL PROOF", stock="Aerial drone shot over a suburban neighborhood's rooftops")),
        ("Drone shots, before and afters, your crew on site.", IL("storm_roof", label="BEFORE → AFTER", stock="Close-up of storm-damaged shingles, then the finished roof")),
        ("Step three. Call every lead inside five minutes.", TIMER(300, "3 — Call within 5 minutes")),
        ("Step four. Retarget everyone who watched but didn't book.", FLOW(["Watched video", "Saw a review", "Booked inspection"], title="4 — Retarget")),
        ("Roofing is a trust purchase. Earn it before the inspection, not during it.", T("Earn trust before the inspection.", accent="before", bg="gold")),
        ("Save this if you're in roofing.", CTA("Save this if you're in roofing.")),
    ],
    caption="""If we were marketing a roofing company starting from zero, this is the order we'd do it in:

1️⃣ Sell the inspection, not the roof. Nobody buys a $15,000 roof from an ad. A free inspection with a photo report of every issue is an easy yes.
2️⃣ Show real roofs in their neighborhood. Drone shots, before and afters, your crew on site. Local proof beats stock photos.
3️⃣ Call every lead within five minutes. Roofing leads shop around fast.
4️⃣ Retarget everyone who watched but didn't book, with reviews and proof.

Roofing is a trust purchase. Your marketing has to earn that trust before the inspection, not during it.

Save this if you're in roofing, or send it to a roofer who needs it.""",
    tags=["roofingmarketing", "roofingcompany", "roofingbusiness", "leadgeneration", "contractormarketing"],
    cta="Save",
),
dict(
    id="R07", slug="five-minute-rule", title="The Five-Minute Rule",
    pillar="Lead Generation", industry="HVAC / Plumbing", music="pulse",
    beats=[
        ("A lead that waits an hour is probably a lead you've lost.", TIMER(3600, "Waiting on a callback", tone="red")),
        ("When someone fills out your form, they're not filling out one form.", PHONE("notif", items=["New lead: Sarah M. — AC not cooling"], lead=True)),
        ("They're filling out three.", GRID(["Company A", "Company B", "You"], label="SAME LEAD, THREE COMPANIES")),
        ("And whoever calls first usually gets the job.", IL("house_tech", label="FIRST CALL WINS", stock="Technician arriving at a homeowner's front door")),
        ("Not the cheapest. Not the best reviewed. The first.", LIST(["Not the cheapest.", "Not the best reviewed.", "The first."], mode="plain")),
        ("So set a five-minute rule.", TIMER(300, "Your new rule")),
        ("An instant text the second a lead comes in, and a real call inside five minutes.", PHONE("sms", msgs=[["me", "Hi Sarah, it's Mike with the AC team. Got your request. Calling you in 2 minutes."]], header="Sent automatically · 0:04")),
        ("If you can't do that during jobs, that's your first hire. Not more ads.", T("That's your first hire. Not more ads.", accent="first hire.", bg="ivory")),
        ("Follow Vantier for systems that turn leads into jobs.", CTA("Systems that turn leads into jobs.")),
    ],
    caption="""Speed to lead is the most underrated lever in a service business.

When someone fills out a form for AC repair, a leak or a quote, they're rarely filling out just one. They're usually contacting two or three companies at once. And the job often goes to whoever responds first, not the cheapest and not the one with the most reviews.

Set a five-minute rule:
→ An automatic text the second a lead comes in
→ A real phone call within five minutes
→ If nobody can do that during jobs, that's your next hire, before more ad spend

Faster response alone can turn the same ad budget into more booked jobs.

Follow @official.vantier for more lead generation systems for service businesses.""",
    tags=["leadgeneration", "speedtolead", "hvacmarketing", "plumbingmarketing", "servicebusiness"],
    cta="Follow",
),
dict(
    id="R08", slug="three-reasons-ads-dont-convert", title="3 Reasons Your Ads Aren't Converting",
    pillar="Advertising Mistakes", industry="Remodeling / Home improvement", music="drive",
    beats=[
        ("Three reasons your ads aren't converting, and none of them are the algorithm.", T("3 reasons your ads don't convert.", accent="don't convert.", kicker="AD MISTAKES")),
        ("One. Your first three seconds don't say who it's for.", LIST(["Weak first 3 seconds", "Same offer as everyone", "Asking too much, too soon"], hl=0)),
        ("If it opens on your logo, the scroll already won.", PHONE("feed", sponsored=True, headline="[ YOUR LOGO HERE ]", swipe=True)),
        ("Open on the problem. The dated kitchen. The cracked tile.", IL("kitchen", label="OPEN ON THE PROBLEM", stock="Slow push-in on a dated 1990s kitchen with cracked tile counters")),
        ("Two. Your offer sounds like everyone else's. Free estimates aren't an offer.", LIST(["Weak first 3 seconds", "Same offer as everyone", "Asking too much, too soon"], hl=1)),
        ("Three. You're asking for too much, too soon.", LIST(["Weak first 3 seconds", "Same offer as everyone", "Asking too much, too soon"], hl=2)),
        ("A twelve field form loses people. Ask for a name, a number, and one good question.", PHONE("form", fields=["Name", "Phone", "When do you want to start?"], cut=12)),
        ("Fix those three before you ever touch targeting.", T("Fix these before targeting.", accent="before targeting.", bg="ivory")),
        ("Save this and check your ads tonight.", CTA("Save this. Check your ads tonight.")),
    ],
    caption="""Before you blame the algorithm, check these three things. They're behind most service business ads that get clicks but no customers:

1. Your first three seconds don't say who it's for. If the video opens on your logo, the scroll already won. Open on the problem: the dated kitchen, the cracked tile, the leak.

2. Your offer sounds like everyone else's. "Free estimates" isn't an offer anymore. Everyone has one.

3. You're asking for too much, too soon. A 12-field form loses people. Name, number and one good qualifying question is plenty.

Fix these before you touch targeting. Save this and check your ads tonight.""",
    tags=["facebookads", "advertisingtips", "remodelingbusiness", "homeimprovement", "admistakes"],
    cta="Save",
),
dict(
    id="R09", slug="specifics-sell", title="Your Service Is Great. Your Marketing Isn't Saying It.",
    pillar="Marketing Mistakes", industry="HVAC", music="glass",
    beats=[
        ("Your service might be great. Your marketing isn't saying it.", T("Great service. Invisible marketing.", accent="Invisible", kicker="MESSAGING")),
        ("Here's what most HVAC ads sound like.", PH("hvac_condenser", move="up", stock="HVAC technician servicing an outdoor AC condenser behind a home")),
        ("Quality service. Family owned. Call today.", QUOTE(["Quality service.", "Family owned.", "Call today!"], kind="bad", label="TYPICAL HVAC AD")),
        ("Every competitor in your city says the exact same thing.", GRID(["Quality service.", "Quality service.", "Quality service.", "Quality service.", "Quality service.", "Quality service."], label="EVERY COMPETITOR")),
        ("Now compare that. Same-day AC repair. Upfront price before we touch anything. Breaks again in ninety days? The visit's on us.", QUOTE(["Same-day AC repair.", "Upfront price before we touch anything.", "Breaks again in 90 days? The visit's on us."], kind="offer", label="SPECIFIC")),
        ("That's not better writing. It's specifics.", T("Specifics sell.", accent="sell.", bg="ivory")),
        ("Specifics make you believable. Vague makes you invisible.", SPLIT("Vague", ["Invisible", "Forgettable"], "Specific", ["Believable", "Bookable"])),
        ("Comment your trade, and we'll show you how to make yours specific.", CTA("Comment your trade.")),
    ],
    caption="""Your service might be excellent. But if your ad says "Quality service. Family owned. Call today!", you sound exactly like every other company in your city.

Vague claims don't build trust. Specifics do.

❌ "Quality service you can trust"
✅ "Same-day AC repair. Upfront price before we touch anything. If it breaks again in 90 days, the visit's on us."

The second one isn't better writing. It's a clearer promise. It tells people what happens, when, and what they're protected from.

Look at your own ads and website headline. Could a competitor swap in their name and use it as-is? If so, it's not specific enough.

Comment your trade below and we'll show you how to make your message specific.""",
    tags=["hvacmarketing", "marketingtips", "copywriting", "servicebusinessmarketing", "hvaccontractor"],
    cta="Comment",
),
dict(
    id="R10", slug="discounts-arent-offers", title="10% Off Is Not an Offer",
    pillar="Offer Creation", industry="Lawn care / Landscaping", music="glass",
    beats=[
        ("Ten percent off is not an offer.", T("10% off is not an offer.", accent="not an offer.", kicker="OFFER CREATION")),
        ("Nobody picks a lawn care company to save twenty bucks.", IL("mower", label="LAWN CARE", stock="Landscaper mowing perfect stripes into a front lawn, early morning")),
        ("What stops people from booking isn't price. It's risk.", T("It's not price. It's risk.", accent="risk.", bg="ivory")),
        ("What if they don't show up? What if it doesn't work?", QUOTE(["What if they don't show up?", "What if it doesn't work?", "What if it costs more than they said?"], kind="thought")),
        ("So remove it. Weeds back between visits? We come back free. Price locked in writing. Not happy after the first visit? You don't pay.", QUOTE(["Weeds back between visits? We come back free.", "Price locked in writing.", "Not happy after visit one? You don't pay."], kind="offer", label="RISK REMOVED")),
        ("A discount lowers your price. A guarantee lowers their fear.", SPLIT("Discount", ["Lowers your price"], "Guarantee", ["Lowers their fear"])),
        ("Only one of those builds a business.", T("Only one builds a business.", accent="builds", bg="gold")),
        ("Send this to an owner who's still running discounts.", CTA("Send this to an owner running discounts.")),
    ],
    caption="""10% off doesn't move people. Removing their risk does.

When someone hesitates to book a lawn care company (or any home service), it's rarely about saving $20. It's about doubt:

→ What if they don't show up?
→ What if it doesn't work?
→ What if the price changes?

So answer those fears in the offer itself:
• "Weeds back between visits? We come back free."
• "Your price, locked in writing."
• "Not happy after the first visit? You don't pay for it."

A discount lowers your price. A guarantee lowers their fear. Only one of those builds a business with healthy margins.

Send this to an owner who's still running discounts.""",
    tags=["offercreation", "lawncare", "landscapingbusiness", "marketingpsychology", "smallbusinessowner"],
    cta="Share",
),
dict(
    id="R11", slug="ads-die-after-two-weeks", title="Why Your Ads Die After Two Weeks",
    pillar="Paid Advertising", industry="Landscaping", music="pulse",
    beats=[
        ("Your ad crushed it for two weeks. Then it died.", LINE("Cost per lead", [22, 21, 23, 22, 24, 23, 25, 31, 38, 46, 55], mark=6)),
        ("You didn't break anything. Your audience just got tired of it.", IL("leaf", label="SAME AD, SAME PEOPLE", stock="Landscaping crew edging and planting in front of a home")),
        ("In a local market, the same few thousand people see your ad over and over.", STAT("4.8×", "times each person saw it", sub="frequency after 3 weeks", count=False)),
        ("By the fifth time, it's wallpaper.", PHONE("feed", sponsored=True, headline="Spring cleanup special", swipe=True)),
        ("The fix isn't a new campaign. It's new creative.", T("Not a new campaign. New creative.", accent="New creative.", bg="ivory")),
        ("Keep the offer. Change the hook.", SPLIT("Keep", ["Your offer", "Your audience"], "Change", ["First line", "First shot", "Who's talking"])),
        ("A new opening line. A new first shot. A different crew member on camera.", LIST(["New opening line", "New first shot", "New face on camera"])),
        ("Fresh creative every two to three weeks keeps results from falling off a cliff.", LINE("Cost per lead with refreshes", [22, 21, 23, 24, 22, 23, 24, 22, 23, 22, 23], refresh=[3, 6, 9], good=True)),
        ("Follow for more on ads that actually last.", CTA("Ads that actually last.")),
    ],
    caption="""Your ad worked great for two weeks and then results fell off a cliff. Sound familiar?

In a local market, you're showing ads to the same few thousand people. After they've seen the same video four or five times, they stop noticing it. That's creative fatigue, and it's the most common reason local service ads "stop working."

The fix usually isn't a new campaign or new targeting. It's new creative:

→ Keep the offer that works
→ Change the hook (the opening line and the first shot)
→ Put a different crew member on camera

Plan on fresh creative every 2–3 weeks and your cost per lead stays steady instead of creeping up.

Follow @official.vantier for more on running Meta ads that last.""",
    tags=["metaads", "facebookadstips", "landscapingmarketing", "adcreative", "paidsocial"],
    cta="Follow",
),
dict(
    id="R12", slug="retargeting-explained", title="Retargeting, Explained in 30 Seconds",
    pillar="Retargeting", industry="Remodeling", music="glass",
    beats=[
        ("Most people won't book the first time they see you. That's normal.", T("Most people won't book the first time.", accent="first time.", kicker="RETARGETING")),
        ("Especially for a bathroom remodel.", IL("bath", label="BATHROOM REMODEL", stock="Tile installer setting large-format tile in a bathroom remodel")),
        ("They watch your video, check your profile, then life gets in the way.", PHONE("profile", name="Your Company", tagline="Bathroom & kitchen remodeling", stock="Homeowner scrolling a contractor's Instagram profile on the couch")),
        ("Retargeting keeps you in front of them while they decide.", FLOW(["Watched your video", "Saw a review", "Got the offer", "Booked"], active=0)),
        ("Day one, they see your crew at work.", TL([("Day 1", "Your crew at work"), ("Day 4", "A neighbor's review"), ("Day 10", "A reason to book now")], active=0)),
        ("Day four, a review from someone nearby.", TL([("Day 1", "Your crew at work"), ("Day 4", "A neighbor's review"), ("Day 10", "A reason to book now")], active=1)),
        ("Day ten, a reason to book this month.", TL([("Day 1", "Your crew at work"), ("Day 4", "A neighbor's review"), ("Day 10", "A reason to book now")], active=2)),
        ("Your competitors show up once. You show up five times.", SPLIT("Them", ["1 touch"], "You", ["5 touches"])),
        ("Save this for when you set up retargeting.", CTA("Save this for later.")),
    ],
    caption="""Most people won't book the first time they see your ad. Especially for a bigger decision like a bathroom remodel. That's normal, and it's exactly what retargeting is for.

Retargeting means showing follow-up ads to people who already engaged: they watched your video, visited your profile or clicked through to your site.

A simple sequence:
Day 1 → your crew at work (who you are)
Day 4 → a review from someone nearby (proof)
Day 10 → a reason to book this month (the offer)

Same people, different message, each step closer to booking. Your competitors show up once. You show up five times.

Save this for when you set up retargeting.""",
    tags=["retargeting", "remodelingcontractor", "facebookads", "digitalmarketing", "customeracquisition"],
    cta="Save",
),
dict(
    id="R13", slug="cheapest-leads-most-expensive", title="The Cheapest Leads Are the Most Expensive",
    pillar="Customer Acquisition", industry="Moving", music="pulse",
    beats=[
        ("The cheapest leads are usually the most expensive.", T("Cheap leads are expensive.", accent="expensive.", kicker="THE MATH")),
        ("Here's the math for a moving company.", IL("truck", label="MOVING COMPANY", stock="Movers carrying a wrapped dresser up a moving truck ramp")),
        ("Campaign A gets leads for fifteen dollars. Campaign B, forty-five.", BARS("Cost per lead", [("Campaign A", 15, "$15"), ("Campaign B", 45, "$45")], win=0)),
        ("A looks like the winner. But only one in twenty of those leads books a move.", MATH([("20 leads", "× $15", "$300")], note="Campaign A · cost per booked move")),
        ("That's three hundred dollars per booked job.", STAT("$300", "per booked move", sub="Campaign A", tone="red")),
        ("One in four of B's leads books. That's a hundred and eighty.", MATH([("4 leads", "× $45", "$180")], note="Campaign B · cost per booked move")),
        ("Judge ads by cost per booked job, not cost per lead.", BARS("Cost per booked move", [("Campaign A", 300, "$300"), ("Campaign B", 180, "$180")], win=1)),
        ("Share this with whoever runs your ads.", CTA("Share this with whoever runs your ads.")),
    ],
    caption="""The cheapest leads are often the most expensive ones. Here's the math (example numbers):

Campaign A: $15 per lead. 1 in 20 books a move.
→ 20 × $15 = $300 per booked move

Campaign B: $45 per lead. 1 in 4 books a move.
→ 4 × $45 = $180 per booked move

Campaign A "wins" on cost per lead and loses where it actually matters.

If you only look at cost per lead, you'll keep scaling the campaign that brings in tire-kickers and cutting the one that brings in real customers. Track every lead through to booked jobs and judge your ads on cost per booked job.

Share this with whoever runs your ads.""",
    tags=["movingcompany", "costperlead", "customeracquisition", "facebookads", "marketingmath"],
    cta="Share",
),
dict(
    id="R14", slug="you-dont-need-viral", title="You Do Not Need to Go Viral",
    pillar="Marketing Myths", industry="Electrical", music="glass",
    beats=[
        ("You do not need to go viral.", T("You do not need to go viral.", accent="viral.", kicker="MARKETING MYTHS")),
        ("Think about a local electrician.", IL("panel", label="LOCAL ELECTRICIAN", stock="Electrician with a headlamp working inside a residential breaker panel")),
        ("Your service area might have eighty thousand homes.", STAT("80,000", "homes in your service area", count=True)),
        ("This month, only a small slice of them need an electrician.", DOTS(100, 3, "need an electrician this month", sub="illustrative")),
        ("That slice is the only audience that matters.", T("That slice is your audience.", accent="your audience.", bg="ivory")),
        ("A million views from across the country won't fill your schedule.", STAT("1,000,000", "views from everywhere", strike=True)),
        ("Being the name those few hundred locals see again and again will.", CAL(0.85, "Booked from local repetition")),
        ("Stop chasing reach. Own your zip codes.", T("Own your zip codes.", accent="zip codes.", bg="gold")),
        ("Follow for local marketing that actually pays.", CTA("Local marketing that pays.")),
    ],
    caption="""Local service businesses don't need to go viral. They need to be known by the right few hundred people.

Think about an electrician. Your service area might have tens of thousands of homes, but only a small slice need an electrician in any given month. That slice is your entire market right now.

A million views from across the country won't fill your schedule. Being the name those local homeowners see again and again, in their feed, in reviews, in their neighbor's recommendation, will.

Stop chasing reach. Own your zip codes:
• Tight geographic targeting
• Consistent, repeated presence
• Proof from local jobs

Follow @official.vantier for local marketing that actually pays.""",
    tags=["electricianbusiness", "localmarketing", "marketingmyths", "instagramforbusiness", "smallbusinessmarketing"],
    cta="Follow",
),
dict(
    id="R15", slug="what-a-customer-is-worth", title="That $150 Customer Isn't Worth $150",
    pillar="Business Growth", industry="Pest control", music="glass",
    beats=[
        ("That hundred-fifty-dollar customer isn't worth a hundred fifty dollars.", T("A $150 customer isn't worth $150.", accent="isn't worth $150.", kicker="KNOW YOUR NUMBERS")),
        ("Say you run a pest control company.", IL("shield_bug", label="PEST CONTROL", stock="Pest control technician spraying a home's exterior perimeter")),
        ("A new customer signs up for quarterly service at a hundred fifty a visit.", MATH([("$150", "× 4 visits", "$600 / yr")])),
        ("If they stay three years, that's eighteen hundred.", MATH([("$150", "× 4 visits", "$600 / yr"), ("$600", "× 3 years", "$1,800")])),
        ("Plus the neighbor they refer.", MATH([("$150", "× 4 visits", "$600 / yr"), ("$600", "× 3 years", "$1,800"), ("+ referrals", "", "even more")])),
        ("So when you ask, can I afford sixty dollars to get a customer, you're asking the wrong question.", T("“Can I afford $60 for a customer?”", accent="$60", bg="ivory", sub="Wrong question.")),
        ("Know what a customer is worth over time, and you'll stop being scared to invest in getting one.", SPLIT("Cost to acquire", ["$60"], "Worth over 3 years", ["$1,800+"])),
        ("Save this and run your own numbers.", CTA("Save this. Run your numbers.")),
    ],
    caption="""If you sell recurring service, your customers are worth far more than their first invoice.

Example: pest control at $150 per quarterly visit.
$150 × 4 visits = $600 a year
$600 × 3 years = $1,800
Plus the neighbors they refer.

So "can I afford $60 in ad spend to get a customer?" is the wrong question. The real question is: what is a customer worth to you over time, and how much of that are you willing to invest to win one?

Owners who know their customer lifetime value outspend competitors who don't, and still make more money.

Save this and run the numbers for your own business.""",
    tags=["pestcontrol", "pestcontrolbusiness", "customerlifetimevalue", "businessgrowth", "knowyournumbers"],
    cta="Save",
),
dict(
    id="R16", slug="website-losing-calls", title="Your Website Might Be Losing You Calls",
    pillar="Conversion", industry="Auto repair", music="pulse",
    beats=[
        ("Your website might be losing you calls every day.", T("Your website is losing calls.", accent="losing calls.", kicker="CONVERSION")),
        ("Pull it up on your phone right now.", PHONE("site", state="loading")),
        ("Can someone tap to call in one second, without scrolling?", PHONE("site", state="call")),
        ("Does it say what you fix, right at the top?", PHONE("site", state="hero")),
        ("Does it load before they lose patience?", TIMER(5, "Page still loading…", tone="red", unit="sec")),
        ("Someone with a check engine light isn't browsing. They want to know you can fix it, and how to reach you.", IL("car_wrench", label="AUTO REPAIR", stock="Mechanic under the hood of a sedan talking with the customer")),
        ("One clear headline. One big call button. Real shop photos. Reviews up top.", LIST(["One clear headline", "One big call button", "Real shop photos", "Reviews up top"], mode="check")),
        ("That's the whole job of your homepage.", T("That's the whole job.", accent="whole job.", bg="ivory")),
        ("Send this to whoever built your website.", CTA("Send this to your web person.")),
    ],
    caption="""Pull up your website on your phone right now and be honest:

☐ Can someone tap to call in one second, without scrolling?
☐ Does the top of the page say what you fix and where?
☐ Does it load in a couple of seconds, not five?
☐ Are there real photos of your shop and your team?
☐ Are your reviews visible without hunting for them?

Someone with a check engine light isn't browsing. They want to know you can fix it and how to reach you, fast. That's the entire job of your homepage.

Most service business websites don't need a redesign. They need these five fixes.

Send this to whoever built your website.""",
    tags=["autorepair", "autorepairshop", "websitetips", "conversionrate", "localbusinessmarketing"],
    cta="Share",
),
dict(
    id="R17", slug="sell-the-outcome", title="Nobody Wants to Buy a Water Heater",
    pillar="Marketing Psychology", industry="Plumbing", music="glass",
    beats=[
        ("Nobody wants to buy a water heater.", T("Nobody wants a water heater.", accent="water heater.", kicker="MARKETING PSYCHOLOGY")),
        ("They want a hot shower before work tomorrow. That's what you're really selling.", IL("shower", label="WHAT THEY'RE REALLY BUYING", stock="Plumber installing a new tank water heater in a garage")),
        ("But most plumbing ads talk about the company. Years in business. Certified techs.", QUOTE(["30 years in business.", "Certified technicians.", "Quality you can trust."], kind="bad", label="COMPANY-CENTERED")),
        ("The customer is thinking one thing. When can I shower again?", T("“When can I shower again?”", accent="shower again?", bg="ivory")),
        ("So answer that. No hot water? New heater in tomorrow, old one hauled away.", QUOTE(["No hot water?", "New heater in tomorrow.", "Old one hauled away."], kind="offer", label="CUSTOMER-CENTERED")),
        ("Lead with their problem and the moment it's solved. Your credentials are the proof, not the headline.", SPLIT("Headline", ["Their outcome"], "Proof", ["Your credentials"], win="none")),
        ("Follow Vantier for ads that talk like your customers think.", CTA("Ads that talk like customers think.")),
    ],
    caption="""Nobody wants to buy a water heater. They want a hot shower before work tomorrow.

Most plumbing ads lead with the company: years in business, certifications, "quality you can trust." That's all important, but it's not what the customer is thinking about at 6 a.m. with a cold shower.

They're thinking: when can I shower again?

So say that:
"No hot water? New heater installed tomorrow, old one hauled away."

Lead with their problem and the moment it's solved. Use your credentials as the proof underneath, not as the headline.

This works for every trade: sell the outcome, back it up with the credentials.

Follow @official.vantier for ads that talk like your customers think.""",
    tags=["plumbingbusiness", "marketingpsychology", "adcopy", "plumbingmarketing", "servicebusinessmarketing"],
    cta="Follow",
),
]
