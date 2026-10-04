"""Photoreal image bank for the Vantier content library.

Generated with ElevenLabs (Recraft V4.1 Flash, 9:16, 768x1344) as stand-ins for
licensed stock photography/footage. Each key is referenced by reel beats and
carousel slides. `stock_swap` is the search phrase an editor should use to
replace the still with licensed stock video when available.
"""

STYLE = (
    "Candid documentary photograph, shot on 35mm film, natural light, shallow depth of field, "
    "muted natural color grade, realistic skin texture, authentic American setting, "
    "no text, no logos, no signage, no watermark."
)

IMAGES = {
    "missed_call_jobsite": ("A smartphone lying face-up on a dusty red toolbox at a residential job site, screen glowing with an incoming call, a plumber blurred in the background working under a kitchen sink.", "phone ringing on toolbox while worker is busy, shallow depth of field"),
    "homeowner_door_greeting": ("A homeowner in her 40s opens her front door and greets a smiling service technician holding a tool bag on a suburban porch, morning light.", "homeowner greeting technician at front door"),
    "homeowner_couch_phone": ("A man in his 30s relaxing on a couch in a cozy living room at dusk, scrolling on his phone, warm lamp light, face lit by the screen.", "man scrolling phone on couch at night"),
    "plumber_water_heater": ("A plumber installing a new tank water heater in a clean residential garage, copper fittings, work light, focused expression.", "plumber installing water heater"),
    "plumber_sink": ("A plumber lying under a kitchen sink with a flashlight and wrench, legs out on the floor of a modern kitchen.", "plumber working under kitchen sink"),
    "roofer_shingles": ("A roofer kneeling on a residential roof nailing asphalt shingles at golden hour, harness on, suburban rooftops behind him.", "roofer installing shingles golden hour drone"),
    "storm_roof_damage": ("Close view of a residential roof with several missing and lifted asphalt shingles after a storm, overcast sky, wet surface.", "storm damaged roof shingles close up"),
    "suburb_aerial": ("Aerial drone photograph of an American suburban neighborhood, rows of rooftops and green trees, curving streets, late afternoon sun.", "aerial drone suburban neighborhood rooftops"),
    "hvac_condenser": ("An HVAC technician in a navy work shirt kneels beside an outdoor AC condenser unit behind a suburban American home, gauges connected, late afternoon sun.", "HVAC technician servicing outdoor AC unit"),
    "electrician_panel": ("An electrician wearing a headlamp works inside an open residential breaker panel in a basement, wires and tester in hand, concentrated.", "electrician working on breaker panel"),
    "landscaper_mowing": ("A landscaper on a commercial zero-turn mower cutting perfect stripes into a front lawn of a two-story home, early morning light.", "landscaper mowing lawn stripes"),
    "landscaper_crew": ("A landscaping crew planting shrubs and edging a flower bed in front of a home, truck and trailer parked at the curb, bright day.", "landscaping crew planting and edging"),
    "landscape_winter": ("A quiet snow-covered suburban front yard at blue-hour dusk, a pickup truck with a snow plow parked in the driveway, warm windows.", "snowy suburban street winter dusk"),
    "cleaner_home": ("A professional house cleaner in a simple uniform wiping down a white quartz kitchen island in a bright modern home, soft window light.", "house cleaner wiping kitchen counter"),
    "cleaning_team": ("A team of three professional cleaners in matching uniforms arriving at a front door carrying supply caddies and a vacuum, friendly and organized.", "cleaning team arriving at home"),
    "detailer_car": ("An auto detailer polishing the hood of a black SUV with a rotary polisher in a dark studio garage lit by long LED light panels, reflections on paint.", "car detailing polishing black car studio lights"),
    "pressure_washing": ("A worker pressure washing a dirty concrete driveway, a sharp clean stripe cutting through the dark grime, spray mist catching sunlight.", "pressure washing driveway before and after"),
    "mechanic_shop": ("An auto mechanic leaning under the open hood of a sedan in a clean, well-lit auto repair shop, talking with the customer standing beside him.", "mechanic talking to customer under car hood"),
    "mechanic_part": ("A mechanic at a shop counter showing a customer a worn brake rotor next to a new one, explaining with his hands, honest and calm.", "mechanic showing customer worn brake part"),
    "movers_truck": ("Two movers carrying a blanket-wrapped dresser up the ramp of a moving truck in front of a house, stacked boxes visible inside.", "movers loading furniture into moving truck"),
    "remodel_kitchen_dated": ("A dated 1990s kitchen with orange oak cabinets, cracked beige tile countertops and a fluorescent light, slightly dim, lived-in.", "old dated kitchen before remodel"),
    "remodel_kitchen_new": ("A newly remodeled kitchen with white oak cabinets, a large stone island, brass fixtures and warm pendant lights, afternoon sun.", "modern remodeled kitchen reveal"),
    "bathroom_remodel": ("A tile installer setting large-format tile in a bathroom remodel in progress, trowel and spacers, gutted walls, work light.", "bathroom remodel tile installation"),
    "contractor_couple_plans": ("A contractor reviewing printed renovation plans with a couple at their kitchen table, pointing at the drawing, coffee mugs, natural light.", "contractor reviewing plans with homeowners"),
    "construction_framing": ("A residential construction site with a framing crew raising a wall on a new house, lumber stacks, blue sky, wide shot.", "residential construction framing crew"),
    "pest_control": ("A pest control technician in a uniform spraying the exterior perimeter foundation of a suburban home with a backpack sprayer, sunny afternoon.", "pest control technician spraying house perimeter"),
    "gym_interior": ("A modern strength-training gym interior with racks and plates, morning light through tall windows, a few members training.", "modern gym interior morning"),
    "gym_coach": ("A personal coach guiding a middle-aged client through a kettlebell deadlift in a gym, encouraging, focused on form.", "personal trainer coaching client kettlebell"),
    "barber_chair": ("A barber giving a client a skin fade with clippers in a moody barbershop, warm tungsten light, leather chair, mirror reflections.", "barber skin fade close up barbershop"),
    "salon_stylist": ("A hair stylist blow-drying a smiling client's hair in a bright, airy salon with plants and large mirrors.", "hair stylist blow drying client salon"),
    "empty_barber_chair": ("An empty vintage barber chair in a quiet barbershop on a weekday afternoon, sunlight through the front window, clippers on the counter.", "empty barber chair quiet shop"),
    "realtor_home": ("A real estate agent welcoming a young couple at the front door of a craftsman home for a showing, bright day, friendly handshake.", "real estate agent showing home to couple"),
    "home_twilight": ("A beautiful modern farmhouse exterior at twilight with warm interior lights glowing, manicured lawn, deep blue sky.", "house exterior twilight listing photo"),
    "owner_phone_truck": ("A tired service business owner sitting in the cab of his work truck looking down at his phone, dashboard clutter, late afternoon light through the windshield.", "contractor in truck looking at phone"),
    "owner_desk_night": ("A small business owner sitting at a kitchen table late at night with a laptop, stacks of invoices and a coffee mug, lit by the screen and one lamp.", "business owner working late at night laptop invoices"),
    "owner_portrait_vans": ("A confident service business owner in a company polo standing with arms crossed in front of three white service vans in a parking lot, morning light.", "business owner in front of service van fleet"),
    "technician_tablet": ("A service technician showing a homeowner an estimate on a tablet in a bright living room, both looking at the screen, relaxed.", "technician showing homeowner tablet estimate"),
    "handshake_doorstep": ("A homeowner and a contractor shaking hands on the front steps of a house after a finished job, genuine smiles, golden hour.", "contractor handshake with homeowner"),
    "filming_phone_jobsite": ("A tradesman holding a smartphone vertically to film his coworker working at a residential job site, natural light, behind-the-scenes feel.", "worker filming vertical video on phone at job site"),
    "team_huddle": ("A small trades crew in work shirts having a morning huddle around a tailgate with coffee before starting the day, sunrise light.", "crew morning meeting by truck"),
    "laptop_dashboard": ("A laptop on a wooden desk showing out-of-focus colorful charts, a notebook and a coffee mug beside it, soft morning light, screen detail blurred.", "laptop analytics dashboard on desk"),
    "phone_scroll_closeup": ("Close-up of a hand holding a smartphone and scrolling a social media feed, the screen softly blurred, evening living room bokeh.", "hand scrolling social media on phone close up"),
}
