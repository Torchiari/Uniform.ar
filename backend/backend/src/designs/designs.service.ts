import { Injectable } from '@nestjs/common';
import { Resend } from 'resend';

interface EmailData {
  image: string;
  clientName: string;
  clientContact: string;
  clientMessage?: string;
  logoFrente?: string;
  logoDorso?: string;
}

@Injectable()
export class DesignsService {
  
  async sendDesignByEmail(data: EmailData) {
    
    const resend = new Resend(process.env.RESEND_API_KEY);

    // Detección de contacto (Email vs Teléfono)
    const isEmail = data.clientContact && data.clientContact.includes('@');
    const replyToAddress = isEmail ? data.clientContact : undefined;

    // --- PREPARACIÓN DE ADJUNTOS ---
    // Definimos el array de adjuntos explícitamente para evitar errores de tipo
    const attachments: { filename: string; content: string; contentType?: string }[] = [];

    // 1. Adjuntar la Imagen del Diseño (Obligatoria)
    try {
        if (data.image) {
            // Limpiamos el prefijo base64 si viene
            const content = data.image.split(',')[1] || data.image;
            attachments.push({
                filename: `diseno_completo_${Date.now()}.png`,
                content: content,
            });
        }
    } catch (e) {
        console.error("Error procesando imagen principal", e);
    }

    // 2. Adjuntar Logo Frente (Opcional)
    if (data.logoFrente) {
        try {
            const content = data.logoFrente.split(',')[1] || data.logoFrente;
            attachments.push({
                filename: 'logo-frente-original.png',
                content: content,
            });
        } catch (e) { console.error("Error logo frente", e); }
    }

    // 3. Adjuntar Logo Dorso (Opcional)
    if (data.logoDorso) {
        try {
            const content = data.logoDorso.split(',')[1] || data.logoDorso;
            attachments.push({
                filename: 'logo-dorso-original.png',
                content: content,
            });
        } catch (e) { console.error("Error logo dorso", e); }
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
              ${!isEmail ? '<p style="color: #d9534f; font-size: 0.9em;">(El contacto parece ser un teléfono, contactar por WhatsApp)</p>' : ''}
              
              <div style="background-color: #f9f9f9; padding: 10px; border-radius: 5px; margin: 15px 0;">
                <strong>Mensaje / Detalles:</strong><br/>
                <p style="white-space: pre-wrap;">${data.clientMessage || 'Sin mensaje adicional'}</p>
              </div>
              
              <hr style="border: 1px solid #eee;" />
              
              <div style="background-color: #eef; padding: 15px; border-radius: 8px; border: 1px dashed #745968;">
                 <h3 style="margin-top:0;">📎 Archivos Adjuntos</h3>
                 <p>Se han adjuntado las siguientes imágenes a este correo:</p>
                 <ul>
                    <li><strong>diseno_completo_...png</strong>: Vista combinada de la prenda.</li>
                    ${data.logoFrente ? '<li><strong>logo-frente-original.png</strong>: Archivo original del logo frontal.</li>' : ''}
                    ${data.logoDorso ? '<li><strong>logo-dorso-original.png</strong>: Archivo original del logo dorsal.</li>' : ''}
                 </ul>
              </div>
          </div>
        `,
        attachments: attachments, // Pasamos el array con todos los archivos
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