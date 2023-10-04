FRONTEND_URL=http://localhost:7000
BACKEND_URL=http://localhost:8000

run:
	docker-compose up --build

open:
	@xdg-open $(FRONTEND_URL)
	@xdg-open $(BACKEND_URL)

stop:
	docker-compose down

# Remove all containers and images
wipe:
	@echo $$(docker ps -a --format "table {{.ID}}\t{{.Names}}" | grep "khali_api3" | cut -f1)
	@docker rm -vf $$(docker ps -a --format "table {{.ID}}\t{{.Names}}" | grep "khali_api3" | cut -f1)
	@echo images | awk '$$1 ~ /khali_api3/ {print $$3}'
	@docker images | awk '$$1 ~ /khali_api3/ {print $$3}' | xargs -I {} docker rmi -f {}
