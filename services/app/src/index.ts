const server = require("@/server");
import config from "@config/index";

// サーバーリッスン
const port = config.server.port;
server.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
