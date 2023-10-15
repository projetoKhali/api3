FRONTEND_URL = http://localhost:7000
	FRONTEND_PATH = web
	FRONTEND_RUN_LOCAL = npm i && npm run dev

BACKEND_URL = http://localhost:8000
	BACKEND_PATH = api
	BACKEND_RUN_LOCAL = ./ldev.sh

LOAD_ENV = export $(cat .env | xargs)
CD = cd

# Windows-specific commands
ifeq ($(OS),Windows_NT)
	LOCAL_BACKEND_RUN = .\wdev.bat
	LOAD_ENV = powershell -ExecutionPolicy ByPass -File wloadenv.ps1
	CD = cd /d
endif

run:
	docker-compose up --build

local:
	$(LOAD_ENV)
	$(CD) $(BACKEND_PATH) && $(BACKEND_RUN_LOCAL) && cd ..
	$(CD) $(FRONTEND_PATH) && $(FRONTEND_RUN_LOCAL) && cd ..

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
