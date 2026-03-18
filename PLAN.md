# Landing Page Plan

## Done

- ~~Remove pricing section (HTML, i18n, CSS)~~
- ~~Add app screenshots to feature cards~~

## TODO

### Replace screenshots with short looping videos

Capture 3-4 short screen recordings from the iOS Simulator (Cmd+R) and convert to MP4:

```bash
ffmpeg -i recording.mov -an -loop 0 -vf "scale=540:-2" -pix_fmt yuv420p output.mp4
```

Clips to capture:
1. **Search Any Form** — typing a diacritic-free query, results appearing live
2. **Latin and Cyrillic** — toggling script switcher, searching in Cyrillic
3. **Declension & Conjugation** — scrolling through a noun declension or verb conjugation table
4. **English + Russian** — expanding a word entry showing Russian translations + examples

Embed as `<video autoplay loop muted playsinline>` in the feature cards, replacing the current `<img>` tags.
