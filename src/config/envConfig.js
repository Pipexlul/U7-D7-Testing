import * as dotenv from "dotenv";
dotenv.config();

const portNum = parseInt(process.env.PORT);

export default {
  port: isNaN(portNum) ? 3000 : portNum,
};
