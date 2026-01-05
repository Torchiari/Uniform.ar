import { Injectable } from '@nestjs/common';
import { Resend } from 'resend';

@Injectable()
export class MailService {
  
  async sendContactEmail(data: any) {
    // 1. Inicializamos Resend con la clave de las variables de entorno
    const resend = new Resend(process.env.RESEND_API_KEY);

    try {
      // 2. Enviamos el correo
      const response = await resend.emails.send({
        // IMPORTANTE: En el plan gratis, SIEMPRE usa este remitente:
        from: 'onboarding@resend.dev', 
        
        // A dónde llega (tu correo configurado en Render)
        to: process.env.CONTACT_EMAIL as string,

        // Truco Pro: Cuando le des "Responder" en tu Gmail, le responderá al cliente
        replyTo: data.contacto, 

        subject: `Presupuesto Uniformar: ${data.empresa}`,
        html: `
          <div style="font-family: Arial, sans-serif; color: #333; padding: 20px;">
            <h2 style="color: #745968;">Nuevo Pedido de Presupuesto</h2>
            <hr style="border: 1px solid #eee;" />
            
            <p><strong>Empresa:</strong> ${data.empresa}</p>
            <p><strong>Contacto:</strong> ${data.contacto}</p>
            <p><strong>Empleados:</strong> ${data.empleados}</p>
            
            <div style="background-color: #f9f9f9; padding: 10px; border-radius: 5px; margin: 10px 0;">
              <strong>Indumentaria de interés:</strong><br/>
              ${data.indumentaria}
            </div>

            <hr style="border: 1px solid #eee;" />
            <h3>Mensaje Adicional:</h3>
            <p style="white-space: pre-wrap;">${data.mensaje}</p>
          </div>
        `,
      });

      if (response.error) {
        console.error("Error devuelto por Resend:", response.error);
        throw new Error(response.error.message);
      }

      return { ok: true, message: 'Enviado con éxito' };
      
    } catch (error) {
      console.error('Error enviando contacto:', error);
      // Esto hará que el Frontend reciba un error y muestre el mensaje rojo si algo falla
      throw new Error('Error al enviar el correo');
    }
  }
}