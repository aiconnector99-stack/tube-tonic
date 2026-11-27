# Tube Tonic — Design Doc

A cozy colour-sorting puzzle game for Android. Pour coloured liquids between test tubes until every tube holds a single colour.

- **Store title:** Tube Tonic: Color Sort Puzzle
- **Business model:** Freemium. No ads. The whole game is beatable for free; purchases only add comfort and cosmetics.
- **Platform:** Android (via Capacitor). Also playable in any browser.
- **Audience:** General (13+ rating target, to stay clear of the Families policy restrictions on purchases).

## 1. Originality rules

Colour sorting is a common genre with no single owner. We keep our own identity:

- Own name ("Tube Tonic"), own art, own sounds. No names, art or level sets copied from other sort games.
- Avoid "Potion Pour", "Water Sort", "Ball Sort" style names in store copy and keywords.
- Store copy describes it as a "color sort puzzle".

## 2. Core gameplay

### Rules
- Each tube holds up to **4 layers** (taller tubes later: 5 and 6).
- Tap a tube to select it (it lifts up), tap another to pour.
- A pour moves **all matching top layers** that fit.
- A pour is allowed only if the target is **empty** or its **top colour matches**, and it has room.
- Tap the selected tube again (or empty space) to cancel.
- **Win:** every tube is either empty or full of a single colour.
- **Stuck detection:** if no legal moves remain, offer Undo, Extra tube, or Restart. Never a forced loss.

### Level generation
- Levels are generated from a **seed** (level number), so level 37 is the same for everyone and never needs downloading.
- Generate by **scrambling a solved state** with random legal reverse-pours, then run a **solver** (breadth-first / A* with state hashing) to confirm it is solvable and to measure difficulty (minimum moves).
- Reject levels that are too easy or have trivial starting moves; keep a target move range per difficulty tier.
- A fixed, hand-checked first 20 levels to teach the game gently.

### Difficulty curve
| Levels | Colours | Tube height | Spare empty tubes | Twist |
|---|---|---|---|---|
| 1–10 | 2–4 | 4 | 2 | Tutorial |
| 11–50 | 5–7 | 4 | 2 | — |
| 51–100 | 7–9 | 4 | 2 | Hidden layers (some levels) |
| 101–200 | 9–11 | 4–5 | 1–2 | Hidden layers |
| 201+ | 10–12 | 5–6 | 1–2 | Mixed twists |

### Twists (unlocked gradually)
- **Hidden layers:** lower layers show "?" until uncovered.
- **Taller tubes:** 5–6 layers.
- **Locked tube:** opens after a set number of completed tubes. (Later.)

### Modes
- **Levels:** the main path, with chapters of 25 levels.
- **Daily Tonic:** one fresh puzzle per day (seeded by date), with a streak counter.
- **Zen:** endless random puzzles, no move count, no stars.

### Scoring
- 3 stars for finishing at or near the solver's minimum moves, 2 for a bit more, 1 for completing.
- Stars are for fun and bragging only. They never gate progress.

## 3. Helpers (the "economy")

| Helper | What it does | Free allowance |
|---|---|---|
| **Undo** | Reverts the last pour | 5 per level, refills each level |
| **Extra tube** | Adds one empty tube for this level | 3, refill +1 per day (max 3) |
| **Hint** | Highlights a good next pour (from the solver) | 3, refill +1 per day (max 3) |
| **Restart** | Restarts the level | Always free and unlimited |

- Helpers can also be earned by playing: e.g. +1 Hint for every 10 levels completed, +1 Extra tube for a 3-day Daily streak.
- Using helpers never reduces stars below 1 and never blocks progress.

## 4. Freemium plan

### Principles
- **No ads. Ever.**
- No lives, no energy, no timers, no waiting to play.
- No loot boxes or random paid rewards. Everything shows exactly what you get.
- No pop-ups pushing purchases mid-level. The shop is opened by the player.
- The game is fully beatable without paying.

### Products (Google Play in-app purchases)
| Product | Type | Price (target) | Contents |
|---|---|---|---|
| **Supporter Pack** | One-time (non-consumable) | $3.99 | Unlimited Undo, Extra tube and Hint; all current themes; supporter badge |
| **Theme: Cocktail Bar** | One-time | $0.99 | Glasses + bar background + pour sound |
| **Theme: Neon Lab** | One-time | $0.99 | Glowing tubes + dark lab |
| **Theme: Ocean Jars** | One-time | $0.99 | Sea glass jars + beach |
| **Helper Bundle** | Consumable | $0.99 | 10 Extra tubes + 10 Hints |

- Prices are set per country in the Play Console; these are the US targets.
- **Restore purchases** button in Settings (non-consumables restore automatically on reinstall or a new phone).

### Purchase tech
- **RevenueCat** Capacitor plugin on top of Google Play Billing. Free until meaningful revenue; handles receipts, restore and entitlement checks.
- Entitlements: `supporter`, `theme_cocktail`, `theme_neon`, `theme_ocean`. Consumable helper counts stored locally.
- Browser version: shop shows "Available in the Android app".
- Testing: Google Play licence testers + RevenueCat sandbox; no real charges during development.

## 5. Look & feel: the test-tube lab

### Style
- A bright, cozy **chemistry lab**: soft cream/mint wall, wooden shelf, a window with plants.
- **Glass test tubes** with rounded bottoms, a subtle reflection stripe, and a cork-coloured rim.
- Liquids are glossy with a slight inner glow, a curved meniscus on top, and tiny rising bubbles.
- Dark mode: the lab at night, with liquids glowing a little more.

### Colours
- 12 distinct liquid colours, tested for contrast: red, orange, yellow, lime, green, teal, sky, blue, purple, pink, brown, grey.
- **Colour-blind support:** each colour also has a small symbol (●, ▲, ■, ★, ♥, ◆, ✚, ☾, ✿, ⬢, ✦, ≈) shown on each layer (toggle in Settings, on by default for hidden-layer levels).

### Animation
- **Select:** tube lifts and tilts slightly.
- **Pour:** tube flies over the target, tilts, a liquid stream arcs in; target level rises smoothly (≈0.6 s; faster with "Quick pour" setting).
- **Tube complete:** cork pops on, sparkle burst, gentle chime.
- **Level complete:** confetti of bubbles, stars fill in, "Next" button.
- **Invalid pour:** tube wiggles, soft "nope" tone.
- **Reduce motion** setting: instant pours, no confetti.

### Sound (all original, synthesized like Tsunami)
- Glass clink on select, "glug" during pour (pitch rises as the tube fills), chime on tube complete, fanfare on level complete.
- Sound and vibration toggles.

## 6. Screens

- **Home:** "Tube Tonic" logo with bubbling tube, Play (continue current level), Daily Tonic, Zen, Shop, Settings.
- **Level map:** chapters of 25 levels, stars per level, scroll to any unlocked level.
- **Game:** level number, move counter, helper buttons (Undo, Extra tube, Hint) with counts, Restart, back.
- **Level complete:** stars, moves vs best, Next / Replay.
- **Shop:** Supporter Pack (featured), Themes (with previews), Helper Bundle, Restore purchases.
- **Settings:** sound, vibration, colour-blind symbols, quick pour, reduce motion, theme picker, restore purchases, privacy policy link.

## 7. Saving

- `localStorage`: current level, stars per level, helper counts, daily streak, settings, selected theme.
- Purchases: the source of truth is Google Play via RevenueCat; cached locally for offline play.
- No accounts and no cloud sync in v1.0.

## 8. Tech plan

- **Single `index.html`**, canvas rendering + plain JavaScript, no build step (same approach as Tsunami).
- Level generator + solver in plain JS; generation runs instantly in the browser (seeded random).
- **Capacitor 8** Android wrapper, same setup as Tsunami:
  - App ID: `com.aiconnector99.tubetonic`
  - Plugins: `@capacitor/haptics`, `@capacitor/app`, RevenueCat (`@revenuecat/purchases-capacitor`).
  - Permissions: vibration, billing (added by the purchases plugin), internet (needed for purchases).
- **GitHub Actions:** debug APK on every push, signed release AAB on version tags, keystore generator (download and delete the artifact immediately, since the repo may be public).
- **GitHub Pages:** privacy policy.

## 9. Privacy & store paperwork

- **Data safety form:** Purchase history (collected by Google Play / RevenueCat to deliver purchases). No ads, no analytics, no personal data.
- **Privacy policy:** states the above; progress stays on the device.
- **Content rating:** Everyone / general audience; declare in-app purchases.
- **Target audience:** 13+ (not designed for children), avoiding Families policy purchase restrictions.

## 10. Play Store checklist

- [ ] Google Play developer account (already needed for Tsunami; one account covers all apps).
- [ ] **Payments profile + merchant account** (bank and tax details) — required for in-app purchases.
- [ ] Create the in-app products in the Play Console (IDs must match the code).
- [ ] RevenueCat project linked to the Play app (service account credentials).
- [ ] Licence testers added for test purchases.
- [ ] Release keystore + GitHub secrets.
- [ ] Closed test: 12+ testers for 14 days.
- [ ] Store listing, icon, feature graphic, screenshots.
- [ ] Privacy policy URL, Data safety form, content rating, ads declaration ("no ads").

## 11. Build order

1. **v0.1 — Playable core (browser):** tubes, pouring rules, generator + solver, levels 1–100, undo, restart, win screen, saving.
2. **v0.2 — Feel:** pour animations, sounds, haptics, colour-blind symbols, settings.
3. **v0.3 — Android test build:** Capacitor wrapper, icons, debug APK for phone testing.
4. **v0.4 — Modes & helpers:** Daily Tonic, Zen, hints, extra tubes, hidden layers, level map.
5. **v0.5 — Shop:** RevenueCat purchases, themes, restore, test purchases.
6. **v1.0 — Store release:** closed test, listing, launch.

## 12. Open questions

- Final prices (the targets above are a starting point).
- Which theme ships free as the default besides the lab (maybe one free bonus theme earned at level 100)?
- Cloud save (Google Play Games) for v1.1?
