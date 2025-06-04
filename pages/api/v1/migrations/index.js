import controller from "infra/controller.js";
import migrator from "models/migrator";
import { createRouter } from "next-connect";

const router = createRouter();

router.get(getHandler);
router.post(postHandler);

export default router.handler(controller.errorHandlers);

async function getHandler(request, response) {
  const pedingMigrations = await migrator.listPendingMigrations();
  return response.status(200).json(pedingMigrations);
}

async function postHandler(request, response) {
  const migratedMigrations = await migrator.runPendingMigrations();

  if (migratedMigrations.length > 0) {
    response.status(201).json(migratedMigrations);
  }

  response.status(200).json(migratedMigrations);
}
