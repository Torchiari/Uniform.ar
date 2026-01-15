import { Injectable } from '@nestjs/common';
import { Resend } from 'resend';

@Injectable()
export class MailService { // La clase debe llamarse MailService

  // El nombre de la función debe ser sendContactEmail para que tu Controller la encuentre
  async sendContactEmail(data: any) {
    const resend = new Resend(process.env.RESEND_API_KEY);

    // Mapeo de datos (compatible con Simulador y Formulario viejo)
    const nombreCliente = data.clientName || data.empresa || 'Cliente';
    const contactoCliente = data.clientContact || data.contacto || 'Sin contacto';
    const mensajeCliente = data.clientMessage || data.mensaje || '';
    
    // Imágenes
    const imagenDiseno = data.image; 
    const logoFrente = data.logoFrente; 
    const logoDorso = data.logoDorso;   

    // --- CORRECCIÓN DE TIPOS DE ADJUNTOS ---
    const attachments: { filename: string; content: string; contentType: string }[] = [];

    // 1. Adjuntamos el Diseño Principal
    if (imagenDiseno) {
        const content = typeof imagenDiseno === 'string' ? imagenDiseno.split(',')[1] : '';
        if (content) {
            attachments.push({
                filename: 'diseno-prenda.png',
                content: content,
                contentType: 'image/png',
            });
        }
    }

    // 2. Adjuntamos Logo Frente
    if (logoFrente) {
        const content = typeof logoFrente === 'string' ? logoFrente.split(',')[1] : '';
        if (content) {
            attachments.push({
                filename: 'logo-frente-original.png',
                content: content,
                contentType: 'image/png',
            });
        }
    }

    // 3. Adjuntamos Logo Dorso
    if (logoDorso) {
        const content = typeof logoDorso === 'string' ? logoDorso.split(',')[1] : '';
        if (content) {
            attachments.push({
                filename: 'logo-dorso-original.png',
                content: content,
                contentType: 'image/png',
            });
        }
    }

    try {
      const response = await resend.emails.send({
        from: 'onboarding@resend.dev', 
        to: process.env.CONTACT_EMAIL as string,
        replyTo: contactoCliente, 
        subject: `Nuevo Diseño Uniformar: ${nombreCliente}`,
        
        html: `
          <div style="font-family: Arial, sans-serif; color: #333; padding: 20px;">
            <h2 style="color: #745968;">Nuevo Pedido de Presupuesto</h2>
            <hr style="border: 1px solid #eee;" />
            
            <p><strong>Cliente:</strong> ${nombreCliente}</p>
            <p><strong>Contacto:</strong> ${contactoCliente}</p>
            
            <div style="background-color: #f9f9f9; padding: 15px; border-radius: 5px; margin: 10px 0;">
              <strong>Detalles del Pedido:</strong><br/>
              <p style="white-space: pre-wrap;">${mensajeCliente}</p>
            </div>

            <hr style="border: 1px solid #eee;" />

            <div style="background-color: #eef; padding: 15px; border-radius: 8px; border: 1px dashed #745968;">
                <h3 style="margin-top:0;">📎 Imágenes Adjuntas</h3>
                <p>Las imágenes de alta calidad se han adjuntado a este correo:</p>
                <ul>
                    ${imagenDiseno ? '<li><strong>diseno-prenda.png</strong>: Vista completa del uniforme.</li>' : ''}
                    ${logoFrente ? '<li><strong>logo-frente-original.png</strong>: Archivo original del logo frontal.</li>' : ''}
                    ${logoDorso ? '<li><strong>logo-dorso-original.png</strong>: Archivo original del logo dorsal.</li>' : ''}
                </ul>
            </div>
          </div>
        `,
        attachments: attachments
      });

      if (response.error) {
        console.error("Error devuelto por Resend:", response.error);
        throw new Error(response.error.message);
      }

      return { ok: true, message: 'Enviado con éxito' };
      
    } catch (error) {
      console.error('Error enviando contacto:', error);
      throw new Error('Error al enviar el correo');
    }
  }
}