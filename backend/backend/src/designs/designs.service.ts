import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import type { Options } from 'nodemailer/lib/smtp-transport';

@Injectable()
export class DesignsService {
  
  async sendDesignByEmail(data: { image: string; clientName: string; clientContact: string; clientMessage?: string }) {
    
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',  // Escrito directo para asegurar
      port: 465,               // Puerto SSL (Google lo prefiere desde servidores)
      secure: true,            // True para 465
      auth: {
        user: process.env.MAIL_USER, 
        pass: process.env.MAIL_PASS, 
      },
      tls: {
        rejectUnauthorized: false, // Ignorar problemas de certificados
      },
      // --- TRUCOS PARA EVITAR BLOQUEO ---
      family: 4,      // Forzar IPv4 (CRÍTICO en Render)
      pool: true,     // Usar conexión persistente (a Google le gusta más)
      logger: true,   // Esto nos mostrará el "chisme" completo en los logs
      debug: true,    // Esto mostrará los detalles técnicos del error
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