import envConfig from "./config/envConfig.js";
const { port } = envConfig;

import server from "./server.js";

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
