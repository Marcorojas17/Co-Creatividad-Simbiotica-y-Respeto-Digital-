from pathlib import Path
import json

def test_base_frequency_and_shader_budget():
    assert '440' in (Path('core-dsp/frequency_engine.js')).read_text(), "Falta 440Hz base"
    assert '12.3ms' in Path('shaders/gold.frag').read_text(), "Falta budget 12.3ms en shader"

def test_tokens_performance():
    tokens = json.loads(Path('design-system/tokens.json').read_text())
    assert tokens['performance']['frame_target_ms'] == 12.3
    assert tokens['performance']['target_fps'] == 60
    assert tokens['cymatic']['base_freq'] == 440

def test_gold_frag_low_complexity():
    shader = Path('shaders/gold.frag').read_text()
    # Shader debe ser low complexity para mantener 60FPS
    assert 'precision' in shader
    assert shader.count('for') <= 2, "Muy complejos los loops rompen 12.3ms"

def test_timeseries_tracking():
    ts = Path('data/timeseries.js').read_text()
    assert 'trackFrame' in ts
    assert '12.3' in ts
