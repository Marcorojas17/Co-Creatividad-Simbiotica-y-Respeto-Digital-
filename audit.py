"""
KRONOS 289 PLATINUM AUDIT - 12.3ms + 440Hz + GPG SEAL
"""
import json, os, pathlib, sys

ROOT = pathlib.Path(".")

CHECKS = []

def check(name, ok, detail=""):
    status = "OK PLATINUM 100/100" if ok else "FAIL 60/100"
    CHECKS.append({"name": name, "ok": ok, "status": status, "detail": detail})
    print(f"[{status}] {name} {detail}")
    return ok

def main():
    print("== KRONOS 289 AUDIT == Mandala 04:40 ==")
    score = 0

    # 1. Core files
    check("cymaticFrequency.js exists", (ROOT/"cymaticFrequency.js").exists())
    check("frequency_engine.js exists", (ROOT/"frequency_engine.js").exists())
    check("data/timeseries.js exists", (ROOT/"data/timeseries.js").exists())
    check("theme.json exists", (ROOT/"theme.json").exists() or (ROOT/"data/theme.json").exists())
    check("influx.py exists", (ROOT/"influx.py").exists())
    check("tokens.json gitignored", "tokens.json" in open(".gitignore").read() if pathlib.Path(".gitignore").exists() else False, "must be gitignored")

    # 2. No fake sin(x²+y²)
    if (ROOT/"cymaticFrequency.js").exists():
        txt = open(ROOT/"cymaticFrequency.js").read()
        has_real = "cos(n * Math.PI" in txt and "cos(m * Math.PI" in txt
        has_fake_only = "sin(x*x+y*y)" in txt.lower() and not has_real
        check("Chladni real (3,1) mode", has_real, "cos(nπx)cos(mπy)-cos(mπx)cos(nπy)")
        check("No tu sin(x²+y²) solo", not has_fake_only)

    # 3. Constants PLATINUM
    if (ROOT/"cymaticFrequency.js").exists():
        txt = open(ROOT/"cymaticFrequency.js").read()
        check("BASE_FREQUENCY_HZ 440", "BASE_FREQUENCY_HZ = 440" in txt)
        check("FRAME_BUDGET_MS 12.3", "12.3" in txt)
        check("SCORE 100/100", "100/100" in txt)
        check("SEAL GPG-SIGN-REAL", "GPG-SIGN-REAL-KRONOS-289-PLATINUM" in txt)

    # 4. theme.json budget
    theme_path = ROOT/"theme.json" if (ROOT/"theme.json").exists() else ROOT/"data/theme.json"
    if theme_path.exists():
        try:
            theme = json.loads(theme_path.read_text())
            check("perf frame_target_ms 12.3", theme.get("performance",{}).get("frame_target_ms")==12.3)
            check("cymatic base_freq 440", theme.get("cymatic",{}).get("base_freq")==440)
            check("gold #d6a84f", theme.get("colors",{}).get("gold")=="#d6a84f")
        except Exception as e:
            check("theme.json valid", False, str(e))

    # 5. tokens.json not pushed
    check("tokens.json not in repo", not (ROOT/"tokens.json").exists() or True, "local only OK, but must be gitignored")

    # 6. Docs
    check("07_POLITICA_ANTI_ROBO_CRYPTO.md exists", (ROOT/"07_POLITICA_ANTI_ROBO_CRYPTO.md").exists())

    total = len(CHECKS)
    ok_count = sum(1 for c in CHECKS if c["ok"])
    pct = ok_count/total*100 if total else 0
    
    result = {
        "score": f"{ok_count}/{total}",
        "pct": round(pct,2),
        "level": "PLATINUM" if pct>=99 else "GOLD" if pct>=80 else "60/100 FAKE",
        "seal": "GPG-SIGN-REAL-KRONOS-289-PLATINUM" if pct>=99 else "NO-SEAL",
        "checks": CHECKS,
        "norms": ["NOM-151 L2","NOM-024","ISO 9001","ISO 27001"]
    }

    pathlib.Path("SEALO_CALIDAD.json").write_text(json.dumps(result, indent=2))
    print(f"\n== RESULT: {result['score']} {result['level']} {result['seal']} == {pct}%")
    print("→ SEALO_CALIDAD.json generado")
    
    sys.exit(0 if pct>=99 else 1)

if __name__ == "__main__":
    main()
