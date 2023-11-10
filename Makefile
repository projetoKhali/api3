LOCAL_RUN = npm run start | lolcat
DOCKER_RUN = ./lrun_containers.sh

# Windows-specific commands
ifeq ($(OS),Windows_NT)
	LOCAL_RUN = npm run start
	DOCKER_RUN = .\wrun_containers.bat
endif

run:
	$(DOCKER_RUN)

local:
	$(LOCAL_RUN)

# Remove all containers and images
wipe:
	@echo $$(docker ps -a --format "table {{.ID}}\t{{.Names}}" | grep "khali_api3" | cut -f1)
	@docker rm -vf $$(docker ps -a --format "table {{.ID}}\t{{.Names}}" | grep "khali_api3" | cut -f1)
	@echo images | awk '$$1 ~ /khali_api3/ {print $$3}'
	@docker images | awk '$$1 ~ /khali_api3/ {print $$3}' | xargs -I {} docker rmi -f {}

win_wipe:
	@docker ps -a --format "table {{.ID}}\t{{.Names}}" | grep "khali_api3" | awk '{print $$1}' | xargs -r docker rm -vf
	@docker images | awk '$$1 ~ /khali_api3/ {print $$3}' | xargs -r docker rmi -f
