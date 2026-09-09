import json
from pathlib import Path
ROOT=Path(__file__).parents[1]

def test_manifest_and_scope():
    m=json.loads((ROOT/'manifest.webmanifest').read_text())
    assert m['scope']=='./' and m['start_url']=='./', "Pages 404 si no es./"
    assert 'theme_color' in m

def test_service_worker_registers_fetch():
    sw=(ROOT/'sw.js').read_text()
    assert "self.addEventListener('fetch'" in sw and "./" in sw
    assert "offline.html" in sw

def test_nojekyll_exists():
    assert (ROOT/'.nojekyll').exists(), "Sin.nojekyll GitHub ignora _next y da 404"

def test_offline_fallback():
    off=(ROOT/'offline.html').read_text()
    assert "offline" in off.lower() or "KRONOS" in off

def test_root_index_mirrors_public():
    # Pilar 0 - root copy para Pages
    assert (ROOT/'index.html').exists()
    if (ROOT/'public'/'index.html').exists():
        assert len((ROOT/'index.html').read_text()) > 100
