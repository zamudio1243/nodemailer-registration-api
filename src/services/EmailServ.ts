import nodemailer, { Transporter, TransportOptions } from "nodemailer";
import {
  EMAIL_HOST,
  EMAIL_PASS,
  EMAIL_PORT,
  EMAIL_USER,
  PORT,
} from "../utilis/constants.js";
import mjml2html from "mjml";
import { ConfirmEmailData, EmailType } from "../types/EmailTypes.js";

export class EmailServ {
  static instance: EmailServ;
  transporter: Transporter;
  constructor() {
    if (EmailServ.instance) {
      return EmailServ.instance;
    }
    EmailServ.instance = this;
  }

  createConnection() {
    this.transporter = nodemailer.createTransport({
      host: EMAIL_HOST,
      port: Number(EMAIL_PORT),
      secure: true,
      auth: {
        user: EMAIL_USER,
        pass: EMAIL_PASS,
      },
    });
  }

  async sendMail<T extends EmailType>(
    email: string,
    type: T,
    data: T extends EmailType.CONFIRM ? ConfirmEmailData : never
  ) {
    if (!this.transporter) {
      this.createConnection();
    }
    switch (type) {
      case EmailType.CONFIRM:
        const mailOptions = {
          from: EMAIL_USER,
          to: email,
          subject: "Email Confirmation",
          html: this.htmlEmailConfirm(data.token, data.fullHost),
        };

        return await this.transporter
          .sendMail(mailOptions)
          .then((info: any) => {
            console.log("Email sent: " + info.response);
          });
    }
  }

  htmlEmailConfirm(token: string, fullHost: string) {
    const mjml = `
    <mjml>
      <mj-head>
        <mj-title>Email Confirmation</mj-title>
        <mj-preview>Confirm Your Email Address</mj-preview>
        <mj-font name="Roboto" href="https://fonts.googleapis.com/css2?family=Roboto:wght@300&display=swap" />
        <mj-attributes>
          <mj-text font-family="Roboto, sans-serif" />
        </mj-attributes>
      </mj-head>
      <mj-body>
        <mj-container background-color="#f4f4f4">
          <mj-section padding-bottom="20px">
            <mj-column>
              <mj-text font-size="24px" color="#333333" align="center" padding="20px 0">
                Email Confirmation
              </mj-text>
            </mj-column>
          </mj-section>
          <mj-section>
            <mj-column>
              <mj-text font-size="16px" color="#333333" padding="0 0 20px">
                Hello,
              </mj-text>
              <mj-text font-size="16px" color="#333333">
                Thank you for registering with us. Please click the button below to confirm your email address.
              </mj-text>
            </mj-column>
          </mj-section>
          <mj-section>
            <mj-column>
              <mj-button font-size="18px" background-color="#007bff" color="#ffffff" href="${fullHost}/confirm-email/${token}">
                Confirm Email
              </mj-button>
            </mj-column>
          </mj-section>
          <mj-section>
          </mj-section>
        </mj-container>
      </mj-body>
    </mjml>
    `;
    return mjml2html(mjml).html;
  }
}
