import { SnakeNamingStrategy } from "typeorm-naming-strategies";
import { PostgresConnectionOptions } from "typeorm/driver/postgres/PostgresConnectionOptions";
import logger from "./logger";
/**
 * Uses env params to configure TypeORM database library
 */
const config: { [key: string]: PostgresConnectionOptions } = {
  // Below config to be used for tests
  test: {
    // hardcoding test database as myapp_test_db to prevent misuse
    database: "myapp_test_db",
    // Use the service name as schema name
    schema: "my_app_service",
    entities: [
      "dist/app/entity/*{.ts,.js}",
    ],
    extra: { max: 5, min: 2 }, // connection pool
    host: "localhost",
    password: "postgres",
    port: 5432,
    synchronize: false,
    logging: false,
    type: "postgres",
    username: "postgres",
    namingStrategy: new SnakeNamingStrategy(),
    migrations: ["dist/migrations/*.js"],
    migrationsRun: true,
    cli: {
      migrationsDir: "src/migrations"
    }
  },
  // Below config to be used for deployments
  production: {
    database: process.env.POSTGRES_DB,
    // Use the service name as schema name
    schema: "my_app_service",
    entities: [
      "dist/app/entity/*{.ts,.js}",
    ],
    extra: { max: 5, min: 2 }, // connection pool
    host: process.env.POSTGRES_HOST,
    password: process.env.POSTGRES_PASSWORD,
    port: Number(process.env.POSTGRES_PORT),
    synchronize: false,
    logging: true,
    type: "postgres",
    username: process.env.POSTGRES_USER,
    namingStrategy: new SnakeNamingStrategy(),
    migrations: ["dist/migrations/*.js"],
    cli: {
      migrationsDir: "src/migrations"
    }
  }
};

const getRDBMSConfig = (env?: string): PostgresConnectionOptions => {

  logger.info(`Getting dbms config for ${env} environment`);
  if (env === "local") {
    // Setting default config for local deployments
    return config.production;
  }
  const configuration: PostgresConnectionOptions = config[env];

  logger.info(`Connecting to database:${configuration.database} ********* schema:${configuration.schema}`);
  return configuration;
};

const rdbmsConfig: PostgresConnectionOptions = getRDBMSConfig(process.env.NODE_ENV);
export = rdbmsConfig;
