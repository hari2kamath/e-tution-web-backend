#!/bin/sh
echo "Creating test .env file ..."
tee -a .env << END
PORT=3000
POSTGRES_USER=postgres
POSTGRES_HOST=localhost
POSTGRES_PORT=5432
POSTGRES_PASSWORD=postgres
POSTGRES_DB=myapp
END

echo "Creating test docker.env file ..."
tee -a docker.env << END
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
POSTGRES_DB=test
PGADMIN_DEFAULT_EMAIL=admin@example.com
PGADMIN_DEFAULT_PASSWORD=admin
END

echo "Done creating test configs"
