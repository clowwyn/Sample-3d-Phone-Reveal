# CINEMATOGRAPHY

**Agent:** CINEMATOGRAPHY
**Output:** `cinematography.md`
**Date:** 2026-09-03
**Status:** COMPLETE

---

## PREAMBLE

This document defines the complete visual language for the fictional flagship smartphone reveal. Every technical choice — sensor, lens, light, environment, movement, color temperature, atmosphere — is locked to the same family across all 9 shots. No shot breaks the grammar. No shot invents its own world.

**Reference mood:** Premium, minimal, sophisticated, photorealistic, technically believable. Inspired by the cold beauty of Denis Villeneuve's cinematography (Arrival, Blade Runner 2049), the restrained elegance of Christopher Nolan's product-adjacent work, and the material obsession of high-end watchmaking films. Not warm. Not playful. Not loud.

**Narrative arc the cinematography serves:**

```
DARKNESS → SILHOUETTE → REVEAL → DETAIL (x2) → DISPLAY → FEATURE → MOVEMENT → HERO
MYSTERY  → ANTICIPATION → DISCOVERY → CRAFTSMANSHIP → TECHNOLOGY → BRAND MOMENT
```

---

## 1. CAMERA SYSTEM

### Virtual Camera Specification

| Property | Value | Rationale |
|---|---|---|
| Sensor Size | 53.7 x 40.2mm (VistaVision-equivalent) | Large format for shallow depth of field; commercial-grade look |
| Effective Resolution | 4.5K minimum per axis | Cinematic grain structure, no AI-upscale look |
| Mount Convention | LPL Mount | Cinema-standard; consistent flange focal distance |
| Recording Format | Log gamma (ARRI LOGC4 / REDWideGamutRGB) | Maximum dynamic range retention in generation pipeline |
| Rolling Shutter | Global shutter simulation | No skew on moving elements or spinning phone |

**Why VistaVision-equivalent:** This sensor size gives a 1.25x crop relative to full-frame 35mm, meaning a 50mm lens reads as a 62.5mm-equivalent. This slightly telephoto compression is key to the premium look — it flattens the phone subtly, making it feel like a precision object, not a product on a table. It also allows for meaningful background separation at f/1.4–f/2.8, which is impossible on small-sensor CGI cameras.

### Camera Systems Per Shot Type

All shots use the same camera system. The only variables are movement type, lens, and distance.

```
CAMERA FAMILY = VISTA VISION / LARGE FORMAT CINEMA
NO MIXING of small-sensor looks (no GoPro language, no phone-camera language)
```

---

## 2. LENS KIT

Every focal length is a **prime**. No zooms. Zooms introduce breathing and inconsistency; primes are deliberate.

### Shot-by-Shot Focal Length Assignments

| Shot | Focal Length | Purpose | Character |
|---|---|---|---|
| 01 — DARKNESS | 35mm | Wide establishing; environmental context without distraction | Atmospheric, spatial |
| 02 — SILHOUETTE | 50mm | Natural human-eye compression; phone is the only subject | Neutral, observational |
| 03 — FIRST REVEAL | 24mm | Slightly wide; shows the full form while keeping the phone large in frame | Bold, confident |
| 04 — CAMERA DETAIL | 100mm Macro (1:1) | Extreme close-up of lens array; shows glass and metal precision | Forensic, revelatory |
| 05 — MATERIAL DETAIL | 90mm Macro (2:1) | Texture and surface detail of frame and back glass | Intimate, tactile |
| 06 — FRONT DISPLAY | 50mm | Screen at human-eye perspective; the viewer is looking at it | Direct, immediate |
| 07 — FEATURE | 35mm | Slightly wide to show feature in context of whole phone | Relatable, grounded |
| 08 — HERO MOVEMENT | 24mm | Wide enough to capture rotating motion without distortion | Dynamic, spatial |
| 09 — FINAL HERO | 50mm | Centered, iconic, balanced | Resolved, confident |

### Lens Character

**Selection: Cooke S7/i or equivalent "Modern Spherical Clean" with a subtle organic character**

Rationale: The Cooke S7/i series covers full-frame 46.31mm with a hint of character — a soft, warm falloff at the edges and a gentle approximation of film rendering without the distracting artifacts of vintage glass. It is the standard lens for premium commercial and dramatic work (Apple, BMW, Dyson, Sony). It is not sterile (not Zeiss Otus) and not romantic (not Leica). It is precise with warmth — exactly right for a technology product that is also a crafted object.

**No anamorphic.** Anamorphic introduces barrel distortion and breathing that reads as character on faces but feels wrong on precision objects. Anamorphic is for human-scale drama. This is object photography at its highest level.

**No vintage glass (Helios, Canon FD, etc.).** Vintage glass introduces unwanted color fringing, extreme falloff, and unpredictability. The CGI pipeline demands consistency, and vintage glass is inherently inconsistent across generations.

---

## 3. APERTURE CHOICES PER SHOT TYPE

| Shot | f-Stop | Rationale |
|---|---|---|
| 01 — DARKNESS | f/1.4 (wide open) | Maximally shallow; background dissolves; focus on a single catchlight |
| 02 — SILHOUETTE | f/2.0 | Silhouette requires clean edge; some background separation needed |
| 03 — FIRST REVEAL | f/2.8 | Controlled — show enough of the form while maintaining depth |
| 04 — CAMERA DETAIL | f/4.0 | Macro requires more depth to keep the entire lens array readable |
| 05 — MATERIAL DETAIL | f/5.6 | Texture detail at macro demands depth across the surface plane |
| 06 — FRONT DISPLAY | f/2.8 | Screen readable without losing subject separation from background |
| 07 — FEATURE | f/2.0 | Slightly shallower for the phone to pop against its environment |
| 08 — HERO MOVEMENT | f/2.8 | Needs enough depth to track the rotating phone without focus hunting |
| 09 — FINAL HERO | f/2.0 | Shallow but not extreme; iconic, balanced depth |

**Key principle:** The aperture tightens (deeper) as the shots move into detail work (shots 04, 05), then relaxes for the feature and hero (shots 07, 09). The reveal shots (01–03) use the most extreme shallow depth to build the sense that nothing else exists in the frame.

---

## 4. DEPTH OF FIELD PHILOSOPHY

DOF is not used decoratively. It is used narratively.

**Reveal arc (01–03):** Extreme shallow. The phone is the only thing in focus. Everything else ceases to exist. The viewer is being denied context — they can only look at this one object.

**Detail arc (04–06):** Controlled. Enough depth to read the surface. The viewer is being invited to examine craftsmanship. Not flat (which would feel cheap) but not distracting.

**Technology arc (07–09):** Moderate to shallow. The phone exists in its world. Context returns subtly. The viewer is being reminded that this object is part of a larger story.

**Bokeh character:** Circular, smooth falloff. No soap-bubble bokeh. No cat's eye distortion. Clean, professional out-of-focus highlights (the "Cooke cube" quality — circular but with a hard edge). Achieved through simulated iris shape in CGI render engine.

---

## 5. CAMERA MOVEMENT VOCABULARY

**Rule: Every movement has a reason. No movement is decorative.**

### Movement Assignments Per Shot

| Shot | Movement Type | Speed | Purpose |
|---|---|---|---|
| 01 — DARKNESS | **Locked tripod, micro-drift** | 0 (locked) + subtle 0.02°/sec drift | Absolute stillness creates tension; any movement would break the void |
| 02 — SILHOUETTE | **Slow dolly push** | 0.3 m/sec (1.8 seconds per 0.54m push) | Slow approach builds anticipation without urgency |
| 03 — FIRST REVEAL | **Dolly in, very slow** | 0.15 m/sec (6.7 seconds per 1m dolly) | The slowest move in the sequence; the phone is being "admitted" |
| 04 — CAMERA DETAIL | **Macro slider, lateral** | 0.05 m/sec lateral | Subtle, precise; feels like a photographer adjusting framing |
| 05 — MATERIAL DETAIL | **Macro slider, longitudinal** | 0.04 m/sec toward subject | Feels like a lens focusing; intimate |
| 06 — FRONT DISPLAY | **Locked tripod** | 0 | No movement; direct address; the screen speaks for itself |
| 07 — FEATURE | **Gimbal orbital** | 0.5 m/sec arc | Camera circles the phone on a 1.2m radius; the phone is the center |
| 08 — HERO MOVEMENT | **Dolly + gimbal combo** | 0.4 m/sec dolly, phone rotating at 15°/sec | Dual motion — camera advances, phone turns; the most kinetic shot |
| 09 — FINAL HERO | **Jib/dolly combo** | 0.2 m/sec | Slow, descending arc; the final word is "settled" |

### Movement Speed Language

| Descriptor | Seconds Per Meter | Context |
|---|---|---|
| Locked | N/A | Shot 01, Shot 06 — absolute stillness |
| Micro-drift | N/A (0.02°/sec rotation) | Shot 01 — breathing life into a locked frame |
| Very slow dolly | 6–8 sec/m | Shot 03 — the reveal dolly; deliberate and significant |
| Slow dolly | 3–4 sec/m | Shot 02 — approach without urgency |
| Standard dolly | 2–3 sec/m | Shot 09 — confident, resolved |
| Macro slider | 10–15 sec for full travel | Shots 04, 05 — precise, controlled |
| Gimbal orbital | 8–10 sec per 180° arc | Shot 07 — smooth, centered, respectful of the product |
| Kinetic combo | Variable | Shot 08 — the most complex; camera and subject in controlled motion |

**No whip pans. No handheld shake. No Dutch angles.** This is precision technology. Any of those would feel wrong.

---

## 6. FRAMING GRAMMAR

Every shot's composition serves its narrative position.

| Shot | Framing | Grid | Rationale |
|---|---|---|---|
| 01 — DARKNESS | Edge-weighted | Loose rule of thirds | Catchlight at the edge of darkness; the void fills the rest |
| 02 — SILHOUETTE | Center-low | Center axis | The phone is the sole occupant; symmetry is intentional |
| 03 — FIRST REVEAL | Lower-third | Rule of thirds | Product in lower third; upper two-thirds breathing room creates scale |
| 04 — CAMERA DETAIL | Tight center | Center | Lens array is centered; precision demands symmetry |
| 05 — MATERIAL DETAIL | Offset diagonal | Golden ratio | Diagonal across the frame; leads the eye through the material |
| 06 — FRONT DISPLAY | Center | Strict center | The screen is the subject; no ambiguity |
| 07 — FEATURE | Lower-third | Rule of thirds | Feature highlighted; phone in context of environment |
| 08 — HERO MOVEMENT | Dynamic center | Leading room | Camera leads the phone's direction of movement |
| 09 — FINAL HERO | Center | Strict center | The final statement; no debate, no subtlety — just the product |

**Angle strategy:**
- Shots 01–03: **Eye-level or slightly low angle** — the viewer is discovering the object, not looking down on it
- Shot 04 (macro): **Slight top-down** (5°) — best angle to show the camera module without distortion
- Shot 05 (material): **Slight side angle** (15°) — shows the frame's bevel and surface texture simultaneously
- Shot 06 (display): **Eye-level front** — direct address; you are looking at the screen
- Shots 07–09: **Low to eye-level** — the phone is being presented with authority, not examined from above

---

## 7. TRANSITION GRAMMAR

Transitions are not stylistic flourishes. They are narrative punctuation marks.

| Transition | Between Shots | Justification |
|---|---|---|
| **Hard cut** | 01 → 02 | DARKNESS ends; SILHOUETTE begins. The first cut is the first decision. It must be abrupt. |
| **Match cut (light)** | 02 → 03 | The silhouette backlight matches the reveal key light — one light source, two moments |
| **Light leak** | 03 → 04 | Brief, subtle light bleed — a perceptual "blink" as the viewer shifts from whole-object to detail |
| **Hard cut** | 04 → 05 | Detail to detail — no transition needed; the eye is already in close |
| **Fade to black** | 05 → 06 | The phone turns from back to front. Darkness bridges this physical act. |
| **Hard cut** | 06 → 07 | DISPLAY to FEATURE — a shift in what the viewer is being shown; new subject, new cut |
| **Motion blur / slow fade** | 07 → 08 | MOVEMENT shot bleeds out of the feature — one continuous moment |
| **Hard cut** | 08 → 09 | The movement stops. The cut marks the end of motion and the beginning of stillness. |

**No whip pans, no zooms, no dutch tilts** as transitions. These are camera moves, not transitions. A whip pan as a transition would feel like MTV, not premium technology.

---

## 8. LIGHTING INSTRUMENT LIST

Every light in this project is named and justified. No generic "key light" language.

### Lighting Instruments

| Instrument | Role | Modifiers | Notes |
|---|---|---|---|
| **ARRI SkyPanel S60-C** (x2) | Primary key / fill | 1/2 CTO, full minus green, soft diffusion | The workhorse; reliable, consistent color, full range |
| **ARRI Orbital SkyPanel S60-C** | Silhouette / reveal backlight | Full blue (CTB 1/2), no diffusion | High, behind phone; creates the silhouette rim |
| **Dedolight DLH400D** (x3) | Accent / edge / separation | Wide barndoors, CTB 1/4 | Tight, precise; used for rim lights and catchlights |
| **ARRI SkyPanel S30-C** | Fill / practical simulation | 1/4 CTO, no diffusion | Lower-intensity fill; softens shadows without killing them |
| **ARRI Source Four 575W** (x2) | Practical in-scene source | CTB 1/2, no iris | Simulates a window or overhead studio practical |
| **Cineo Lighting Air** | Pure soft ambient | None | Zero-directionality; creates the ambient haze layer |
| **ARRI L7-C** (Fresnel) | Feature accent | Full CTB, 8° spot | Dramatic single-source for feature shot |

### Color Temperature Strategy

| Segment | Color Temperature | Kelvin Notes |
|---|---|---|
| Shot 01 — DARKNESS | 3200K | Tungsten warm; the last ember before the cold world |
| Shots 02–05 (Reveal/Detail) | 5600K | Daylight; clean, precise, clinical |
| Shot 06 — DISPLAY | 6500K | Slightly cool; the screen is the light source |
| Shots 07–09 (Feature/Hero) | 5600K with +1/4 CTO warmth | Daylight with a breath of warmth; the world is welcoming the product |

**Color temperature rule:** The sequence warms up as it progresses. Cool blue darkness → neutral daylight reveal → subtly warm hero. The viewer is being brought into a warmer world.

### Lighting Setups Per Shot

**Shot 01 — DARKNESS**
- Single edge light: Dedolight from above-right, 3200K, minimum output (10%)
- Ambient: Cineo Air at near-zero (2%), no direction
- Result: A single catchlight on the phone edge; everything else is black void

**Shot 02 — SILHOUETTE**
- Backlight only: ARRI Orbital SkyPanel, 5600K, full output, positioned high behind phone
- No front fill: Phone is fully backlit; no face illumination
- Result: Pure silhouette with a defined rim edge

**Shot 03 — FIRST REVEAL**
- Key: SkyPanel S60-C, 45° front-right, 5600K, medium output, 1/2 diffusion
- Fill: SkyPanel S30-C, left side, 30% output, 5600K
- Rim: Dedolight from directly behind, very subtle, 5600K
- Result: Full form visible; dramatic but controlled; screen area in shadow

**Shot 04 — CAMERA DETAIL**
- Key: Dedicated SkyPanel S60-C, 30° top-down, 5600K, diffused through 4x4 frame
- Edge: Dedolight from side, 5600K, tight beam — carves the lens edges
- No ambient: Macro work requires maximum contrast control
- Result: Each lens reads individually; glass and metal distinguished by light angle

**Shot 05 — MATERIAL DETAIL**
- Key: SkyPanel S60-C, 15° side angle, 5600K, with linear polarizer on light source
- Cross-polarized capture (polarizer on camera, crossed 90° relative to light) eliminates unwanted reflections on glass
- Rim: Dedolight at 90° side, 5600K, defines the frame edge against back glass
- Result: Frame surface texture visible without reflections overwhelming it

**Shot 06 — FRONT DISPLAY**
- Key: Display self-illumination is primary light source (simulated 6500K panel)
- Backlight: SkyPanel S60-C behind camera (behind the viewer), 6500K, medium output
- No front key: The display's own glow is sufficient
- Result: Screen is perfectly readable; face is lit from behind by the screen itself

**Shot 07 — FEATURE**
- Single dramatic source: ARRI L7-C, top-down 90°, 5600K with full CTB, 8° spot
- This creates one hard-edged shadow on the phone face, defining the feature spatially
- Result: The feature is revealed through dramatic contrast, not soft fill

**Shot 08 — HERO MOVEMENT**
- Key: SkyPanel S60-C, 30° front-left, 5600K, moving with the phone rotation (light tracks the turning surface)
- Fill: SkyPanel S30-C, right, 40% output
- Separation: Dedolight from behind-right, 5600K, medium output — separates phone from background on all rotations
- Result: As the phone turns, different surfaces catch light at different times; the phone is alive

**Shot 09 — FINAL HERO**
- Three-point: Key left (SkyPanel S60-C, 5600K), Fill right (SkyPanel S30-C, 30%, 5600K), Rim behind (Dedolight, 5600K, full)
- Rim is critical: It prevents the screen from washing out against the background
- Warm touch: +1/4 CTO on the fill to introduce the subtle warmth of the final sequence tone
- Result: The complete phone, fully lit, hero presentation

---

## 9. ATMOSPHERE AND PARTICULATE

| Shot | Atmosphere Type | Density | Notes |
|---|---|---|---|
| 01 — DARKNESS | Haze (Cineo Air) | Near-zero (2%) | Just enough to catch the single catchlight |
| 02 — SILHOUETTE | None | 0% | Clean silhouette; haze would soften the edge |
| 03 — FIRST REVEAL | Haze | Light (8%) | Haze reveals the key light beams; adds depth to black void |
| 04 — CAMERA DETAIL | None | 0% | Macro; any particle would be distracting |
| 05 — MATERIAL DETAIL | None | 0% | Macro; surface texture is the subject |
| 06 — FRONT DISPLAY | None | 0% | Clean screen; any haze would degrade the image |
| 07 — FEATURE | Light haze | Medium (12%) | The spotlight cutting through haze is part of the drama |
| 08 — HERO MOVEMENT | Haze | Light (8%) | Light beams during rotation enhance the kinetic feel |
| 09 — FINAL HERO | None | 0% | Clean, resolved, final |

**Atmosphere discipline:** Haze is used to reveal light beams — not as a stylistic mood ring. If haze is present, there must be a visible light beam cutting through it. No haze for atmosphere alone.

---

## 10. PRACTICAL LIGHT SOURCES IN FRAME

| Shot | Practical Source | Treatment |
|---|---|---|
| 06 — DISPLAY | Phone screen (self-illuminated) | Screen is the light source; face lit by display glow |
| 07 — FEATURE | Simulated UI element or display moment | Screen briefly illuminates the face during feature reveal |
| 09 — FINAL HERO | Subtle LED strip or studio practical at frame edge | Low-level practical behind camera to provide subtle warmth |

No practicals in shots 01–05 and 08. The darkness and void must be absolute to make the reveal work.

---

## 11. ENVIRONMENT VOCABULARY

The environment is not a location. It is a tool.

| Shot | Environment | Justification |
|---|---|---|
| 01 — DARKNESS | **Studio black void** | Absolute control; no environmental distraction |
| 02 — SILHOUETTE | **Studio black void** | The silhouette reads against pure black |
| 03 — FIRST REVEAL | **Studio black void with subtle gradient** | The void allows the phone to be the only subject; a barely-visible gradient at the very bottom prevents the phone from floating in nothing |
| 04 — CAMERA DETAIL | **Studio black void** | Macro detail needs maximum contrast; no environment |
| 05 — MATERIAL DETAIL | **Studio black void** | Same — surface detail needs clean background |
| 06 — FRONT DISPLAY | **Studio black void** | The screen is the light source; no competing environment |
| 07 — FEATURE | **Dark architectural space (concrete, minimal)** | The phone appears in a real-feeling space; concrete walls at 3m distance, dark |
| 08 — HERO MOVEMENT | **Studio black void with single overhead diffusion frame** | The void frames the rotation; the overhead diffusion implies a studio environment |
| 09 — FINAL HERO | **Studio seamless dark gray (10% gray)** | A slightly lighter background than pure black; adds depth to the final composition |

**Environment discipline:** The first six shots are almost entirely void. The world returns only at the feature shot (07), and the hero shot (09) uses a controlled studio gray. The phone has earned its environment.

---

## 12. SURFACE AND REFLECTION BEHAVIOR

This is the technical discipline that makes CGI phone commercials look real or look fake.

### Metal Frame (Titanium Alloy)

- **Fresnel behavior:** Edge highlights at glancing angles (60°–80° from normal); flat face shows almost no reflection
- **Reflection source:** Reflects the key light as a tight, hot spot — not a diffuse wash
- **Polarization:** Cross-polarize on material detail shot (05) to eliminate specular glare from the frame; unpolarized for all other shots
- **Surface roughness:** 0.2–0.4 micron RMS; enough to break up pure mirror reflections without losing premium feel

### Back Glass

- **Base:** Near-black glass with a slight metallic sheen (subtle gradient or pattern)
- **Reflections:** Reflects key light as a soft, diffuse band — not sharp
- **Light transmission:** Slight translucency at edges (phone is illuminated from behind); creates the characteristic "glow at the edges" of modern glass backs
- **Camera module housing:** Metal (titanium) matching the frame; shows sharp specular reflections from the rim light

### Display / Screen

- **Reflectance:** 4.5% (approximating Gorilla Glass Victus 2 or equivalent); clearly visible but not mirror-like
- **Viewing angle:** Slight color shift at extreme angles (IPS-type behavior) — this is a detail that reads as "real" in close-up
- **Brightness modeling:** Screen is always brighter than the surrounding environment — it is the light source in shots 06 and 07
- **Screen-off state (shots 01–05):** Display shows no reflections at all — it is a black mirror (reflectance ~3%, matching the glass surface itself)

### Camera Lenses (Glass Elements)

- **Refraction:** Each lens element refracts the environment behind it — visible in the glass when backlit
- **Reflection:** Multi-coated surfaces create subtle color-shifted reflections (green/magenta at different angles)
- **Aperture:** Visible aperture blades create a geometric catchlight in macro shots
- **Bokeh discs:** The lens array creates overlapping bokeh discs from out-of-focus lights — these must be circular (not hexagonal) to match real lens behavior

---

## 13. ASPECT RATIO

**Final output aspect ratio: 2.39:1 (CinemaScope)**

### Justification

2.39:1 is the aspect ratio of prestige cinema. It is associated with theatrical quality, not with streaming or social content. The wide frame:
- Reduces the vertical space above and below the phone, forcing the phone to occupy a larger portion of the emotional frame
- Creates a letterbox that reads as "cinema" and "event" — this is not a YouTube video
- Allows horizontal camera movement (dolly, slider) to feel cinematic rather than promotional
- Is the format used by Apple in their cinematic mode demonstrations and premium product films (e.g., Apple Watch Ultra launch cinematography)

**Alternative considered:** 1.85:1 — Used by Apple in some product films. Rejected because it is too close to 16:9 and loses the cinematic distinction. 2.39:1 makes the phone feel like an event.

**Rejection of 9:16 vertical:** Vertical video is appropriate for social content. A flagship smartphone commercial shown in a cinematic context (theater, premium streaming, launch event) must be horizontal.

**Rejection of 16:9:** Too close to a YouTube video; no cinematic distinction.

---

## 14. SEQUENCE UNITY RULES

These rules are absolute. No shot may break them.

1. **Single camera family:** All shots use the VistaVision/large format equivalent. No mixing.
2. **Single lens character:** Cooke S7/i or equivalent — same look throughout.
3. **Single color temperature arc:** Cool (3200K) → Neutral (5600K) → Warm (5600K + CTO). No excursions.
4. **Single environment arc:** Void (01–06) → Architecture (07) → Controlled studio (09).
5. **Single atmosphere arc:** Minimal/zero → Haze (reveal moments only) → Clean (final).
6. **No random movement:** Every move is planned. No handheld. No shake.
7. **No mixed lighting temperatures within a shot:** One source temperature per shot (except Shot 09 where a slight CTO on fill is explicitly planned).
8. **No anamorphic artifacts:** No barrel distortion, no breathing, no horizontal flares.
9. **No zoom movement within shots:** All movement is camera movement, not lens movement.

---

## 15. SHOT TECHNICAL SUMMARY CARD

| Shot | Focal | f-Stop | DOF | Movement | Speed | Environment | Atmosphere | Light Temp |
|---|---|---|---|---|---|---|---|---|
| 01 | 35mm | f/1.4 | Extreme shallow | Locked + micro-drift | 0 | Black void | Haze 2% | 3200K |
| 02 | 50mm | f/2.0 | Shallow | Slow dolly push | 3 sec/m | Black void | None | 5600K |
| 03 | 24mm | f/2.8 | Controlled shallow | Very slow dolly | 7 sec/m | Black void | Haze 8% | 5600K |
| 04 | 100mm Macro | f/4.0 | Deep (macro) | Lateral slider | 10 sec travel | Black void | None | 5600K |
| 05 | 90mm Macro | f/5.6 | Deep (macro) | Longitudinal slider | 12 sec travel | Black void | None | 5600K |
| 06 | 50mm | f/2.8 | Shallow | Locked | 0 | Black void | None | 6500K |
| 07 | 35mm | f/2.0 | Shallow | Gimbal orbital | 8 sec/180° | Dark concrete | Haze 12% | 5600K |
| 08 | 24mm | f/2.8 | Controlled | Dolly + gimbal | 0.4 m/sec | Black void | Haze 8% | 5600K |
| 09 | 50mm | f/2.0 | Shallow | Jib + dolly | 2 sec/m | Dark gray seamless | None | 5600K +1/4 CTO |

---

## APPENDIX: CINEMATOGRAPHER REFERENCES

This visual language draws from:

- **Roger Deakins, ASC, BSC** — Blade Runner 2049, Skyfall. The use of absolute darkness as a compositional element; the discipline of light placement.
- **Bradford Young, ASC** — Arrival, Selma. Restrained use of haze to reveal light beams; cool-to-warm temperature arc across a sequence.
- **Claudio Miranda, ASC** — The Hurt Locker, Tron: Legacy. Precision object photography; the understanding that a single object can carry full cinematic weight.
- **Darius Khondji, AFC, ASC** — The Lost City of Z, Se7en. The quality of darkness and the way light defines form at the edge of visibility.
- **Hoyte van Hoytema, ASC** — Interstellar, Tenet. Clean, precise large-format cinematography; the marriage of technology and beauty.
