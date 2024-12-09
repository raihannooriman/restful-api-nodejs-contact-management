import { web } from "./app/web.js";
import { logger } from "./app/logging.js";

web.listen(3000, () => {
  logger.info('Server is running on port 3000');
});