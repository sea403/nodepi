import express from "express";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import routes from "./routes";
import { errorHandler } from "./errors/errorHandler";
import { logger } from "./config/logger";
import swaggerUi from 'swagger-ui-express';
import { getSwaggerSpec } from './docs/swagger';

const app = express();

app.use(cors());
app.use(helmet());
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/health", (_req, res) => res.json({ ok: true }));
app.use("/api", routes);
const spec = getSwaggerSpec();

app.use('/docs', swaggerUi.serve, swaggerUi.setup(spec, {
  explorer: true,
  customSiteTitle: 'NodePI Docs',
}));
// app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
// app.use('/docs', swaggerUi.serve, swaggerUi.setup(getSwaggerSpec()));
// app.use('/docs', (_req, res, next) => {
//   // build on-demand so edits don’t crash boot
//   const spec = getSwaggerSpec();
//   return swaggerUi.serve[0](_req, res, () =>
//     swaggerUi.setup(spec)(_req, res, next)
//   );
// });


app.use(errorHandler);

process.on("unhandledRejection", (e) => {
  logger.error({ e }, "unhandledRejection");
});

export default app;
