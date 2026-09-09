def test_health_contract():
    spec=open('openapi.yaml').read()
    assert '/health:' in spec
