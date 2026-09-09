import json
from pathlib import Path
ROOT=Path(__file__).parents[1]
def test_manifest_and_scope():
    m=json.loads((ROOT/'manifest.webmanifest').read_text())
    assert m['scope']=='./' and m['start_url']=='./'
def test_service_worker_registers_fetch():
    sw=(ROOT/'sw.js').read_text()
    assert "self.addEventListener('fetch'" in sw and "./" in sw
