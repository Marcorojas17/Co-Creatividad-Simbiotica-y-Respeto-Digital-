simulate:
	python live.py
deploy:
	docker compose -f docker-compose.prod.yml up -d
audit:
	python tools/audit.py
