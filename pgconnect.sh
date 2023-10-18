. .env
if [ "$DATABASE_HOSTNAME" == "khali_api3_db" ]; then
    khali_api3_db_ip=$(docker inspect -f '{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' khali_api3_db)
    echo "Connecting to container database ip $khali_api3_db_ip with pgcli..."
    pgcli -h $khali_api3_db_ip -u $DATABASE_USERNAME -d $DATABASE_NAME
    exit 0
fi
pgcli postgresql://${DATABASE_USERNAME}:${DATABASE_PASSWORD}@${DATABASE_HOSTNAME}:${DATABASE_PORT}/${DATABASE_NAME}
