
import { cleanEnv, port, str, url } from "envalid";

/**
 * Checks whether required environment variables are present for application
 */
const validateEnv = () => {
    cleanEnv(process.env, {
      PORT: port(),
      POSTGRES_DB: str(),
      POSTGRES_HOST: str(),
      POSTGRES_PASSWORD: str(),
      POSTGRES_PORT: port(),
      POSTGRES_USER: str(),
    });
  };

export { validateEnv };
