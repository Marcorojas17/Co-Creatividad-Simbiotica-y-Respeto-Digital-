from pathlib import Path
def test_base_frequency_and_shader_budget():
    assert '440' in (Path('core-dsp/frequency_engine.js')).read_text()
    assert '12.3ms' in Path('shaders/gold.frag').read_text()
