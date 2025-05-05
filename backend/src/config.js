import { config } from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

// Get the directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load .env file
const pathToEnv = path.join(__dirname, "/../.env");
config({ path: pathToEnv });

const serverConfig = {
  serverPort: process.env.SERVER_PORT || 7070,
  corsOrigin: process.env.CORS_ORIGIN,
  nodeEnv: process.env.NODE_ENV,
  jwt: {
    accessTokenSecret: process.env.ACCESS_TOKEN_SECRET,
    refreshTokenSecret: process.env.REFRESH_TOKEN_SECRET,
  },
  mailer: {
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    user: process.env.SMTP_USER,
    password: process.env.SMTP_PASS,
    sender: process.env.SENDER_EMAIL,
  },
};

export default serverConfig;
