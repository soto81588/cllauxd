"""18 Instagram carousels (4:5, 1080x1350).

Slide kinds: cover, point, quote, eq, sms, compare, list, myth, metric, ad,
day, search, statement, final.
"""

CAROUSELS = [
dict(
    id="C01", slug="meta-ad-setup-mistakes", title="5 Meta Ad Mistakes Quietly Draining Your Budget",
    pillar="Advertising Mistakes", industry="Service businesses", theme="ink",
    slides=[
        dict(k="cover", kicker="PAID ADVERTISING", title="5 Meta ad mistakes quietly draining your budget", accent="draining your budget", icon="dash"),
        dict(k="point", n="01", head="Picking the wrong objective", body="Engagement and traffic campaigns find people who like and click, not people who book. If you want calls and form fills, choose Leads."),
        dict(k="point", n="02", head="No tracking set up", body="Without the Meta pixel and Conversions API, Meta can't learn who actually becomes a customer. You're optimizing blind."),
        dict(k="point", n="03", head="Splitting a small budget five ways", body="Five ad sets at $10 a day means none of them get enough data to learn. Consolidate into fewer ad sets."),
        dict(k="point", n="04", head="Judging results after two days", body="Early delivery is noisy. Give a new ad 5–7 days and enough spend before you decide."),
        dict(k="point", n="05", head="Paying for clicks you can't serve", body="Check your map. Tighten the radius and exclude the zip codes you don't work in. Clicks from 40 miles away are a tax on your budget."),
        dict(k="statement", text="Fix these five and results often improve without spending a dollar more.", accent="without spending a dollar more."),
        dict(k="final", line="Save this before your next campaign.", sub="Follow @official.vantier for more"),
    ],
    caption="""Most service business ad accounts we look at have at least one of these five mistakes. None of them are about creativity. They're setup:

1. Wrong objective. Engagement and traffic campaigns find clickers, not customers.
2. No tracking. Without the pixel and Conversions API, Meta can't learn who books.
3. Too many ad sets on a small budget. Nothing gets enough data to learn.
4. Judging after two days. Give new ads 5–7 days and enough spend.
5. Paying for clicks outside your service area. Tighten the radius and exclude zip codes you don't serve.

Fix these and results often improve without spending a dollar more.

Save this before your next campaign and follow @official.vantier for more Facebook and Instagram ads strategy.""",
    tags=["metaads", "facebookads", "admistakes", "paidadvertising", "servicebusinessmarketing"],
    cta="Save",
),
dict(
    id="C02", slug="anatomy-of-an-ad-that-books-jobs", title="Anatomy of an Ad That Books Jobs",
    pillar="Paid Advertising", industry="Roofing (example)", theme="ivory",
    slides=[
        dict(k="cover", kicker="AD ANATOMY", title="Anatomy of an ad that books jobs", accent="books jobs", icon="roof"),
        dict(k="ad", focus=None, label="THE FULL AD"),
        dict(k="ad", focus="hook", label="1 — THE HOOK", body="Calls out the exact customer in the first line. Not your company name."),
        dict(k="ad", focus="problem", label="2 — THE PROBLEM", body="Names what they're worried about, in their words: leaks, surprise bills, contractors who vanish."),
        dict(k="ad", focus="offer", label="3 — THE OFFER", body="A specific, low-risk next step. Not a $15,000 decision."),
        dict(k="ad", focus="proof", label="4 — THE PROOF", body="A number or a name. Specific beats “trusted and reliable.”"),
        dict(k="ad", focus="cta", label="5 — THE CTA", body="One action, plus what happens next and how fast."),
        dict(k="final", line="Want us to tear down your current ad?", sub="Send it to @official.vantier in a DM"),
    ],
    caption="""Every high-converting service ad has the same five parts. Here's the anatomy, using a roofing example (the numbers are illustrative):

1. HOOK: "Homeowners with a roof over 15 years old:" calls out the exact customer
2. PROBLEM: names what they're worried about, in their words
3. OFFER: "Free 20-minute inspection with a photo report." A specific, low-risk next step
4. PROOF: "4.9★ from 212 homeowners in your area." A number beats "trusted and reliable"
5. CTA: "Tap to pick a time. We'll text to confirm within 10 minutes." One action, and what happens next

Swap in your trade and your real numbers and this works for HVAC, plumbing, remodeling, cleaning and more.

Want us to tear down your current ad? Send it to us in a DM.""",
    tags=["adcopy", "facebookads", "roofingmarketing", "advertisingstrategy", "copywriting"],
    cta="DM",
),
dict(
    id="C03", slug="max-you-can-pay-for-a-lead", title="How Much Can You Afford to Pay for a Lead?",
    pillar="Business Growth", industry="Roofing / Remodeling", theme="ink",
    slides=[
        dict(k="cover", kicker="KNOW YOUR NUMBERS", title="How much can you afford to pay for a lead?", accent="pay for a lead?", icon="calc"),
        dict(k="statement", text="Most owners guess. Here's the 3-step math.", accent="3-step math."),
        dict(k="eq", n="01", head="Profit per job", rows=[["$8,000 job", "× 35% margin", "$2,800"]], note="Average job value × gross margin"),
        dict(k="eq", n="02", head="What you'll invest to win it", rows=[["$2,800", "× 20%", "$560"]], note="Your max cost per booked job"),
        dict(k="eq", n="03", head="Your max cost per lead", rows=[["$560", "× 1 in 4 book", "$140"]], note="Max cost per booked job × lead-to-job rate"),
        dict(k="statement", text="A $90 lead might feel expensive. In this example, it's a bargain.", accent="it's a bargain."),
        dict(k="final", line="Save this and plug in your own numbers.", sub="Follow @official.vantier for more"),
    ],
    caption="""How much can you afford to pay for a lead? Most owners guess. Here's the math (example numbers for a roofing or remodeling company):

Step 1: Profit per job
$8,000 average job × 35% gross margin = $2,800

Step 2: What you're willing to invest to win that job
20% of $2,800 = $560 max cost per booked job

Step 3: Your max cost per lead
If 1 in 4 leads books, $560 × 0.25 = $140 per lead

So a $90 lead that feels expensive is actually well under your ceiling.

When you know these three numbers, you stop panicking over cost per lead and start making confident decisions about your ad budget.

Save this and plug in your own numbers.""",
    tags=["knowyournumbers", "costperlead", "roofingbusiness", "remodelingbusiness", "businessgrowth"],
    cta="Save",
),
dict(
    id="C04", slug="offers-that-beat-free-estimate", title="8 Offers That Beat 'Free Estimate'",
    pillar="Offer Creation", industry="Multiple trades", theme="ivory",
    slides=[
        dict(k="cover", kicker="OFFER SWIPE FILE", title="8 offers that beat “free estimate”", accent="“free estimate”", icon="tag"),
        dict(k="quote", label="ROOFING", lines=["Free 20-minute inspection with a photo report of every issue we find."], icon="roof"),
        dict(k="quote", label="HVAC", lines=["Tune-up + priority scheduling all summer. Can't get you in within 24 hours? Your next visit is free."], icon="ac"),
        dict(k="quote", label="CLEANING", lines=["First clean with a re-clean guarantee: miss a spot, we're back within 24 hours."], icon="spray"),
        dict(k="quote", label="LANDSCAPING", lines=["Book spring cleanup now and lock in this year's price."], icon="mower"),
        dict(k="quote", label="AUTO DETAILING", lines=["Interior reset while you wait, or free pickup and drop-off."], icon="car_shine"),
        dict(k="quote", label="GYMS", lines=["14-day starter program: 6 coached sessions, one price, no contract."], icon="dumbbell"),
        dict(k="quote", label="PEST CONTROL", lines=["Pests come back between visits? So do we, free."], icon="shield_bug"),
        dict(k="quote", label="REMODELING", lines=["See your new kitchen in 3D before you sign anything."], icon="kitchen"),
        dict(k="final", line="Save this. Then make yours more specific than your competitor's.", sub="@official.vantier"),
    ],
    caption=""""Free estimate" isn't an offer anymore. Everyone has one. Here are 8 offers that give people a real reason to pick you:

🏠 Roofing: Free 20-minute inspection with a photo report of every issue
❄️ HVAC: Tune-up + priority scheduling all summer, or your next visit is free
🧽 Cleaning: First clean with a re-clean guarantee within 24 hours
🌿 Landscaping: Book spring cleanup now and lock in this year's price
🚗 Detailing: Interior reset while you wait, or free pickup and drop-off
🏋️ Gyms: 14-day starter program, one price, no contract
🐜 Pest control: Pests come back between visits? So do we, free
🔨 Remodeling: See your new kitchen in 3D before you sign

Notice the pattern: specific, low-risk, and easy to say yes to.

Save this, and make yours more specific than your competitor's.""",
    tags=["offercreation", "marketingideas", "servicebusiness", "smallbusinessmarketing", "leadgeneration"],
    cta="Save",
),
dict(
    id="C05", slug="weekly-content-plan", title="What to Post This Week (Service Business Edition)",
    pillar="Social Media Marketing", industry="Service businesses", theme="ink",
    slides=[
        dict(k="cover", kicker="CONTENT PLAN", title="What to post this week if you run a service business", accent="this week", icon="calendar"),
        dict(k="day", day="MON", head="Job of the week", body="A before-and-after, with the price range and how long it took."),
        dict(k="day", day="TUE", head="Answer a real question", body="The question customers ask you on every call. Answer it on camera in 30 seconds."),
        dict(k="day", day="WED", head="Meet the crew", body="15 seconds with one team member. People hire people."),
        dict(k="day", day="THU", head="Review spotlight", body="Read a real review on camera, over footage of that job."),
        dict(k="day", day="FRI", head="Behind the scenes", body="The part of the job customers never see, and why you do it right."),
        dict(k="day", day="SAT", head="Open slots", body="“3 openings next week.” A simple reminder with your booking link."),
        dict(k="statement", text="6 posts. 1 hour of filming. All from your phone.", accent="All from your phone."),
        dict(k="final", line="Save this as your weekly checklist.", sub="Follow @official.vantier for more"),
    ],
    caption="""Not sure what to post? Here's a simple weekly content plan for any service business, whether you're a roofer, cleaner, detailer, barber or HVAC company:

MON: Job of the week (before/after + price range)
TUE: Answer the question every customer asks
WED: Meet the crew (15 seconds, one person)
THU: Review spotlight (read a real review on camera)
FRI: Behind the scenes (the part customers never see)
SAT: Open slots next week + booking link

6 posts. About an hour of filming. All from your phone.

Consistency beats perfection on social media. This plan builds trust with locals who will hire you, not just people who double-tap.

Save this as your weekly checklist.""",
    tags=["contentplan", "socialmediamarketing", "instagramtips", "servicebusiness", "contentstrategy"],
    cta="Save",
),
dict(
    id="C06", slug="marketing-myths", title="6 Marketing Myths Costing You Jobs",
    pillar="Marketing Myths", industry="Service businesses", theme="ivory",
    slides=[
        dict(k="cover", kicker="MARKETING MYTHS", title="6 marketing myths costing you jobs", accent="costing you jobs", icon="x"),
        dict(k="myth", n="01", myth="Word of mouth is enough.", truth="It's great, but you can't turn it up when you're slow."),
        dict(k="myth", n="02", myth="Ads don't work in my industry.", truth="Bad ads don't work in any industry."),
        dict(k="myth", n="03", myth="I need a new website first.", truth="A fast page with a big call button beats a pretty site that takes six months."),
        dict(k="myth", n="04", myth="Marketing is a cost.", truth="Marketing you can measure is an investment with a return."),
        dict(k="myth", n="05", myth="We need to be on every platform.", truth="Be great on one or two where your customers actually are."),
        dict(k="myth", n="06", myth="SEO will take care of it.", truth="SEO is a long game. Ads put you in front of buyers this month. Use both."),
        dict(k="final", line="Which one did you believe? Comment the number.", sub="@official.vantier"),
    ],
    caption="""Six marketing myths we hear from service business owners all the time, and what's actually true:

1. "Word of mouth is enough." It's great, but you can't turn it up when you're slow.
2. "Ads don't work in my industry." Bad ads don't work in any industry.
3. "I need a new website first." A fast page with a big call button beats a pretty site that takes six months.
4. "Marketing is a cost." Measurable marketing is an investment with a return.
5. "We need to be on every platform." Be great on one or two where your customers actually are.
6. "SEO will take care of it." SEO is a long game. Ads reach buyers this month. Use both.

Which one did you believe? Comment the number 👇""",
    tags=["marketingmyths", "smallbusinessmarketing", "businessowner", "marketingtips", "localbusiness"],
    cta="Comment",
),
dict(
    id="C07", slug="read-your-ads-dashboard", title="Read Your Ads Dashboard Like an Owner",
    pillar="Paid Advertising", industry="Service businesses", theme="ink",
    slides=[
        dict(k="cover", kicker="META ADS", title="Read your ads dashboard in 60 seconds", accent="60 seconds", icon="dash"),
        dict(k="metric", name="CPM", what="What it costs to show your ad 1,000 times.", signal="High CPM: competitive market, narrow audience, or tired creative."),
        dict(k="metric", name="CTR (link)", what="How many people click.", signal="Low CTR: your hook or first frame isn't stopping the right person."),
        dict(k="metric", name="CPL", what="Cost per lead.", signal="Useful, but never the final word."),
        dict(k="metric", name="Frequency", what="How often the same person sees your ad.", signal="Rising frequency + rising costs = creative fatigue. Refresh."),
        dict(k="metric", name="Cost per booked job", what="Ad spend ÷ booked jobs.", signal="The only number that pays the bills."),
        dict(k="list", title="Read them in this order", items=["Seeing it? (CPM)", "Stopping? (CTR)", "Raising a hand? (CPL)", "Booking? (Cost per job)"]),
        dict(k="final", line="Save this for your next ad review.", sub="Follow @official.vantier for more"),
    ],
    caption="""You don't need to be a media buyer to read your Meta ads dashboard. You need five numbers, in order:

1. CPM: what it costs to show your ad 1,000 times. High CPM can mean a competitive market, a narrow audience or tired creative.
2. CTR (link): how many people click. Low CTR usually means your hook or first frame isn't stopping the right person.
3. CPL: cost per lead. Useful, but never the final word.
4. Frequency: how often the same person sees your ad. Rising frequency plus rising costs means it's time for new creative.
5. Cost per booked job: ad spend ÷ booked jobs. The only number that pays the bills.

Are people seeing it? Stopping? Raising a hand? Booking? Read it in that order.

Save this for your next ad review.""",
    tags=["metaads", "facebookadstips", "admetrics", "digitalmarketing", "smallbusinessowner"],
    cta="Save",
),
dict(
    id="C08", slug="follow-up-texts", title="4 Follow-Up Texts That Turn Leads Into Booked Jobs",
    pillar="Lead Generation", industry="Home services", theme="ivory",
    slides=[
        dict(k="cover", kicker="COPY + PASTE", title="4 follow-up texts that turn leads into booked jobs", accent="booked jobs", icon="sms"),
        dict(k="sms", label="TEXT 1 — INSTANTLY", msgs=[["me", "Hi Sarah, this is Mike with [Company]. Got your request for a quote. Calling you in 2 minutes from this number."]]),
        dict(k="sms", label="TEXT 2 — NO ANSWER, 1 HOUR", msgs=[["me", "Tried you just now! When's a good time today for a 3-minute call? Or text me a photo and I'll ballpark it."]]),
        dict(k="sms", label="TEXT 3 — NEXT MORNING", msgs=[["me", "Morning Sarah! I have Thursday 10am or Friday 2pm open for the estimate. Want one?"]]),
        dict(k="sms", label="TEXT 4 — DAY 4", msgs=[["me", "Should I close out your request, or do you still want help with the [project]? Either is totally fine."]]),
        dict(k="statement", text="Why #4 works: an easy way to say no makes people more likely to reply at all.", accent="reply at all."),
        dict(k="list", title="The rules", items=["Reply in minutes, not hours", "Sound like a human", "Always offer a specific next step"]),
        dict(k="final", line="Save this and set them up as templates today.", sub="@official.vantier"),
    ],
    caption="""Most leads don't book because nobody followed up. Here are four texts you can copy, paste and set up as templates today:

1️⃣ Instantly: "Hi Sarah, this is Mike with [Company]. Got your request for a quote. Calling you in 2 minutes from this number."

2️⃣ No answer, 1 hour later: "Tried you just now! When's a good time today for a 3-minute call? Or text me a photo and I'll ballpark it."

3️⃣ Next morning: "Morning Sarah! I have Thursday 10am or Friday 2pm open for the estimate. Want one?"

4️⃣ Day 4: "Should I close out your request, or do you still want help with the [project]? Either is totally fine."

Why #4 works: giving people an easy way to say no makes them far more likely to reply at all.

Save this and set them up today.""",
    tags=["followup", "leadconversion", "smsmarketing", "homeservices", "salestips"],
    cta="Save",
),
dict(
    id="C09", slug="real-estate-win-listings", title="Agents: Your Listing Ads Should Win Listings",
    pillar="Customer Acquisition", industry="Real estate", theme="ink",
    slides=[
        dict(k="cover", kicker="REAL ESTATE", title="Agents: use every listing to win the next one", accent="win the next one", icon="key_house"),
        dict(k="statement", text="Every listing ad is seen by neighbors. Neighbors are future sellers.", accent="future sellers."),
        dict(k="point", n="01", head="Target the surrounding zip codes", body="Run your “Just Listed” and “Just Sold” content to the neighborhood, not just to buyers."),
        dict(k="point", n="02", head="Use the hook sellers care about", body="“Homes on your street are going under contract fast. Curious what yours is worth?”"),
        dict(k="point", n="03", head="Offer a no-pressure next step", body="A free home value report beats “call me” for someone who isn't ready to talk yet."),
        dict(k="point", n="04", head="Follow up with the street, not a newsletter", body="Hyper-local market updates (“3 homes sold on Maple this month”) keep you top of mind."),
        dict(k="statement", text="One listing, marketed right, can become your next three.", accent="your next three."),
        dict(k="final", line="Share this with an agent who wants more listings.", sub="@official.vantier"),
    ],
    caption="""Real estate agents: most listing ads are only aimed at buyers. That leaves the most valuable audience on the table: the neighbors.

Everyone who lives near your listing is a future seller. Use every listing to win the next one:

1. Run "Just Listed" and "Just Sold" content to the surrounding zip codes
2. Use the hook sellers care about: "Homes on your street are going under contract fast. Curious what yours is worth?"
3. Offer a free home value report instead of "call me"
4. Follow up with hyper-local updates for that street, not a generic newsletter

One listing, marketed right, can become your next three.

Share this with an agent who wants more listings.""",
    tags=["realestatemarketing", "realtor", "listingagent", "realestateagent", "facebookadsforrealestate"],
    cta="Share",
),
dict(
    id="C10", slug="big-ticket-runway", title="Why Your Remodeling Ads Get Clicks but Not Contracts",
    pillar="Customer Acquisition", industry="Remodeling / Construction", theme="ivory",
    slides=[
        dict(k="cover", kicker="REMODELING & CONSTRUCTION", title="Why your remodeling ads get clicks but not contracts", accent="not contracts", icon="kitchen"),
        dict(k="statement", text="A $60K renovation isn't an impulse buy. People take weeks or months to decide.", accent="weeks or months"),
        dict(k="statement", text="If your marketing stops at the first ad, you disappear during the decision.", accent="you disappear"),
        dict(k="day", day="WK 1", head="Show the dream", body="Finished projects, reveals, the “after.” Make them want it."),
        dict(k="day", day="WK 2–4", head="Show the process", body="Timelines, permits, how you protect their home. Make them trust it."),
        dict(k="day", day="WK 4–8", head="Show the numbers", body="Real budgets, financing, what it actually costs. Make the decision easy."),
        dict(k="point", n="+", head="Retarget everyone who engaged", body="So you're there when they're finally ready, not your competitor."),
        dict(k="final", line="Follow for more on marketing high-ticket services.", sub="@official.vantier"),
    ],
    caption="""If your remodeling or construction ads get clicks but not contracts, the problem might be the runway, not the ads.

A $60K renovation isn't an impulse buy. Most homeowners take weeks or months to decide. If your marketing stops at the first ad, you disappear right when they're deciding.

Build a runway:
Week 1 → Show the dream: finished projects and reveals
Weeks 2–4 → Show the process: timelines, permits, how you protect their home
Weeks 4–8 → Show the numbers: real budgets, financing, what it actually costs
Always → Retarget everyone who engaged

Be there when they're ready, not just when they first click.

Follow @official.vantier for more on marketing high-ticket services.""",
    tags=["remodelingcontractor", "constructionmarketing", "homeremodeling", "contractormarketing", "highticketsales"],
    cta="Follow",
),
dict(
    id="C11", slug="google-vs-meta-ads", title="Google Ads or Meta Ads: Which First?",
    pillar="Paid Advertising", industry="Service businesses", theme="ink",
    slides=[
        dict(k="cover", kicker="PAID ADVERTISING", title="Google Ads or Meta Ads: which one should you start with?", accent="which one", icon="split"),
        dict(k="compare", left=dict(h="Google", l=["Captures demand", "People already searching", "“emergency plumber near me”"]), right=dict(h="Meta", l=["Creates demand", "People who need you but aren't searching", "the dated kitchen, the overdue tune-up"])),
        dict(k="point", n="G", head="Start with Google if…", body="Urgent, search-driven jobs drive your business: plumbing emergencies, HVAC repair, electrical problems."),
        dict(k="point", n="M", head="Start with Meta if…", body="You sell planned or visual services: remodeling, landscaping, detailing, gyms, salons, cleaning."),
        dict(k="statement", text="Long term? Both. Meta builds the want. Google catches the search.", accent="Both."),
        dict(k="statement", text="Ask: do customers search for me in a panic, or decide over time?", accent="panic, or decide over time?"),
        dict(k="final", line="Comment your industry. We'll tell you where we'd start.", sub="@official.vantier"),
    ],
    caption="""Google Ads or Meta Ads (Facebook + Instagram): which should a service business start with?

Google captures demand. People are already searching: "emergency plumber near me."
Meta creates demand. It reaches people who need you but aren't searching yet: the homeowner with a dated kitchen, the overdue AC tune-up.

Start with Google if urgent, search-driven jobs drive your business (plumbing emergencies, HVAC repair, electrical problems).
Start with Meta if you sell planned or visual services (remodeling, landscaping, detailing, gyms, salons, cleaning).

Long term, the answer is both. Meta builds the want. Google catches the search.

Comment your industry and we'll tell you where we'd start 👇""",
    tags=["googleads", "metaads", "paidadvertising", "localbusinessmarketing", "advertisingstrategy"],
    cta="Comment",
),
dict(
    id="C12", slug="hooks-that-stop-the-scroll", title="10 Hooks That Stop the Scroll",
    pillar="Marketing Psychology", industry="Multiple trades", theme="ivory",
    slides=[
        dict(k="cover", kicker="HOOK SWIPE FILE", title="10 hooks that stop the scroll (for service businesses)", accent="stop the scroll", icon="hook"),
        dict(k="list", title="Hooks 1–2", items=["“If your AC is older than 10 years, watch this before summer.”", "“3 signs your roof won't make it through another winter.”"], mode="quote"),
        dict(k="list", title="Hooks 3–4", start=3, items=["“We get asked this every week: how much does a bathroom remodel really cost?”", "“Don't hire a mover until you ask these 3 questions.”"], mode="quote"),
        dict(k="list", title="Hooks 5–6", start=5, items=["“Here's what we found inside this ‘clean’ car.”", "“POV: you finally fixed the thing you've ignored for two years.”"], mode="quote"),
        dict(k="list", title="Hooks 7–8", start=7, items=["“The cheapest quote cost this homeowner $4,000.”", "“Your electrical panel might be the oldest thing in your house.”"], mode="quote"),
        dict(k="list", title="Hooks 9–10", start=9, items=["“What skipping gutter cleaning actually costs you.”", "“If you've been putting off the gym since January, this is for you.”"], mode="quote"),
        dict(k="statement", text="Why they work: each one names a specific person, problem, or curiosity gap.", accent="specific"),
        dict(k="final", line="Save this and film one tomorrow.", sub="Follow @official.vantier for more"),
    ],
    caption="""The first line of your video decides whether anyone hears the rest. Here are 10 hooks for service business ads and content:

1. "If your AC is older than 10 years, watch this before summer."
2. "3 signs your roof won't make it through another winter."
3. "We get asked this every week: how much does a bathroom remodel really cost?"
4. "Don't hire a mover until you ask these 3 questions."
5. "Here's what we found inside this 'clean' car."
6. "POV: you finally fixed the thing you've ignored for two years."
7. "The cheapest quote cost this homeowner $4,000."
8. "Your electrical panel might be the oldest thing in your house."
9. "What skipping gutter cleaning actually costs you."
10. "If you've been putting off the gym since January, this is for you."

Each one names a specific person, problem or curiosity gap. Save this and film one tomorrow.""",
    tags=["hooks", "videomarketing", "adcreative", "contentcreation", "servicebusiness"],
    cta="Save",
),
dict(
    id="C13", slug="ad-formats-that-work", title="6 Ad Formats That Work for Local Service Businesses",
    pillar="Paid Advertising", industry="Service businesses", theme="ink",
    slides=[
        dict(k="cover", kicker="AD CREATIVE", title="6 ad formats that work for local service businesses", accent="that work", icon="camera_phone"),
        dict(k="point", n="01", head="Owner to camera", body="30 seconds, you on camera, talking to one customer. Trust builds faster with a face."),
        dict(k="point", n="02", head="Before & after", body="Problem first, transformation second, proof last. Under 15 seconds."),
        dict(k="point", n="03", head="Review read", body="A real review on screen, over footage of that exact job."),
        dict(k="point", n="04", head="POV job footage", body="First-person clips of the work. Raw beats polished here."),
        dict(k="point", n="05", head="Myth-buster", body="“You don't need a whole new roof.” Teach something, earn trust."),
        dict(k="point", n="06", head="Day in the life", body="Crew, trucks, coffee, jobs. Shows you're real and established."),
        dict(k="statement", text="Test 2–3 formats at once. Let booked jobs, not likes, pick the winner.", accent="booked jobs, not likes"),
        dict(k="final", line="Which format are you trying first? Comment below.", sub="@official.vantier"),
    ],
    caption="""Not every ad format works for local service businesses. These six consistently do:

1. Owner to camera: 30 seconds, you talking to one customer. Trust builds faster with a face.
2. Before & after: problem first, transformation second, proof last.
3. Review read: a real review on screen over footage of that job.
4. POV job footage: first-person clips of the work. Raw beats polished.
5. Myth-buster: teach something useful and earn trust.
6. Day in the life: crew, trucks, jobs. Shows you're real and established.

Test 2–3 formats at once, and let booked jobs (not likes) pick the winner.

Which format are you trying first? Comment below 👇""",
    tags=["adcreative", "videoads", "facebookads", "instagramads", "localbusinessmarketing"],
    cta="Comment",
),
dict(
    id="C14", slug="fill-slow-weekdays", title="Empty Chairs on Tuesday? Try This.",
    pillar="Customer Acquisition", industry="Salons / Barbershops", theme="ivory",
    slides=[
        dict(k="cover", kicker="SALONS & BARBERSHOPS", title="Empty chairs on Tuesday? Try this.", accent="Try this.", icon="scissors"),
        dict(k="point", n="01", head="Rebook before they leave", body="“Same time in 3 weeks?” The easiest booking you'll ever get."),
        dict(k="point", n="02", head="Create a weekday-only service", body="Express cuts, gloss treatments, beard tune-ups. Priced to move, only Tue–Thu."),
        dict(k="point", n="03", head="Start a last-minute list", body="Clients who want early notice. Text it the moment someone cancels."),
        dict(k="point", n="04", head="Run a small slow-day ad", body="Only on your slow days, only to people within a few miles."),
        dict(k="point", n="05", head="Reward weekday regulars", body="Every 5th weekday visit, an add-on on the house."),
        dict(k="statement", text="Busy days take care of themselves. Slow days are where the profit is.", accent="where the profit is."),
        dict(k="final", line="Send this to your favorite barber or stylist.", sub="@official.vantier"),
    ],
    caption="""Saturdays fill themselves. Tuesdays are where salons and barbershops win or lose.

Five ways to fill your chairs on slow weekdays:
1. Rebook before they leave: "Same time in 3 weeks?"
2. Create a weekday-only service: express cuts, gloss treatments, beard tune-ups
3. Start a last-minute list and text it whenever someone cancels
4. Run a small local ad only on slow days, only within a few miles
5. Reward weekday regulars: every 5th weekday visit, an add-on on the house

Your busy days take care of themselves. Your slow days are where the extra profit is.

Send this to your favorite barber or stylist.""",
    tags=["barbershop", "salonowner", "salonmarketing", "barberlife", "smallbusinessideas"],
    cta="Share",
),
dict(
    id="C15", slug="auto-repair-trust", title="Why People Don't Trust Auto Shops (and How to Flip It)",
    pillar="Marketing Psychology", industry="Auto repair", theme="ink",
    slides=[
        dict(k="cover", kicker="AUTO REPAIR", title="Why people don't trust auto shops, and how to flip it", accent="how to flip it", icon="car_wrench"),
        dict(k="statement", text="Most people walk in expecting to be upsold. That fear is your opportunity.", accent="your opportunity."),
        dict(k="point", n="01", head="Show the old part", body="Text customers a photo or short video of what you found. Seeing is believing."),
        dict(k="point", n="02", head="Explain the price before the work", body="Plain English, line by line, before a wrench turns."),
        dict(k="point", n="03", head="Separate “now” from “can wait”", body="Customers remember the shop that didn't push."),
        dict(k="point", n="04", head="Turn it into content", body="A 30-second video of a tech explaining a worn brake pad is a better ad than any discount."),
        dict(k="statement", text="In a low-trust industry, transparency is the marketing.", accent="transparency is the marketing."),
        dict(k="final", line="Follow for more marketing that builds trust.", sub="@official.vantier"),
    ],
    caption="""Most people walk into an auto repair shop expecting to be upsold. That's not a problem. It's an opportunity.

In a low-trust industry, transparency is the marketing:
1. Show the old part. Text customers a photo or short video of what you found.
2. Explain the price before the work, in plain English, line by line.
3. Separate "needs it now" from "can wait." Customers remember who didn't push.
4. Turn it into content. A 30-second video of a tech explaining a worn brake pad is a better ad than any coupon.

Do this consistently and your reviews start saying the one thing every shop wants: "honest."

Follow @official.vantier for more marketing that builds trust.""",
    tags=["autorepair", "autoshop", "mechaniclife", "customertrust", "automotivemarketing"],
    cta="Follow",
),
dict(
    id="C16", slug="shoot-ads-on-your-phone", title="Your Phone Is All You Need to Make Great Ads",
    pillar="Social Media Marketing", industry="Service businesses", theme="ivory",
    slides=[
        dict(k="cover", kicker="CONTENT CREATION", title="Your phone is all you need to make great ads", accent="all you need", icon="camera_phone"),
        dict(k="point", n="01", head="Shoot vertical. Always.", body="9:16 fills the whole screen on Reels and Stories."),
        dict(k="point", n="02", head="Face the light", body="Window or sun in front of you, never behind you."),
        dict(k="point", n="03", head="Open on action, not a greeting", body="Skip “Hey guys, it's Mike from…” Start with the problem."),
        dict(k="point", n="04", head="Get close to the mic", body="Bad audio kills more ads than bad video. Stand near the phone or use a $20 clip-on mic."),
        dict(k="point", n="05", head="Film 10 clips per job", body="Before, during, after, the crew, the customer's reaction."),
        dict(k="point", n="06", head="Keep it real", body="Polished commercials get scrolled. Real job sites get watched."),
        dict(k="final", line="Save this for your next job.", sub="Follow @official.vantier for more"),
    ],
    caption="""You don't need a film crew to make ads that work. For most service businesses, real job site footage beats polished commercials. Your phone is enough:

1. Shoot vertical (9:16). Always.
2. Face the light. Window or sun in front of you, never behind.
3. Open on action, not a greeting. Skip "Hey guys, it's Mike from…"
4. Get close to the mic. Bad audio kills more ads than bad video.
5. Film 10 short clips per job: before, during, after, the crew, the reaction.
6. Keep it real. Real job sites get watched.

Save this for your next job.""",
    tags=["contentcreation", "videomarketing", "smartphonevideo", "socialmediatips", "smallbusiness"],
    cta="Save",
),
dict(
    id="C17", slug="see-competitors-ads", title="How to See Every Ad Your Competitors Are Running",
    pillar="Competitor / Market Analysis", industry="Service businesses", theme="ink",
    slides=[
        dict(k="cover", kicker="COMPETITOR RESEARCH", title="How to see every ad your competitors are running (free)", accent="(free)", icon="search"),
        dict(k="search", step="01", head="Open the Meta Ad Library", body="Search “Meta Ad Library” or go to facebook.com/ads/library. No login needed to browse."),
        dict(k="search", step="02", head="Search a competitor's name", body="Set the category to “All ads” and your country, then type the business name."),
        dict(k="search", step="03", head="Look for long-running ads", body="Ads that have been running for months are usually the ones making money."),
        dict(k="search", step="04", head="Note the offer, hook, and format", body="Not to copy. To find the gap."),
        dict(k="statement", text="If everyone says “free estimate,” you say something specific. That's the gap.", accent="That's the gap."),
        dict(k="statement", text="It takes 10 minutes. Most of your competitors have never done it.", accent="never done it."),
        dict(k="final", line="Share this with a business partner.", sub="@official.vantier"),
    ],
    caption="""You can see every Facebook and Instagram ad your competitors are running right now, for free.

1. Open the Meta Ad Library (facebook.com/ads/library)
2. Set the category to "All ads," choose your country and search a competitor's business name
3. Look for ads that have been running for months. Long-running ads are usually the profitable ones.
4. Note their offer, hook and format. Not to copy them, but to find the gap.

If every competitor says "free estimate," you say something specific. That's how you stand out in a crowded local market.

It takes 10 minutes, and most of your competitors have never done it.

Share this with a business partner.""",
    tags=["competitoranalysis", "metaadlibrary", "facebookads", "marketresearch", "smallbusinesstips"],
    cta="Share",
),
dict(
    id="C18", slug="how-vantier-works", title="What Happens When You Work With Vantier",
    pillar="Vantier Authority", industry="Service businesses", theme="ivory",
    slides=[
        dict(k="cover", kicker="VANTIER", title="What happens when you work with Vantier", accent="Vantier", icon="mark"),
        dict(k="point", n="01", head="Audit", body="We call your business like a customer, review your offer, and map what happens after a lead comes in."),
        dict(k="point", n="02", head="Offer", body="We build an offer your market actually wants. Specific, low-risk, easy to say yes to."),
        dict(k="point", n="03", head="Creative", body="Hooks and videos built around your customers' problems, not your logo."),
        dict(k="point", n="04", head="Launch", body="Meta campaigns aimed at your service area, tracked to booked jobs."),
        dict(k="point", n="05", head="Follow-up", body="Systems that make sure every lead gets a fast, human response."),
        dict(k="point", n="06", head="Report", body="A plain-English report every Friday: what we spent, what it booked, what's next."),
        dict(k="statement", text="Built for service businesses only. Nationwide.", accent="Nationwide."),
        dict(k="final", line="Want to see this for your business? DM us “VANTIER”.", sub="Or tap the link in our bio"),
    ],
    caption="""Here's exactly what happens when a service business works with Vantier:

01 Audit: we call your business like a customer, review your offer and map what happens after a lead comes in
02 Offer: we build an offer your market actually wants
03 Creative: hooks and videos built around your customers' problems, not your logo
04 Launch: Meta campaigns aimed at your service area, tracked to booked jobs
05 Follow-up: systems so every lead gets a fast, human response
06 Report: a plain-English report every Friday covering what we spent, what it booked and what's next

We only work with service businesses: roofers, HVAC, plumbers, electricians, cleaners, detailers, landscapers, gyms, salons and more, nationwide.

Want to see what this looks like for your business? DM us "VANTIER" or tap the link in our bio.""",
    tags=["vantier", "marketingagency", "servicebusinessmarketing", "metaadsagency", "leadgeneration"],
    cta="DM",
),
]
