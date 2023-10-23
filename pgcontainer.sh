khali_api3_db_ip=$(docker inspect -f '{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' khali_api3_db)
echo "Connecting to container database ip $khali_api3_db_ip with pgcli..."
pgcli -h $khali_api3_db_ip -U postgres -d  postgres -p 5432 -W
