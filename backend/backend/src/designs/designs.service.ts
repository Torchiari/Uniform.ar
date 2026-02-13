import { Injectable } from '@nestjs/common';
import { Resend } from 'resend';

interface EmailData {
  image: string;
  clientName: string;
  clientContact: string;
  clientMessage?: string;
  logosFrente?: string[];
  logosDorso?: string[];
}

@Injectable()
export class DesignsService {
  
  async sendDesignByEmail(data: EmailData) {
    
    const resend = new Resend(process.env.RESEND_API_KEY);
    const isEmail = data.clientContact && data.clientContact.includes('@');
    const replyToAddress = isEmail ? data.clientContact : undefined;

    const attachments: { filename: string; content: string; contentType?: string }[] = [];

    try {
        if (data.image) {
            const content = data.image.split(',')[1] || data.image;
            attachments.push({
                filename: `diseno_completo_${Date.now()}.png`,
                content: content,
            });
        }
    } catch (e) {
        console.error("Error procesando imagen principal", e);
    }

    if (data.logosFrente && Array.isArray(data.logosFrente)) {
        data.logosFrente.forEach((logo, index) => {
            try {
                const content = logo.split(',')[1] || logo;
                attachments.push({
                    filename: `logo-frente-${index + 1}.png`,
                    content: content,
                });
            } catch (e) { console.error(`Error logo frente ${index}`, e); }
        });
    }

    if (data.logosDorso && Array.isArray(data.logosDorso)) {
        data.logosDorso.forEach((logo, index) => {
            try {
                const content = logo.split(',')[1] || logo;
                attachments.push({
                    filename: `logo-dorso-${index + 1}.png`,
                    content: content,
                });
            } catch (e) { console.error(`Error logo dorso ${index}`, e); }
        });
    }

    try {
      const response = await resend.emails.send({
        from: 'onboarding@resend.dev', 
        to: process.env.CONTACT_EMAIL as string,
        replyTo: replyToAddress, 

        subject: `Nuevo Diseño - Cliente: ${data.clientName}`,
        html: `
          <div style="font-family: Arial, sans-serif; color: #333; padding: 20px;">
              <h2 style="color: #745968;">Nuevo Diseño Recibido</h2>
              <hr style="border: 1px solid #eee;" />
              
              <h3>Datos del Cliente:</h3>
              <p><strong>Nombre:</strong> ${data.clientName}</p>
              <p><strong>Contacto:</strong> ${data.clientContact}</p>
              
              <div style="background-color: #f9f9f9; padding: 10px; border-radius: 5px; margin: 15px 0;">
                <strong>Mensaje / Detalles:</strong><br/>
                <p style="white-space: pre-wrap;">${data.clientMessage || 'Sin mensaje adicional'}</p>
              </div>
              
              <hr style="border: 1px solid #eee;" />
              
              <div style="background-color: #eef; padding: 15px; border-radius: 8px; border: 1px dashed #745968;">
                 <h3 style="margin-top:0;">📎 Archivos Adjuntos</h3>
                 <p>Se han adjuntado las imágenes del diseño.</p>
                 <ul>
                    <li>Vista completa de la prenda</li>
                    ${data.logosFrente?.length ? `<li>${data.logosFrente.length} logos para el FRENTE</li>` : ''}
                    ${data.logosDorso?.length ? `<li>${data.logosDorso.length} logos para el DORSO</li>` : ''}
                 </ul>
              </div>
          </div>
        `,
        attachments: attachments,
      });

      if (response.error) throw new Error(response.error.message);
      return { ok: true, message: 'Diseño enviado correctamente' };
      
    } catch (error) {
      console.error('Error enviando email:', error);
      throw new Error('Falló el envío del correo');
    }
  }
}