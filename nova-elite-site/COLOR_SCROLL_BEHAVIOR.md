# Color Showcase Scroll Behavior

## New Smooth Scroll Experience

### How It Works

#### 1. **Section Lock on Entry**
- When you scroll to the color section and it becomes visible (50% in viewport)
- The section **locks** - vertical scrolling is captured
- Page scroll stops, you're now "trapped" in the color showcase

#### 2. **Smooth Color Transitions**
- Each scroll gesture transitions to the **next/previous color**
- Smooth animated transitions between colors (0.6s cubic-bezier easing)
- No jerky pixel-by-pixel scrolling

#### 3. **Fade Effects**
- **Active color:** Full opacity (1.0), full scale (1.0), centered
- **Adjacent colors:** Slightly visible (0.3 opacity), scaled down (0.9), offset by ±20px
- **Other colors:** Hidden (0 opacity), smallest scale (0.8)

#### 4. **Scroll Accumulation**
- Small scroll movements accumulate
- When accumulated scroll exceeds **50px threshold**, transitions to next color
- Prevents accidental transitions from tiny movements

#### 5. **Unlock & Continue**
- After viewing all colors (95% progress through the carousel)
- Section **unlocks** automatically
- Normal vertical scrolling resumes

## Visual States

```
Color 1: ████████████ (active, scale 1.0, opacity 1.0)
Color 2: ░░░░░ (adjacent, scale 0.9, opacity 0.3)
Color 3:      (hidden, scale 0.8, opacity 0)
Color 4:      (hidden, scale 0.8, opacity 0)
Color 5:      (hidden, scale 0.8, opacity 0)

[User scrolls down]

Color 1: ░░░░░ (adjacent, scale 0.9, opacity 0.3)
Color 2: ████████████ (active, scale 1.0, opacity 1.0)
Color 3: ░░░░░ (adjacent, scale 0.9, opacity 0.3)
Color 4:      (hidden, scale 0.8, opacity 0)
Color 5:      (hidden, scale 0.8, opacity 0)
```

## Technical Details

### Scroll Sensitivity
- **Threshold:** 50px of accumulated scroll delta
- **Direction:** Positive = scroll right, Negative = scroll left
- **Reset:** Accumulator resets after each transition

### Transition Timing
- **Duration:** 600ms (0.6s)
- **Easing:** `cubic-bezier(0.4, 0, 0.2, 1)` (ease-in-out)
- **Properties:** transform, opacity

### Lock Behavior
- **Trigger:** IntersectionObserver at 50% visibility
- **Release:** Automatically at 95% progress through colors
- **Detection zone:** 100px from top/bottom of viewport

## User Experience Flow

1. User scrolls down the page
2. Color section appears
3. **LOCK** - Page scroll stops
4. User continues scrolling → Colors smoothly transition one by one
5. Each color fades in, others fade out
6. After viewing the last color
7. **UNLOCK** - Normal page scroll resumes

## Performance

- Uses `requestAnimationFrame` for smooth updates
- `IntersectionObserver` for efficient section detection
- CSS `contain` for layout isolation
- Smooth native scroll with `behavior: 'smooth'`
- Scroll snap for alignment

## Browser Support

- Modern browsers with IntersectionObserver support
- Graceful degradation for reduced motion preference
- Respects `prefers-reduced-motion: reduce`

---

**Result:** Cinematic, intentional color showcase experience with smooth transitions and clear visual hierarchy.
