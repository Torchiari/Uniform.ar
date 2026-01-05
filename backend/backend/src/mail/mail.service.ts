import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailService {
  private transporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: Number(process.env.MAIL_PORT),
    secure: true, 
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS,
    },
  });

  async sendContactEmail(data: any) {
    await this.transporter.sendMail({

      from: `"Uniformar Web" <${process.env.MAIL_USER}>`, 
      
      to: process.env.CONTACT_EMAIL,

      replyTo: data.contacto, 

      subject: `Presupuesto Uniformar: ${data.empresa}`,
      html: `
        <h3>Nuevo pedido de presupuesto</h3>
        <ul>
          <li><strong>Empresa:</strong> ${data.empresa}</li>
          <li><strong>Contacto:</strong> ${data.contacto}</li>
          <li><strong>Empleados:</strong> ${data.empleados}</li>
          <li><strong>Indumentaria:</strong> ${data.indumentaria}</li>
        </ul>
        <p><strong>Mensaje:</strong><br/>${data.mensaje}</p>
      `,
    });

    return { ok: true, message: 'Enviado' };
  }
}