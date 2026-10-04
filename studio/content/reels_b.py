from dsl import *

REELS_B = [
dict(
    id="R18", slug="call-us-today-weak-cta", title="'Call Us Today' Is the Weakest Line in Your Ad",
    pillar="Conversion", industry="Cleaning", music="drive",
    beats=[
        ("Call us today might be the weakest line in your ad.", T("“Call us today” is a weak ask.", accent="weak ask.", kicker="CONVERSION")),
        ("Calling feels like work, especially for someone booking a cleaning on their lunch break.", IL("spray", label="BOOKING ON A LUNCH BREAK", stock="Busy professional on a lunch break looking at her phone")),
        ("They don't know what to say, what it costs, or how long it'll take.", QUOTE(["What do I even say?", "What will it cost?", "How long is this call?"], kind="thought")),
        ("So make the first step smaller.", T("Make the first step smaller.", accent="smaller.", bg="ivory")),
        ("Text a photo of your space, get a price in ten minutes.", PHONE("sms", msgs=[["them", "[photo] Kitchen + 2 baths, how much?"], ["me", "Thanks! That's $185 for a deep clean. Thursday at 10 work?"]], header="Text-a-photo quote")),
        ("Pick a time online in thirty seconds.", PHONE("booking")),
        ("Answer three quick questions, get an instant quote.", PHONE("form", fields=["Home size", "How often?", "Zip code"], cut=0)),
        ("The easier the first step, the more people take it.", T("Easier first step. More bookings.", accent="More bookings.", bg="gold")),
        ("Comment your current call to action, and we'll make it stronger.", CTA("Comment your CTA. We'll sharpen it.")),
    ],
    caption=""""Call us today!" asks a stranger to do the hardest thing first: pick up the phone, explain what they need and ask about price, all before they trust you.

Make the first step smaller:
→ "Text a photo of your space, get a price in 10 minutes."
→ "Pick a time online in 30 seconds."
→ "Answer 3 quick questions for an instant quote."

Each of these lowers the effort it takes to raise a hand. And once someone has started, they're much more likely to finish.

This works for cleaning companies, detailers, landscapers, movers, almost any service business.

Comment your current call to action and we'll make it stronger.""",
    tags=["cleaningbusiness", "calltoaction", "conversionoptimization", "marketingtips", "servicebusiness"],
    cta="Comment",
),
dict(
    id="R19", slug="slow-season-head-start", title="Your Slow Season Is a Head Start",
    pillar="Business Growth", industry="Landscaping / HVAC", music="glass",
    beats=[
        ("Your slow season isn't a break. It's a head start.", T("Slow season is a head start.", accent="head start.", kicker="BUSINESS GROWTH")),
        ("Landscapers in winter. HVAC in the mild months.", IL("snow", label="THE QUIET MONTHS", stock="Snow-covered suburban yard at dusk with a plow truck in the driveway")),
        ("Most owners go quiet and wait. That's the mistake.", T("Most owners go quiet.", accent="quiet.", bg="ivory")),
        ("Use the slow months to fill next season before it starts.", CAL(0.5, "Next season, pre-booked")),
        ("Sell maintenance plans to everyone you served this year.", LIST(["Maintenance plans for past customers", "Early-booking slots at this year's price", "Ads to last season's almost-customers"], hl=0)),
        ("Offer early-booking slots at this year's price.", LIST(["Maintenance plans for past customers", "Early-booking slots at this year's price", "Ads to last season's almost-customers"], hl=1)),
        ("Run ads to people who almost booked last season.", LIST(["Maintenance plans for past customers", "Early-booking slots at this year's price", "Ads to last season's almost-customers"], hl=2)),
        ("When the rush hits, competitors start from zero. You start half booked.", SPLIT("Them", ["0% booked"], "You", ["50% booked"])),
        ("Save this for your slow season.", CTA("Save this for your slow season.")),
    ],
    caption="""Every seasonal business has a slow stretch. Landscapers in winter. HVAC in the mild months between heating and cooling.

Most owners go quiet and wait for the phone to ring again. That's the mistake.

Use the slow months to fill next season before it starts:
1. Sell maintenance plans to every customer you served this year
2. Offer early-booking slots at this year's price
3. Run retargeting ads to people who almost booked last season

When the rush hits, your competitors start from zero. You start half booked, with cash flow already locked in.

Save this for your slow season.""",
    tags=["landscapingbusiness", "hvacbusiness", "seasonalbusiness", "businessgrowth", "maintenanceplans"],
    cta="Save",
),
dict(
    id="R20", slug="past-customers-cheapest-ads", title="Your Cheapest New Job Is in Your Phone",
    pillar="Customer Acquisition", industry="HVAC", music="glass",
    beats=[
        ("Your cheapest new job is sitting in your phone right now.", T("Your cheapest job is in your phone.", accent="in your phone.", kicker="CUSTOMER ACQUISITION")),
        ("Every past customer already trusts you, but most businesses never contact them again.", PH("hvac_condenser", move="in", stock="HVAC technician servicing a past customer's outdoor AC unit")),
        ("Pull your list from the last two years.", PHONE("contacts", names=["Mark D. — tune-up, May", "Lisa R. — new unit, Aug", "Tom W. — repair, Jan", "Ana P. — tune-up, Mar", "Chris B. — repair, Jul"])),
        ("Send a short, personal text.", PHONE("sms", msgs=[["me", "Hey Mark, it's Danny from the AC company. We're opening a few tune-up spots next week for past customers. Want one?"]], header="Mark D.")),
        ("No graphics, no ad spend. Just a real message from a real person.", T("No ad spend. Just a real message.", accent="real message.", bg="ivory")),
        ("Some will book. Some will refer a friend. Some will leave the review you forgot to ask for.", LIST(["Some will book", "Some will refer a friend", "Some will leave a review"], mode="check")),
        ("Do this before you spend a dollar on new customers.", T("Do this before you buy ads.", accent="before", bg="gold")),
        ("Share this with an owner who's sitting on a list.", CTA("Share with an owner sitting on a list.")),
    ],
    caption="""Before you spend another dollar on ads, text the people who already paid you.

Every past customer already knows your work and trusts you. Most businesses never contact them again.

Try this:
1. Pull your customer list from the last two years
2. Send a short, personal text (not a blast with a graphic):
"Hey Mark, it's Danny from the AC company. We're opening a few tune-up spots next week for past customers. Want one?"
3. Reply to every response personally

Some will book. Some will refer a friend. Some will leave the review you forgot to ask for. It costs nothing but an hour.

Share this with an owner who's sitting on a list.""",
    tags=["customerretention", "hvaccontractor", "smsmarketing", "repeatcustomers", "smallbusinesstips"],
    cta="Share",
),
dict(
    id="R21", slug="reviews-are-your-best-ad", title="Your Best Ad Is Already Written",
    pillar="Marketing Psychology", industry="Moving / Home services", music="glass",
    beats=[
        ("Your best ad isn't something you write. Your customers already wrote it.", T("Your customers already wrote your best ad.", accent="best ad.", kicker="SOCIAL PROOF")),
        ("People don't believe businesses. They believe other customers.", IL("review", label="TRUST TRANSFERS", stock="Contractor and homeowner shaking hands on the front steps after a job")),
        ("So stop writing ads about how great you are.", QUOTE(["We're the best in town!", "Unbeatable service!"], kind="bad", label="NOBODY BELIEVES THIS")),
        ("Take a real five-star review and put it on screen, word for word, over footage of that exact job.", QUOTE(["Showed up on time, wrapped every piece of furniture, and finished an hour early. Already recommended them to my sister."], kind="review", who="Jessica R. · Westside", label="EXAMPLE REVIEW", icon="truck")),
        ("Add their first name and their neighborhood.", QUOTE(["Showed up on time, wrapped every piece of furniture, and finished an hour early."], kind="review", who="Jessica R. · Westside", label="NAME + NEIGHBORHOOD", icon="truck")),
        ("That one ad will outwork any slogan you'll ever pay for.", T("Proof beats slogans.", accent="slogans.", bg="ivory")),
        ("Movers, roofers, barbers. The proof is already in your reviews.", GRID(["Movers", "Roofers", "Barbers", "Cleaners", "HVAC", "Detailers"], label="WORKS FOR EVERY TRADE")),
        ("Follow for ad ideas you can use this week.", CTA("Ad ideas you can use this week.")),
    ],
    caption="""Your best-performing ad might already be sitting in your Google reviews.

People don't believe businesses talking about themselves. They believe other customers. So instead of writing "We're the best in town!", try this:

1. Pick a real five-star review that describes a specific experience
2. Put it on screen word for word
3. Play it over footage of that exact type of job
4. Add the customer's first name and neighborhood (with permission)

That one ad does more than any slogan you'll ever pay for. It works for movers, roofers, barbers, cleaners, anyone with happy customers.

Follow @official.vantier for ad ideas you can use this week.""",
    tags=["socialproof", "customerreviews", "movingcompany", "adcreative", "marketingpsychology"],
    cta="Follow",
),
dict(
    id="R22", slug="instant-form-vs-landing-page", title="Instant Form or Landing Page?",
    pillar="Lead Generation", industry="Local service (any)", music="drive",
    beats=[
        ("Instant form or landing page? Here's the honest answer.", SPLIT("Instant form", ["Inside Instagram"], "Landing page", ["Your website"], win="none", title="LEAD GENERATION")),
        ("Instant forms are fast. People never leave Instagram.", PHONE("instant", step="form")),
        ("That means more leads, and more people who forgot they filled it out.", LIST(["More leads", "Lower cost per lead", "More forgotten submissions"], mode="mixed")),
        ("Landing pages take more effort, so fewer finish. But they're usually more serious.", PHONE("site", state="landing")),
        ("For most local service businesses, start with an instant form. Just build it right.", T("Start with an instant form. Build it right.", accent="Build it right.", bg="ivory")),
        ("Use the higher intent form type, so people review their info before submitting.", PHONE("instant", step="review")),
        ("Add one qualifying question, like timeline or zip code.", PHONE("form", fields=["Name", "Phone", "When do you want this done?"], cut=0)),
        ("Then call while they still remember you.", TIMER(300, "Call within 5 minutes")),
        ("Save this before you build your next campaign.", CTA("Save this before your next campaign.")),
    ],
    caption="""Instant form or landing page for your Facebook and Instagram lead ads? Here's the honest answer for local service businesses.

Instant forms: fast, people never leave the app, more leads at a lower cost. But also more people who barely remember filling them out.

Landing pages: more effort, so fewer people finish. The ones who do are usually more serious.

For most local service businesses, start with an instant form and build it right:
→ Choose the "Higher intent" form type so people review their info before submitting
→ Add one qualifying question (timeline, zip code, project type)
→ Call within five minutes, while they still remember you

Save this before you build your next campaign.""",
    tags=["leadgeneration", "facebookleadads", "instagramads", "leadforms", "servicebusinessmarketing"],
    cta="Save",
),
dict(
    id="R23", slug="before-after-done-right", title="Before and After Videos, Done Right",
    pillar="Paid Advertising", industry="Pressure washing / Detailing", music="drive",
    beats=[
        ("Before and after videos work. Most people just film them backwards.", T("Before & afters, done backwards.", accent="backwards.", kicker="AD CREATIVE")),
        ("They lead with the finished result.", IL("driveway", label="THE AFTER (USUALLY SHOWN FIRST)", stock="Freshly pressure-washed bright concrete driveway")),
        ("But the before is the hook.", T("The before is the hook.", accent="the hook.", bg="ivory")),
        ("Open on the worst of it. The black-streaked driveway. The dog hair in the back seat.", IL("driveway_dirty", label="OPEN ON THE WORST", stock="Close-up of a black-streaked, grimy driveway before washing")),
        ("Hold it just long enough to make people wince.", IL("driveway_dirty", label="HOLD IT", stock="Slow push on the dirtiest section")),
        ("Then the reveal, in one satisfying pass.", IL("driveway_reveal", label="THE REVEAL", stock="Pressure washer cutting one clean stripe through the grime")),
        ("End with the reaction, the price, or how fast you did it.", LIST(["The customer's reaction", "The price", "How fast you did it"], mode="check")),
        ("Problem. Transformation. Proof. Under fifteen seconds.", LIST(["Problem.", "Transformation.", "Proof."], mode="plain")),
        ("Send this to someone who films their own content.", CTA("Send this to someone who films content.")),
    ],
    caption="""Before-and-after videos are some of the best-performing ads for visual services like pressure washing, detailing, cleaning and landscaping. Most people just film them in the wrong order.

They lead with the shiny finished result. But the "after" is the payoff, not the hook.

The structure that works:
1. PROBLEM: Open on the worst of it. The black-streaked driveway. The dog hair in the back seat. Hold it just long enough to make people wince.
2. TRANSFORMATION: The reveal, in one satisfying pass.
3. PROOF: End with the customer's reaction, the price, or how fast you did it.

All in under 15 seconds.

Send this to someone who films their own content.""",
    tags=["pressurewashing", "autodetailing", "beforeandafter", "videomarketing", "adcreative"],
    cta="Share",
),
dict(
    id="R24", slug="three-second-test", title="The Three-Second Test for Your Instagram",
    pillar="Marketing Mistakes", industry="Electrical / Home services", music="pulse",
    beats=[
        ("Try the three-second test on your Instagram.", TIMER(3, "The 3-second test", unit="sec")),
        ("Hand your phone to a stranger. Open your profile. Count to three.", PHONE("profile", name="Your Company", tagline="", bio="Living the dream ✨ Est. 2009")),
        ("Can they tell what you do? Where you do it? And why they should pick you?", LIST(["What you do", "Where you do it", "Why pick you"], mode="check")),
        ("If your bio says, living the dream, established two thousand nine, that's a no.", PHONE("profile", name="Your Company", tagline="", bio="Living the dream ✨ Est. 2009", bad=True)),
        ("Try something like this instead.", PHONE("profile", name="Your Company", tagline="Residential electricians", bio="Serving the whole metro · Same-week panel upgrades · Tap below to book ↓", good=True)),
        ("Your profile isn't a scrapbook. It's a storefront.", T("Not a scrapbook. A storefront.", accent="A storefront.", bg="ivory")),
        ("Do the test, and comment your score out of three.", CTA("Comment your score out of 3.")),
    ],
    caption="""Try the 3-second test on your Instagram profile.

Hand your phone to someone who's never heard of you. Open your profile. Count to three. Can they tell:

1. What you do?
2. Where you do it?
3. Why they should pick you?

❌ "Living the dream ✨ Est. 2009"
✅ "Residential electricians · Serving the whole metro · Same-week panel upgrades · Tap below to book"

People check your Instagram before they call you. Your profile isn't a scrapbook. It's a storefront.

Do the test and comment your score out of 3 👇""",
    tags=["instagramtips", "instagramforbusiness", "electrician", "socialmediatips", "localbusiness"],
    cta="Comment",
),
dict(
    id="R25", slug="what-we-check-first", title="What We Check First When We Audit Your Marketing",
    pillar="Vantier Authority", industry="Service businesses", music="glass",
    beats=[
        ("When we look at a service business's marketing, the ads are not the first thing we check.", T("The ads aren't the first thing we check.", accent="first thing", kicker="HOW WE AUDIT")),
        ("First, we call. Like a customer would.", PH("missed_call_jobsite", move="right", stock="Phone ringing unanswered on a job site")),
        ("Does anyone pick up? Does anyone call back?", PHONE("missed", calls=["Your business · 2:14 PM", "Your business · 2:31 PM"])),
        ("Second, we read the offer. Would we book from it?", QUOTE(["Free estimates.", "Call today!"], kind="ad", label="WOULD YOU BOOK FROM THIS?")),
        ("Third, what happens after a lead comes in? A text? A follow-up? A booking link?", FLOW(["Lead comes in", "Instant text", "Follow-up", "Booking link"])),
        ("Only then do we open the ad account.", PHONE("dash")),
        ("Most of the time, the ads aren't the problem. Everything around them is.", T("The ads aren't the problem.", accent="aren't", bg="ivory")),
        ("Want us to run this check on your business? Send us a DM that says audit.", CTA("DM us “AUDIT”.")),
    ],
    caption="""When a service business asks us to look at their marketing, the ad account isn't where we start.

1. We call the business like a customer would. Does anyone pick up? How long does it ring? Does anyone call back?
2. We read the offer. Would we book from it? Is it specific? Is there a reason to act now?
3. We map what happens after a lead comes in. Is there an instant text? A follow-up sequence? A booking link?
4. Only then do we open the ad account.

Most of the time, the ads aren't the real problem. Everything around them is. Fix that, and the same ad budget books more jobs.

Want us to run this check on your business? DM us "AUDIT".""",
    tags=["marketingagency", "marketingaudit", "servicebusiness", "leadgeneration", "vantier"],
    cta="DM",
),
dict(
    id="R26", slug="creative-is-targeting", title="Your Creative Is Your Targeting",
    pillar="Paid Advertising", industry="Roofing / Gyms", music="drive",
    beats=[
        ("Stop obsessing over interest targeting.", PHONE("targeting")),
        ("The algorithm finds buyers better than any checkbox you'll pick.", T("The algorithm beats your checkboxes.", accent="checkboxes.", kicker="META ADS")),
        ("Your job is to tell it who to look for, and you do that with the ad. Open with a callout.", T("Open with a callout.", accent="callout.", bg="ivory")),
        ("Homeowners with a roof older than fifteen years.", IL("roof", text="“Homeowners with a roof older than 15 years…”", label="CALLOUT", stock="Roofer kneeling on a residential roof at golden hour")),
        ("If you've been meaning to get back in the gym since January.", IL("dumbbell", text="“If you've been meaning to get back in the gym since January…”", label="CALLOUT", stock="Coach guiding a client through a kettlebell deadlift")),
        ("The right people stop. Everyone else scrolls. And the algorithm learns from who stopped.", FLOW(["Callout", "Right people stop", "Algorithm learns", "Better leads"])),
        ("Broad audience, specific creative. That's how targeting works now.", T("Broad audience. Specific creative.", accent="Specific creative.", bg="gold")),
        ("Follow for more Meta ads strategy.", CTA("More Meta ads strategy.")),
    ],
    caption="""On Meta, your creative is your targeting.

Interest targeting matters a lot less than it used to. The algorithm is better at finding buyers than any combination of checkboxes you'll pick. Your job is to tell it who to look for, and you do that with the ad itself.

Open with a callout that makes the right person stop:
→ "Homeowners with a roof older than 15 years…"
→ "If you've been meaning to get back in the gym since January…"
→ "If your AC is over 10 years old, watch this before summer."

The right people stop. Everyone else scrolls. And the algorithm learns from who stopped.

Broad audience. Specific creative. Follow @official.vantier for more Meta ads strategy.""",
    tags=["metaads", "facebookadvertising", "adtargeting", "roofingmarketing", "gymmarketing"],
    cta="Follow",
),
dict(
    id="R27", slug="quote-limbo", title="You Sent the Quote and Never Heard Back",
    pillar="Conversion", industry="Remodeling / Construction", music="glass",
    beats=[
        ("You sent the quote, and never heard back.", PHONE("email", subject="Kitchen remodel — estimate.pdf", status="Sent 9 days ago · No reply")),
        ("Most owners take that as a no. It usually isn't.", T("Silence isn't a no.", accent="isn't a no.", kicker="CONVERSION")),
        ("On a big project like a kitchen remodel, silence means busy, overwhelmed, or comparing.", IL("plans", label="BUSY · OVERWHELMED · COMPARING", stock="Contractor reviewing renovation plans with a couple at their kitchen table")),
        ("The contractor who follows up well usually wins.", T("Follow-up wins jobs.", accent="wins jobs.", bg="ivory")),
        ("Day two, call. Don't email. Any questions on the numbers?", TL([("Day 2", "Call: “Any questions on the numbers?”"), ("Day 5", "Send a photo of a similar job"), ("Day 10", "“Want me to hold a spot?”")], active=0)),
        ("Day five, send a photo of a similar project you just finished.", TL([("Day 2", "Call: “Any questions on the numbers?”"), ("Day 5", "Send a photo of a similar job"), ("Day 10", "“Want me to hold a spot?”")], active=1)),
        ("Day ten. We're planning next month's schedule. Want me to hold a spot?", TL([("Day 2", "Call: “Any questions on the numbers?”"), ("Day 5", "Send a photo of a similar job"), ("Day 10", "“Want me to hold a spot?”")], active=2)),
        ("Some of your best jobs are sitting in quotes you already sent.", T("Your best jobs are in quotes you already sent.", accent="already sent.", bg="gold")),
        ("Save this, and follow up on one quote today.", CTA("Follow up on one quote today.")),
    ],
    caption="""You sent the quote. Then nothing. Most contractors take silence as a "no." It usually isn't.

On a big project like a kitchen remodel, silence usually means busy, overwhelmed or comparing options. The contractor who follows up well often wins, even against a lower price.

A simple follow-up rhythm:
Day 2 → Call (don't email): "Any questions on the numbers?"
Day 5 → Send a photo of a similar project you just finished
Day 10 → "We're planning next month's schedule. Want me to hold a spot for you?"

Polite, persistent, helpful. Never pushy.

Some of your best jobs are sitting in quotes you already sent. Save this and follow up on one today.""",
    tags=["remodelingcontractor", "constructionbusiness", "salesfollowup", "contractortips", "closingdeals"],
    cta="Save",
),
dict(
    id="R28", slug="gyms-sell-the-start", title="Gyms: Stop Selling Memberships in Your Ads",
    pillar="Offer Creation", industry="Gyms / Fitness", music="drive",
    beats=[
        ("Gyms, stop selling memberships in your ads.", T("Gyms: stop selling memberships.", accent="memberships.", kicker="GYMS · OFFER")),
        ("A membership sounds like a commitment, and that's scary for someone who hasn't worked out in a year.", IL("dumbbell", label="COMMITMENT FEELS SCARY", stock="Modern strength gym interior in morning light")),
        ("Sell the first step instead.", T("Sell the first step.", accent="first step.", bg="ivory")),
        ("A fourteen day starter program. Three coached sessions a week. One price, no contract.", QUOTE(["14-day starter program", "3 coached sessions a week", "One price. No contract."], kind="offer", label="THE OFFER")),
        ("Now it's not join a gym. It's try something for two weeks. That's a much easier yes.", SPLIT("Old ask", ["Join a gym"], "New ask", ["Try 2 weeks"])),
        ("And once someone sees results with your coaches, the membership sells itself.", IL("kettlebell", label="RESULTS SELL MEMBERSHIPS", stock="Personal coach guiding a client through a kettlebell deadlift")),
        ("Tag a gym owner who needs to hear this.", CTA("Tag a gym owner.")),
    ],
    caption="""Gym owners: stop selling memberships in your ads.

To someone who hasn't worked out in a year, "membership" sounds like a long commitment to something they're afraid they'll fail at. That's a hard yes.

Sell the first step instead:
"14-day starter program. 3 coached sessions a week. One price, no contract."

Now it's not "join a gym." It's "try something for two weeks." That's an easy yes.

And once someone sees real results with your coaches, the membership conversation takes care of itself.

Sell the start. Keep them with the experience.

Tag a gym owner who needs to hear this.""",
    tags=["gymmarketing", "gymowner", "fitnessbusiness", "offercreation", "personaltrainerbusiness"],
    cta="Tag",
),
dict(
    id="R29", slug="instagram-booking-engine", title="Barbers & Stylists: Turn Instagram Into a Booking Engine",
    pillar="Social Media Marketing", industry="Salons / Barbershops", music="drive",
    beats=[
        ("Barbers and stylists, your Instagram is a portfolio. It should be a booking engine.", T("Portfolio → booking engine.", accent="booking engine.", kicker="SALONS & BARBERSHOPS")),
        ("Your feed is full of great work. But nothing tells people what to do next.", IL("scissors", label="GREAT WORK. NO NEXT STEP.", stock="Barber giving a skin fade in a moody barbershop")),
        ("Put your booking link first in your bio. Not a link page with nine buttons.", PHONE("profile", name="Your Shop", tagline="Barbershop", bio="Fades · Beard work · Walk-ins welcome", book=True)),
        ("End your reels with an open slot. Two chairs open Thursday. Link in bio.", PHONE("story", text="2 chairs open Thursday", sub="Link in bio")),
        ("Post today's openings in your stories every morning.", PHONE("story", text="Today's openings", sub="11:30 · 2:15 · 4:00")),
        ("And answer every how much DM with a price and a link.", PHONE("dm", msgs=[["them", "How much for a fade + beard?"], ["me", "$45! Here's my book link, Thursday's open 👇"]], header="New message")),
        ("Great work gets attention. A clear next step gets bookings.", T("Clear next step. More bookings.", accent="More bookings.", bg="ivory")),
        ("Follow for more ways to fill your chair.", CTA("More ways to fill your chair.")),
    ],
    caption="""Barbers, stylists, salon owners: your Instagram is probably a great portfolio. But a portfolio doesn't book appointments. A booking engine does.

Four changes:
1. Put your booking link first in your bio, not a link page with nine buttons
2. End your reels with an open slot: "2 chairs open Thursday. Link in bio."
3. Post today's openings in your stories every morning
4. Answer every "how much?" DM with a price and your booking link

Great work gets attention. A clear next step gets bookings.

Follow @official.vantier for more ways to fill your chair.""",
    tags=["barbershop", "salonmarketing", "barbermarketing", "instagrammarketing", "hairstylist"],
    cta="Follow",
),
dict(
    id="R30", slug="cheapest-costs-most", title="Being the Cheapest Is Costing You",
    pillar="Marketing Psychology", industry="Cleaning", music="pulse",
    beats=[
        ("Being the cheapest option is costing you more than you think.", T("Being the cheapest is costing you.", accent="costing you.", kicker="PRICING PSYCHOLOGY")),
        ("Low prices attract customers who only care about price.", IL("tag", label="PRICE SHOPPERS", stock="Cleaning team arriving at a front door with supplies")),
        ("They haggle. They cancel. They leave one star over a missed corner.", LIST(["They haggle", "They cancel", "They leave one star"], mode="x")),
        ("And they're gone the second someone's ten dollars cheaper.", STAT("$10", "cheaper elsewhere = gone", tone="red", count=False)),
        ("The customers you actually want are shopping for something else.", T("Your best customers want something else.", accent="something else.", bg="ivory")),
        ("Reliability. Communication. Not having to think about it.", LIST(["Reliability", "Communication", "Not having to think about it"], mode="check")),
        ("Show your process, your guarantee, and your crew. Make the price feel obvious.", IL("team", label="SHOW THE CREW", stock="Uniformed cleaning team walking up to a home together")),
        ("You don't need more cheap customers. You need better ones.", T("Better customers. Not cheaper ones.", accent="Better customers.", bg="gold")),
        ("Comment agree if you've had a price shopper nightmare.", CTA("Comment “AGREE”.")),
    ],
    caption="""Being the cheapest option is one of the most expensive positions in a service business.

Low prices attract customers who only care about price. They haggle, they cancel, they leave a one-star review over a missed corner, and they leave the second someone else is $10 cheaper.

The customers you actually want are shopping for something else:
✔ Reliability
✔ Communication
✔ Not having to think about it

So price for that customer, and market to them. Show your process, your guarantee and your crew. Make your price feel obvious instead of defending it.

You don't need more cheap customers. You need better ones.

Comment "agree" if you've had a price-shopper nightmare.""",
    tags=["cleaningbusiness", "pricingstrategy", "marketingpsychology", "smallbusinessowner", "servicebusiness"],
    cta="Comment",
),
dict(
    id="R31", slug="ask-any-agency-this", title="Before You Hire Any Marketing Agency, Ask This",
    pillar="Vantier Authority", industry="Service businesses", music="glass",
    beats=[
        ("Before you hire any marketing agency, ask them this.", T("Before you hire an agency, ask this.", accent="ask this.", kicker="BEFORE YOU HIRE")),
        ("How will we know if this is working?", QUOTE(["“How will we know if this is working?”"], kind="ad", label="THE QUESTION")),
        ("If the answer is impressions, reach, or engagement, keep walking.", LIST(["Impressions", "Reach", "Engagement"], mode="strike")),
        ("You can't deposit impressions.", T("You can't deposit impressions.", accent="deposit", bg="ivory")),
        ("The right answer is leads, how many you reached, how many booked, and what each booked job cost you.", FLOW(["Leads", "Reached", "Booked", "Cost per booked job"])),
        ("Then ask, who owns the ad account? And can I see the numbers anytime?", LIST(["Who owns the ad account?", "Can I see the numbers anytime?"])),
        ("The answers should be you, and yes.", T("You. And yes.", accent="And yes.", bg="gold")),
        ("That goes for us too. Save this for the next agency that calls.", CTA("Save this for the next agency call.")),
    ],
    caption="""Before you hire any marketing agency (including us), ask one question:

"How will we know if this is working?"

If the answer is impressions, reach or engagement, keep walking. You can't deposit impressions.

The right answer sounds like:
"We'll track your leads, how many you actually reach, how many book, and what each booked job costs you."

Then ask two more:
1. Who owns the ad account? (Answer: you.)
2. Can I see the numbers whenever I want? (Answer: yes.)

That standard goes for us too. Save this for the next time an agency calls you.""",
    tags=["marketingagency", "hiringanagency", "smallbusinessowner", "facebookadsagency", "businesstips"],
    cta="Save",
),
dict(
    id="R32", slug="owner-at-10pm", title="It's 10 PM and You're Supposed to Post on Instagram",
    pillar="Business Owner Pain Points", industry="Roofing / Contractors", music="glass",
    beats=[
        ("It's ten p.m. You just finished invoices, and now you're supposed to post on Instagram.", IL("night_desk", text="10:04 PM", label="OWNER LIFE", stock="Owner at the kitchen table late at night with a laptop and invoices")),
        ("You didn't start a roofing company to become a content creator. So get your nights back.", T("You're not a content creator.", accent="content creator.", bg="ivory")),
        ("One. Film everything on the job for a week. Raw clips. No editing.", IL("camera_phone", label="1 — FILM RAW", stock="Tradesman filming a coworker vertically on a phone at a job site")),
        ("Two. Batch it. One hour on Sunday, a week of posts.", CAL(1.0, "2 — One hour on Sunday", cell="POST", noun="posts")),
        ("Three. Automate the follow-up, so new leads get a text even when you're on a roof.", PHONE("sms", msgs=[["me", "Thanks for reaching out! We're on a job right now. Calling you back within the hour. Want to pick a time instead? [link]"]], header="3 — Auto-reply")),
        ("Or hand it to someone whose full-time job is this. Your time is worth more on the business.", T("Your time is worth more on the business.", accent="on the business.", bg="gold")),
        ("Send this to an owner who's still posting at midnight.", CTA("Send this to an owner posting at midnight.")),
    ],
    caption="""It's 10 p.m. You just finished invoices. And now you're supposed to post on Instagram?

You didn't start a roofing company (or a plumbing, HVAC or cleaning company) to become a content creator. Here's how to get your nights back:

1. Film everything on the job for a week. Raw clips, no editing, no talking required.
2. Batch it. One hour on Sunday turns those clips into a week of posts.
3. Automate the follow-up, so new leads get a text even when you're on a roof.

Or hand it to someone whose full-time job is this. Your time is worth more working on the business than writing captions at midnight.

Send this to an owner who's still posting at midnight.""",
    tags=["smallbusinessowner", "entrepreneurlife", "roofingcompany", "contentmarketing", "contractorlife"],
    cta="Share",
),
dict(
    id="R33", slug="prices-in-ads", title="Should You Put Prices in Your Ads?",
    pillar="Marketing Psychology", industry="Landscaping / Lawn care", music="pulse",
    beats=[
        ("Should you put prices in your ads?", T("Should you show prices in your ads?", accent="prices", kicker="PRICING")),
        ("Most owners say no. They're scared of scaring people off.", IL("mower", label="MOST OWNERS SAY NO", stock="Landscaper on a zero-turn mower cutting stripes into a lawn")),
        ("But that's kind of the point.", T("That's the point.", accent="the point.", bg="ivory")),
        ("A starting-at price filters out people who were never going to pay it.", QUOTE(["Weekly lawn care", "from $45 a visit"], kind="offer", label="FROM-PRICE")),
        ("The ones who still reach out already know your range.", PHONE("dm", msgs=[["them", "Saw the $45/visit. Do you service our street? Half-acre lot."]], header="New message")),
        ("Fewer leads, but better ones. And fewer awkward phone calls.", SPLIT("No price", ["More leads", "More tire-kickers"], "From-price", ["Fewer leads", "Better leads"])),
        ("You don't need a full price list. A from price or a typical range is enough.", LIST(["“From $45”", "“Most projects $8K–$12K”", "No full price list needed"], mode="check")),
        ("Transparency reads as confidence. Confidence reads as quality.", T("Transparency reads as confidence.", accent="confidence.", bg="gold")),
        ("Comment yes or no. Do you show prices?", CTA("Comment YES or NO.")),
    ],
    caption="""Should you put prices in your ads? Most service business owners say no. They're afraid of scaring people off.

But that's kind of the point.

A "starting at" price filters out people who were never going to pay it. The people who still reach out already know your range, so you get fewer leads, but better ones, and far fewer awkward phone calls.

You don't need a full price list:
→ "Weekly lawn care from $45 a visit"
→ "Most bathroom remodels land between $18K and $28K"

Transparency reads as confidence. Confidence reads as quality.

Do you show prices? Comment yes or no 👇""",
    tags=["pricing", "lawncarebusiness", "landscaping", "marketingpsychology", "leadquality"],
    cta="Comment",
),
dict(
    id="R34", slug="lead-gen-system", title="How We'd Build a Lead-Gen System for a Local Service Business",
    pillar="Vantier Authority", industry="Service businesses", music="drive",
    beats=[
        ("Here's how we'd build a lead gen system for a local service business.", T("How we'd build your lead-gen system.", accent="lead-gen system.", kicker="THE SYSTEM")),
        ("It's not one ad. It's six parts working together.", FLOW(["Offer", "Ad", "Form", "Speed", "Follow-up", "Reviews"], active=-1, loop=True)),
        ("One. An offer people actually want.", FLOW(["Offer", "Ad", "Form", "Speed", "Follow-up", "Reviews"], active=0, loop=True)),
        ("Two. Ads that open on the customer's problem.", FLOW(["Offer", "Ad", "Form", "Speed", "Follow-up", "Reviews"], active=1, loop=True)),
        ("Three. A short form with one qualifying question.", FLOW(["Offer", "Ad", "Form", "Speed", "Follow-up", "Reviews"], active=2, loop=True)),
        ("Four. An instant text, then a call inside five minutes.", FLOW(["Offer", "Ad", "Form", "Speed", "Follow-up", "Reviews"], active=3, loop=True)),
        ("Five. Follow-up for anyone who doesn't book right away.", FLOW(["Offer", "Ad", "Form", "Speed", "Follow-up", "Reviews"], active=4, loop=True)),
        ("Six. A review request after every job, which becomes your next ad.", FLOW(["Offer", "Ad", "Form", "Speed", "Follow-up", "Reviews"], active=5, loop=True)),
        ("Most businesses have one or two. It works when all six connect.", FLOW(["Offer", "Ad", "Form", "Speed", "Follow-up", "Reviews"], active=99, loop=True)),
        ("That's what we build at Vantier. DM us system if you want yours mapped out.", CTA("DM us “SYSTEM”.")),
    ],
    caption="""A lead generation system for a local service business isn't one ad. It's six parts working together:

1. An offer people actually want (specific, low-risk, easy to say yes to)
2. Ads that open on the customer's problem, not your logo
3. A short form with one qualifying question
4. An instant text, then a real call within five minutes
5. Follow-up for everyone who doesn't book right away
6. A review request after every job, which becomes your next ad

Most businesses have one or two of these. It starts working when all six connect.

That's what we build at Vantier for service businesses nationwide. DM us "SYSTEM" if you want yours mapped out.""",
    tags=["leadgenerationsystem", "marketingagency", "servicebusinessmarketing", "metaads", "vantier"],
    cta="DM",
),
]
