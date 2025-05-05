import nodemailer from "nodemailer";
import serverConfig from "../config.js";

const transporter = nodemailer.createTransport({
  host: serverConfig.mailer.host,
  port: serverConfig.mailer.port,
  auth: {
    user: serverConfig.mailer.user,
    pass: serverConfig.mailer.password,
  },
});

export default transporter;
