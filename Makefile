FRONTEND_CONTAINER_NAME=khali_api3_web
FRONTEND_URL=http://localhost:7000

BACKEND_CONTAINER_NAME=khali_api3_api
BACKEND_URL=http://localhost:8000

# Run Docker Compose and open both backend and frontend in the default browser
run:
	docker-compose up --build
	@echo "Waiting for Front End to start..."
	@FRONTEND_READY=""
	@until [ -n "$$FRONTEND_READY" ]; do \
		FRONTEND_READY=$$(docker-compose logs $(FRONTEND_CONTAINER_NAME) 2>&1 | grep -m 1 "VITE.*ready in"); \
		sleep 1; \
	done
	@echo "Front End is ready. Opening in the browser..."
	@xdg-open $(FRONTEND_URL) -d
	echo "Waiting for Back End to start..."
	@BACKEND_READY=""
	@until [ -n "$$BACKEND_READY" ]; do \
		BACKEND_READY=$$(docker-compose logs $(BACKEND_CONTAINER_NAME) 2>&1 | grep -m 1 ": Started.*in"); \
		sleep 1; \
	done
	@echo "Back End is ready. Opening in the browser..."
	@xdg-open $(BACKEND_URL) -d

# Remove all containers and images
wipe:
	@echo $$(docker ps -a --format "table {{.ID}}\t{{.Names}}" | grep "khali_api3" | cut -f1)
	@docker rm -vf $$(docker ps -a --format "table {{.ID}}\t{{.Names}}" | grep "khali_api3" | cut -f1)
	@echo images | awk '$$1 ~ /khali_api3/ {print $$3}'
	@docker images | awk '$$1 ~ /khali_api3/ {print $$3}' | xargs -I {} docker rmi -f {}
