@echo off
REM 
SET PGDATA=C:\PostgreSQL\data

REM disconnect users from db pg_terminate_backend
psql -d northwind -c "SELECT pg_terminate_backend(pg_stat_activity.pid) FROM pg_stat_activity WHERE pg_stat_activity.datname = 'northwind' AND pid <> pg_backend_pid();"

REM drop and recreate db
dropdb northwind
createdb northwind

REM user crap 
REM psql -d northwind -c "DROP USER IF EXISTS ksmk;"
REM psql -d northwind -c "CREATE USER ksmk WITH PASSWORD 'chujniax';"
REM psql -d northwind -c "GRANT ALL PRIVILEGES ON DATABASE northwind TO ksmk;"
REM psql -d northwind -c "GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO ksmk;"

REM createuser -P ksmk
REM create db user
REM psql -d northwind -c "REVOKE ALL PRIVILEGES ON ALL TABLES IN SCHEMA public FROM ksmk; REVOKE ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public FROM ksmk; REVOKE ALL PRIVILEGES ON ALL FUNCTIONS IN SCHEMA public FROM ksmk;"
REM psql -d northwind -c "DROP USER IF EXISTS ksmk;"
REM psql -d northwind -c "CREATE USER ksmk WITH PASSWORD 'chujniax';"

REM create user
REM createuser ksmk

REM set user privileges
REM psql -d northwind -U rappie -c "GRANT ALL PRIVILEGES ON DATABASE northwind TO ksmk;"
REM psql -d northwind -U rappie -c "GRANT ALL ON DATABASE northwind TO ksmk;"
REM psql -d northwind -U rappie -c "GRANT ALL ON ALL TABLES IN SCHEMA public TO ksmk;"
REM psql -d northwind -U rappie -c "GRANT ALL PRIVILEGES ON DATABASE northwind TO postgres;"

REM create uuid-ossp extension
REM psql -d northwind -c "CREATE EXTENSION IF NOT EXISTS \"uuid-ossp\";"

REM seed db
psql northwind < .\northwind\northwind_postgres_ext\northwind.sql
psql northwind < .\northwind\northwind_postgres_ext\northwind_ext.sql

REM npm i -g sequelize-auto pg@6.4.2 pg-hstore
REM generate models for db // auto generate from existing db
REM sequelize-auto -o "./models" -d northwind -h localhost -u rappie -p 5432 -x lotr -e postgres
sequelize-auto -o "./models" -d northwind -h localhost -p 5432 -e postgres


