import { Body, Controller, Post, Res, HttpStatus } from '@nestjs/common';
import { DesignsService } from './designs.service';
import type { Response } from 'express';

@Controller('designs')
export class DesignsController {
  constructor(private readonly designsService: DesignsService) {}

  @Post('upload')
  async uploadDesign(@Body() body: any, @Res() res: Response) {
    // Validar datos mínimos
    if (!body.image || !body.clientName || !body.clientContact) {
        return res.status(HttpStatus.BAD_REQUEST).json({ 
            ok: false, 
            message: 'Faltan datos (imagen, nombre o contacto)' 
        });
    }

    try {
        console.log(`Recibiendo diseño de: ${body.clientName}`); // Log para trazar en Render

        const result = await this.designsService.sendDesignByEmail({
            image: body.image,
            clientName: body.clientName,
            clientContact: body.clientContact,
            clientMessage: body.clientMessage,
            logoFrente: body.logoFrente,
            logoDorso: body.logoDorso
        });
        return res.status(HttpStatus.OK).json(result);
    } catch (error) {
        // IMPORTANTE: Esto imprimirá el error real en los logs de Render
        console.error('ERROR EN CONTROLLER:', error); 
        
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ 
            ok: false, 
            message: 'Error al procesar el envío. Revise los logs del servidor.' 
        });
    }
  }
}