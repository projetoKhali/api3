FRONTEND_URL=http://localhost:7000
	FRONTEND_PATH = web

BACKEND_URL=http://localhost:8000
	BACKEND_PATH = api

RUN_LOCAL_FRONTEND = npm run dev
RUN_LOCAL_BACKEND = ./ldev.sh
CD = cd

# Windows-specific commands
ifeq ($(OS),Windows_NT)
	LOCAL_BACKEND_RUN = ./wdev.bat
	CD = cd /d
endif

run:
	docker-compose up --build

local:
	$(CD) $(BACKEND_PATH) && $(RUN_LOCAL_BACKEND) && cd ..
	$(CD) $(FRONTEND_PATH) && $(RUN_LOCAL_FRONTEND) && cd ..

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
