import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MailModule } from './mail/mail.module';
import { DesignsModule } from './designs/designs.module';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'designs_output'),
      serveRoot: '/designs', 
    }),
    MailModule, 
    DesignsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}