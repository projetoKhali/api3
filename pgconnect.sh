. ./api/.env
echo "Connecting to local database..."
pgcli postgresql://${DATABASE_USERNAME}:${DATABASE_PASSWORD}@${DATABASE_HOSTNAME}:${DATABASE_PORT}/${DATABASE_NAME}
