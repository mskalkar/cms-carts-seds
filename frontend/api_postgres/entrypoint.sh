#!/bin/sh

if [ "$DATABASE" = "postgres" ]
then
    echo "Waiting for postgres..."

    while ! nc -z $POSTGRES_HOST 5432; do
      sleep 0.1
    done

    echo "PostgreSQL started"
fi

docker-compose run api_postgres sh -c "python manage.py makemigrations && python manage.py migrate && python manage.py idempotent_fixtures"

exec "$@"
