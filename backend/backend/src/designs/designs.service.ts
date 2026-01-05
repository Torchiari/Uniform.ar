import { Injectable } from '@nestjs/common';
import { Resend } from 'resend'; // Importamos la nueva librería

@Injectable()
export class DesignsService {
  
  async sendDesignByEmail(data: { image: string; clientName: string; clientContact: string; clientMessage?: string }) {
    
    // 1. Inicializar Resend con la clave (que pondremos en Render)
    const resend = new Resend(process.env.RESEND_API_KEY);

    // 2. Preparar el buffer de la imagen
    const base64Data = data.image ? data.image.replace(/^data:image\/png;base64,/, '') : '';
    const imageBuffer = Buffer.from(base64Data, 'base64');

    // 3. Enviar el correo usando la API (¡Adiós SMTP!)
    try {
      const response = await resend.emails.send({
        // IMPORTANTE: En modo prueba solo puedes enviar desde este correo:
        from: 'onboarding@resend.dev', 
        
        // A dónde llega (tu correo de la variable de entorno)
        to: process.env.CONTACT_EMAIL as string, 
        
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
          },
        ],
      });

      if (response.error) {
          console.error('Error de Resend:', response.error);
          throw new Error(response.error.message);
      }

      return { ok: true, message: 'Diseño enviado correctamente por Resend' };
      
    } catch (error) {
      console.error('Error enviando email:', error);
      throw new Error('Falló el envío del correo');
    }
  }
}