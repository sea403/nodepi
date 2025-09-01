import { env } from "./config/env";
import app from "./app";
import { logger } from "./config/logger";

app.listen(env.PORT, () => {
  logger.info(`Server running on http://localhost:${env.PORT}`);
  logger.info(`Docs at http://localhost:${env.PORT}/docs`);
});
