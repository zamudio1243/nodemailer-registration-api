import nodemailer, { Transporter, TransportOptions } from "nodemailer";
import {
  EMAIL_HOST,
  EMAIL_PASS,
  EMAIL_PORT,
  EMAIL_USER,
} from "../utilis/constants.js";

export class EmailServ {
  static instance: EmailServ;
  transporter: Transporter<unknown>;
  constructor() {
    if (EmailServ.instance) {
      return EmailServ.instance;
    }
    this.transporter = nodemailer.createTransport({
      host: EMAIL_HOST,
      port: Number(EMAIL_PORT),
      secure: false,
      auth: {
        user: EMAIL_USER,
        pass: EMAIL_PASS,
      },
    });
    EmailServ.instance = this;
  }

  sendMail(email: string, token: string, serv: { host: string; port: number }) {
    const mailOptions = {
      from: EMAIL_USER,
      to: email,
      subject: "Token validation",
      html: `<h1>Recuperación de contraseña</h1>
      <p>Para recuperar tu contraseña, haz click en el siguiente enlace: <a href="${serv.host}:${serv.port}/reset-password/${token}">Recuperar contraseña</a></p>`,
    };

    this.transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        console.log(err);
        return err;
      }
      console.log(info);
      return info;
    });
  }
}
