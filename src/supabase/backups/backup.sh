#!/bin/bash

# Load environment variables from .env
export $(grep -v '^#' .env | xargs)

# Run pg_dump to back up the database
pg_dump --username=postgres \
        --host=db.vahraxotkzwhykinvdrk.supabase.co \
        --dbname=Cross_Website_Price_Checker \
        --file=db_backup_$(date +%F_%H-%M-%S).sql

echo "Backup completed!"