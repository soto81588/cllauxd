"""Tiny scene DSL used by the content plan.

Every Reel is a list of beats: (spoken line, scene). One beat = one VO sentence
or phrase, and the scene on screen while it is spoken. Scene durations come from
the voice-over timing, so visuals always change with the narration.

`stock` on a scene is the licensed stock clip an editor can drop in to replace
the illustration/mockup (see library/STOCK_SHOTLIST.md).
"""


def T(text, accent=None, kicker=None, bg="ink", sub=None):
    """Kinetic headline. accent = substring rendered in gold italic serif."""
    return dict(t="title", text=text, accent=accent, kicker=kicker, bg=bg, sub=sub)


def IL(icon, text=None, label=None, stock=None, accent=None):
    """Line-art industry illustration drawn on in gold, optional headline."""
    return dict(t="illus", icon=icon, text=text, label=label, stock=stock, accent=accent)


def PH(img, move="in", text=None, label=None, stock=None):
    """Photoreal still with a slow camera move."""
    return dict(t="photo", img=img, move=move, text=text, label=label, stock=stock)


def PHONE(ui, stock=None, **data):
    """Phone mockup. ui in: missed, sms, notif, form, profile, booking, feed,
    dm, story, contacts, site, boost, email, instant."""
    return dict(t="phone", ui=ui, data=data, stock=stock)


def STAT(value, label, sub=None, strike=False, tone="gold", count=True):
    return dict(t="stat", value=value, label=label, sub=sub, strike=strike, tone=tone, count=count)


def LIST(items, title=None, hl=None, mode="num"):
    """mode: num | check | x | doubt | strike. hl = index revealed up to (progressive)."""
    return dict(t="list", items=items, title=title, hl=hl, mode=mode)


def SPLIT(lh, ll, rh, rl, win="right", title=None):
    return dict(t="split", left=dict(h=lh, l=ll), right=dict(h=rh, l=rl), win=win, title=title)


def BARS(title, bars, win=None):
    """bars: list of (label, value, display)."""
    return dict(t="bars", title=title, bars=[dict(l=a, v=b, d=c) for a, b, c in bars], win=win)


def MATH(rows, note=None):
    """rows: list of (a, op_b, result)."""
    return dict(t="math", rows=[dict(a=a, b=b, r=r) for a, b, r in rows], note=note)


def FLOW(nodes, active=None, loop=False, title=None):
    return dict(t="flow", nodes=nodes, active=active, loop=loop, title=title)


def TIMER(to, label, tone="gold", unit="min"):
    """Counts up to `to` (in seconds of the displayed unit scale)."""
    return dict(t="timer", to=to, label=label, tone=tone, unit=unit)


def QUOTE(lines, kind="ad", who=None, label=None, icon=None):
    """kind: ad | bad | offer | review | thought."""
    return dict(t="quote", lines=lines, kind=kind, who=who, label=label, icon=icon)


def LINE(title, points, mark=None, refresh=None, good=False):
    return dict(t="line", title=title, points=points, mark=mark, refresh=refresh, good=good)


def CAL(fill, label, cell=None, noun=None):
    return dict(t="calendar", fill=fill, label=label, cell=cell, noun=noun)


def BUDGET(total, parts, hl=None):
    return dict(t="budget", total=total, parts=[dict(l=a, v=b) for a, b in parts], hl=hl)


def TL(steps, active=None):
    return dict(t="timeline", steps=[dict(d=a, t=b) for a, b in steps], active=active)


def GRID(cards, label=None):
    return dict(t="grid", cards=cards, label=label)


def DOTS(total, hl, label, sub=None):
    return dict(t="dots", total=total, hl=hl, label=label, sub=sub)


def CTA(line, sub="@official.vantier"):
    return dict(t="cta", line=line, sub=sub)
