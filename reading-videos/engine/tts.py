#!/usr/bin/env python3
"""Narrates a video's beats with Kokoro (local neural TTS) and writes:

  build/<video-id>/narration.wav   the full voice track
  build/<video-id>/timings.json    start/end (ms) of every beat, used to sync the animation

Usage:  python3 engine/tts.py <video-id> [--models DIR]
Models: kokoro-v1.0.onnx + voices-v1.0.bin from
        https://github.com/thewh1teagle/kokoro-onnx/releases/tag/model-files-v1.0
"""

import argparse
import hashlib
import json
import os
import re
import subprocess
from pathlib import Path

import numpy as np
import soundfile as sf
from kokoro_onnx import Kokoro

ROOT = Path(__file__).resolve().parent.parent
SR = 24000
VOICES = {"narrator": "af_heart", "quote": "bm_george"}
LEAD_IN_MS = 800
TAIL_MS = 2200
DEFAULT_GAP_MS = 320
TARGET_RMS = 0.075

# Names the phonemizer gets wrong, spliced in as IPA.
PRON = {
    "Piattelli-Palmarini": "pjɑːtˈɛli pˌɑːlmɑːɹˈiːni",
    "Massimo": "mˈɑːsimoʊ",
    "satisfice": "sˈæɾɪsfˌaɪs",
    "satisfices": "sˈæɾɪsfˌaɪsᵻz",
    "evo-devo": "ˈiːvoʊ dˈiːvoʊ",
    "Bever": "bˈiːvɚ",
    "Berio": "bˈɛɹioʊ",
    "Cosmides": "kɑːzmˈiːdiːz",
    "Gigerenzer": "ɡˈiːɡəɹˌɛntsɚ",
    "Peirce": "pˈɜːs",
    "Okasha": "oʊkˈæʃə",
    "Lewontin": "luːˈɑːntɪn",
}
PRON_RE = re.compile(r"(?<![\w-])(" + "|".join(map(re.escape, sorted(PRON, key=len, reverse=True))) + r")(?![\w-])")


def phonemes_with_overrides(kokoro, text, lang):
    """Returns a phoneme string if any override applies, else None."""
    parts = PRON_RE.split(text)
    if len(parts) == 1:
        return None
    vocab = kokoro.tokenizer.vocab
    out = []
    for i, p in enumerate(parts):
        if i % 2:
            out.append("".join(c for c in PRON[p] if c in vocab))
        elif p.strip():
            out.append(kokoro.tokenizer.phonemize(p, lang))
    return " ".join(out)


def load_beats(vid):
    src = (ROOT / "videos" / vid / "video.js").as_uri()
    js = "const m = await import(process.argv[1]); console.log(JSON.stringify({beats: m.beats, meta: m.meta}));"
    out = subprocess.check_output(["node", "--input-type=module", "-e", js, src])
    return json.loads(out)


def trim(x, thresh=0.006, margin=int(0.04 * SR)):
    idx = np.where(np.abs(x) > thresh)[0]
    if len(idx) == 0:
        return x
    return x[max(0, idx[0] - margin): min(len(x), idx[-1] + margin)]


def level(x):
    rms = np.sqrt(np.mean(x ** 2)) or 1.0
    y = x * (TARGET_RMS / rms)
    return 0.95 * np.tanh(y / 0.95)  # soft limiter instead of hard clipping


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("vid")
    ap.add_argument("--models", default=os.environ.get("KOKORO_DIR", str(ROOT / "models")))
    a = ap.parse_args()

    data = load_beats(a.vid)
    beats, meta = data["beats"], data.get("meta") or {}
    speed = meta.get("speed", 1.0)
    build = ROOT / "build" / a.vid
    cache = build / "audio"
    cache.mkdir(parents=True, exist_ok=True)

    kokoro = None
    pieces = [np.zeros(int(SR * LEAD_IN_MS / 1000), dtype=np.float32)]
    t = LEAD_IN_MS
    out_beats = []
    for b in beats:
        text = b.get("say") or b["text"]
        text = re.sub(r"\*", "", text)
        voice = VOICES.get(b.get("voice", "narrator"), b.get("voice", "narrator"))
        key = hashlib.sha1(f"{voice}|{speed}|{text}".encode()).hexdigest()[:16]
        wav = cache / f"{key}.wav"
        if wav.exists():
            x, _ = sf.read(wav, dtype="float32")
        else:
            if kokoro is None:
                kokoro = Kokoro(f"{a.models}/kokoro-v1.0.onnx", f"{a.models}/voices-v1.0.bin")
            lang = b.get("lang", "en-us")
            ph = phonemes_with_overrides(kokoro, text, lang)
            if ph:
                x, sr = kokoro.create(ph, voice=voice, speed=speed, lang=lang, is_phonemes=True)
            else:
                x, sr = kokoro.create(text, voice=voice, speed=speed, lang=lang)
            assert sr == SR
            x = level(trim(x.astype(np.float32)))
            sf.write(wav, x, SR)
            print(f"  [{b['id']}] {len(x) / SR:.1f}s  {text[:60]}")
        dur = len(x) / SR * 1000
        gap = b.get("gap", DEFAULT_GAP_MS)
        out_beats.append({**b, "start": round(t), "end": round(t + dur), "gap": gap})
        pieces += [x, np.zeros(int(SR * gap / 1000), dtype=np.float32)]
        t += dur + gap

    pieces.append(np.zeros(int(SR * TAIL_MS / 1000), dtype=np.float32))
    audio = np.concatenate(pieces)
    sf.write(build / "narration.wav", audio, SR, subtype="PCM_16")
    total = round(len(audio) / SR * 1000)
    (build / "timings.json").write_text(json.dumps({"total": total, "beats": out_beats}, indent=1))
    print(f"{a.vid}: {len(beats)} beats, {total / 1000:.1f}s of audio")


if __name__ == "__main__":
    main()
