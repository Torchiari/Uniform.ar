import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import type { Options } from 'nodemailer/lib/smtp-transport';

@Injectable()
export class DesignsService {
  
  async sendDesignByEmail(data: { image: string; clientName: string; clientContact: string; clientMessage?: string }) {
    
    // 1. Configurar el transporte
    const transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      port: Number(process.env.MAIL_PORT),
      secure: false,
      auth: {
        user: process.env.MAIL_USER, 
        pass: process.env.MAIL_PASS, 
      },
      // Configuraciones para evitar el Timeout en Render
      tls: {
        rejectUnauthorized: false,
      },
      family: 4, // Forzar IPv4
      connectionTimeout: 10000, 
      greetingTimeout: 10000,   
    } as Options);

    // 2. Limpiar base64
    // (Asegúrate de que 'data.image' no sea undefined antes de hacer replace, por seguridad)
    const base64Data = data.image ? data.image.replace(/^data:image\/png;base64,/, '') : '';
    const imageBuffer = Buffer.from(base64Data, 'base64');

    // 3. Configurar el correo
    const mailOptions = {
      from: `"Simulador Web" <${process.env.MAIL_USER}>`,
      to: process.env.CONTACT_EMAIL,
      subject: `Nuevo Diseño de Uniforme - Cliente: ${data.clientName}`,
      html: `
        <div style="font-family: Arial, sans-serif; color: #333;">
            <h2 style="color: #4a3840;">Nuevo Diseño Recibido</h2>
            <p>Un cliente ha diseñado una prenda en el simulador web.</p>
            <hr />
            <h3>Datos del Cliente:</h3>
            <p><strong>Nombre:</strong> ${data.clientName}</p>
            <p><strong>Contacto:</strong> ${data.clientContact}</p>
            <p><strong>Mensaje:</strong> ${data.clientMessage || 'Sin mensaje adicional'}</p>
            <hr />
            <p><em>Se adjunta la imagen del diseño a este correo.</em></p>
        </div>
      `,
      attachments: [
        {
          filename: `diseno_${Date.now()}.png`,
          content: imageBuffer,
          contentType: 'image/png',
        },
      ],
    };

    // 4. Enviar
    try {
      await transporter.sendMail(mailOptions);
      return { ok: true, message: 'Diseño enviado correctamente por correo' };
    } catch (error) {
      console.error('Error enviando email:', error);
      throw new Error('Falló el envío del correo');
    }
  }
}