import { Module } from '@nestjs/common';
import config from './config';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { ReportModule } from './report/report.module';
import { ChatModule } from './chat/chat.module';
import { AuthModule } from './auth/auth.module';
import { MorganInterceptor, MorganModule } from 'nest-morgan';
import { APP_INTERCEPTOR } from '@nestjs/core';

@Module({
  imports: [
    MongooseModule.forRoot(config.database.url),
    UserModule,
    ReportModule,
    ChatModule,
    AuthModule,
    MorganModule,
  ],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: MorganInterceptor('dev'),
    },
  ],
})
export class AppModule {}
