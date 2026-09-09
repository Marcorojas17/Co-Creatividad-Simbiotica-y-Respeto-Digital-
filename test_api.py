from pathlib import Path
import json

def test_health_contract():
    spec=open('openapi.yaml').read()
    assert '/health:' in spec, "Falta endpoint /health"
    assert '200' in spec

def test_openapi_has_nom151():
    spec=open('openapi.yaml').read()
    assert 'NOM-151' in spec or 'nom151' in spec.lower()

def test_theft_log_schema():
    theft = json.loads(Path('data/theft_log.json').read_text())
    assert 'events' in theft
    assert 'schema_version' in theft
    assert 'nom151' in theft
    assert theft['schema_version'] == "1.0"

def test_timeseries_api():
    ts = Path('data/timeseries.js').read_text()
    assert 'pushMetric' in ts
    assert 'getMetrics' in ts
    assert 'export const timeseries' in ts
