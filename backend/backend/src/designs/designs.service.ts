import { Injectable } from '@nestjs/common';
import { Resend } from 'resend';

@Injectable()
export class DesignsService {
  
  async sendDesignByEmail(data: { image: string; clientName: string; clientContact: string; clientMessage?: string }) {
    
    const resend = new Resend(process.env.RESEND_API_KEY);

    // 1. Procesamiento de imagen (igual que antes)
    let imageBuffer: Buffer;
    try {
        const base64Data = data.image.replace(/^data:image\/\w+;base64,/, "");
        imageBuffer = Buffer.from(base64Data, 'base64');
    } catch (error) {
        console.error("Error convirtiendo base64:", error);
        throw new Error("La imagen enviada no es válida");
    }

    // 2. DETECCIÓN INTELIGENTE: ¿Es email o teléfono?
    // Solo ponemos 'replyTo' si el contacto tiene una arroba (@). Si es teléfono, lo dejamos vacío.
    const isEmail = data.clientContact && data.clientContact.includes('@');
    const replyToAddress = isEmail ? data.clientContact : undefined;

    try {
      const response = await resend.emails.send({
        from: 'onboarding@resend.dev', 
        to: process.env.CONTACT_EMAIL as string,
        
        // CORRECCIÓN AQUÍ: Solo se llena si es un email válido
        replyTo: replyToAddress, 

        subject: `Nuevo Diseño (Frente y Dorso) - Cliente: ${data.clientName}`,
        html: `
          <div style="font-family: Arial, sans-serif; color: #333; padding: 20px;">
              <h2 style="color: #745968;">Nuevo Diseño Recibido</h2>
              <p>Un cliente ha diseñado una prenda (Vista Frente y Dorso).</p>
              <hr style="border: 1px solid #eee;" />
              
              <h3>Datos del Cliente:</h3>
              <p><strong>Nombre:</strong> ${data.clientName}</p>
              <p><strong>Contacto:</strong> ${data.clientContact}</p>
              ${!isEmail ? '<p style="color: #d9534f; font-size: 0.9em;">(El contacto parece ser un teléfono, contactar por WhatsApp)</p>' : ''}
              
              <div style="background-color: #f9f9f9; padding: 10px; border-radius: 5px; margin: 15px 0;">
                <strong>Mensaje:</strong><br/>
                ${data.clientMessage || 'Sin mensaje adicional'}
              </div>
              
              <hr style="border: 1px solid #eee;" />
              <p><em>Se adjunta la imagen panorámica del diseño.</em></p>
          </div>
        `,
        attachments: [
          {
            filename: `diseno_completo_${Date.now()}.png`,
            content: imageBuffer,
          },
        ],
      });

      if (response.error) {
          console.error('Error devuelto por Resend:', response.error);
          throw new Error(response.error.message);
      }

      return { ok: true, message: 'Diseño enviado correctamente' };
      
    } catch (error) {
      console.error('Error enviando email:', error);
      throw new Error('Falló el envío del correo');
    }
  }
}