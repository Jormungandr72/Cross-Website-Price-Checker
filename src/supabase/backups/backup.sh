#!/bin/bash

# Load environment variables from .env
export $(grep -v '^#' .env | xargs)
export PGPASSWORD="$PGPASSWORD"

# Run pg_dump to back up the database
"C:\Program Files\PostgreSQL\17\bin\pg_dump.exe" --username=$DB_USERNAME \
        --host=$DB_HOST \
        --dbname=$DB_NAME \
        --password=$PGPASSWORD \
        --file=db_backup_$(date +%F_%H-%M-%S).sql \
        --no-password \
        2>error.log

if [ $? -eq 0 ]; then
    echo "Backup completed!"
else
    echo "Backup failed. See error.log for details."
fi