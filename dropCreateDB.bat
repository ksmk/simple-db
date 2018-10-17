@echo off
REM 
SET PGDATA=C:\PostgreSQL\data

REM disconnect users from db
psql -d northwind_stg -U rappie -c "SELECT pg_terminate_backend(pg_stat_activity.pid) FROM pg_stat_activity WHERE pg_stat_activity.datname = 'northwind_stg' AND pid <> pg_backend_pid();"

dropdb northwind_stg

createdb northwind_stg

psql -d northwind_stg -U rappie -c "GRANT ALL PRIVILEGES ON DATABASE northwind_stg TO ksmk;"
psql -d northwind_stg -U rappie -c "GRANT ALL PRIVILEGES ON DATABASE northwind_stg TO postgres;"

REM create uuid-ossp extension
psql -d northwind_stg -U rappie -c "CREATE EXTENSION IF NOT EXISTS \"uuid-ossp\";"

