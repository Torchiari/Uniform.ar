import { Body, Controller, Post } from '@nestjs/common';
import { MailService } from './mail.service';

export interface ContactFormDto {
  empresa: string;
  contacto: string;
  empleados: string;
  indumentaria: string;
  mensaje: string;
}

@Controller('mail')
export class MailController {
  constructor(private readonly mailService: MailService) {}

  @Post('contact')
  async sendContact(@Body() body: ContactFormDto) {
    return this.mailService.sendContactEmail(body);
  }
}