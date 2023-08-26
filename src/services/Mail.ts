import nodemailer, { Transporter } from "nodemailer";

export class MailServ {
  static instance: MailServ;
  transporter: Transporter;
  constructor() {
    if (MailServ.instance) {
      return MailServ.instance;
    }
    this.transporter = nodemailer.createTransport({
      service: "tu_proveedor_de_correo",
      auth: {
        user: "tu_correo",
        pass: "tu_contraseña",
      },
    });
    MailServ.instance = this;
  }

  sendMail(email: string, token: string) {
    const mailOptions = {
      from: "tu_correo",
      to: email,
      subject: "Token validation",
      html: `<h1>Recuperación de contraseña</h1>
      <p>Para recuperar tu contraseña, haz click en el siguiente enlace: <a href="http://localhost:3000/reset-password/${token}">Recuperar contraseña</a></p>`,
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
