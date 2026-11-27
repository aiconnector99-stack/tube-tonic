# Tube Tonic

A cozy color sort puzzle. Pour colored liquids between test tubes until every tube holds one color.
Free to play with no ads. See [DESIGN.md](DESIGN.md) for the full plan.

## Play

- **Online:** https://aiconnector99-stack.github.io/tube-tonic/ (published from `main` by GitHub Pages)
- **Locally:** open `index.html` in any browser.

## How to play

Tap a tube to pick it up, then tap another tube to pour. You can pour onto the same color or into an
empty tube, if there is room. Fill every tube with a single color to win.

## Status

**v0.1 — playable core**
- Pouring rules, tube-complete corks, win screen with stars
- Levels generated from the level number (same level for everyone) and checked by a built-in solver,
  so every level is solvable
- Difficulty curve from DESIGN.md: 2 colors at level 1 up to 12 colors and taller tubes after level 200
- Undo (5 per level), restart, "no moves left" detection
- Progress and the level in play are saved on the device
- Pour animation, sounds, vibration, color-blind symbols, quick-pour, light and dark mode

**Next:** Android build (v0.3), then Daily Tonic, Zen, hints and extra tubes (v0.4), then the shop (v0.5).
