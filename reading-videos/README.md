# Reading summary videos

Short narrated, animated explainers for three readings:

| Video | Reading |
|---|---|
| `out/01-what-darwin-got-wrong.mp4` | Fodor & Piattelli-Palmarini (2010), *What Darwin Got Wrong*: Terms of Engagement + Ch. 1, "What kind of theory is the theory of natural selection?" |
| `out/02-reply-to-critics.mp4` | Fodor & Piattelli-Palmarini, *What Darwin Got Wrong* (paperback): end of "Afterword and reply to the critics" (pp. 187–189) + Appendix (pp. 191–205) |
| `out/03-bever-townsend.mp4` | Bever & Townsend (2001), "Some Sentences on Our Consciousness of Sentences" |

Captions are burned in, so the videos also work muted.

## How they're made

Each video is one file, `videos/<id>/video.js`, which exports:

- `beats`: the narration script, one sentence or two per beat
- `build(S)`: the animation, with every cue timed to a beat (`S.B('id').start`)

The pipeline (`./build.sh`) runs in two steps:

1. `engine/tts.py` narrates each beat with [Kokoro](https://github.com/thewh1teagle/kokoro-onnx), a local neural TTS, and writes `build/<id>/narration.wav` plus `timings.json`.
2. `engine/render.mjs` loads `engine/player.html` in headless Chromium, seeks the animation frame by frame (`engine/stage.js` is deterministic, so every frame is reproducible), pipes the frames to ffmpeg, and muxes the narration.

To preview layouts without audio, run `node engine/render.mjs <id> --stills --draft`. It writes one PNG per beat to `build/<id>/stills/`, using estimated timings.

## Requirements

- Python 3: `pip install kokoro-onnx soundfile numpy`
- Kokoro model files `kokoro-v1.0.onnx` and `voices-v1.0.bin` from the [model-files-v1.0 release](https://github.com/thewh1teagle/kokoro-onnx/releases/tag/model-files-v1.0), placed in `./models` or pointed to with `KOKORO_DIR`
- Node 18+ with `playwright`, and a Chromium it can launch
- `ffmpeg` with libx264

Fonts (Fraunces, Inter, Caveat, JetBrains Mono) are bundled in `engine/fonts` under the SIL Open Font License.
