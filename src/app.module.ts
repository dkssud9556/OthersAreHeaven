import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import config from './config';
import { UserModule } from './user/user.module';
import { ReportModule } from './report/report.module';
import { ChatModule } from './chat/chat.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: config.database.host,
      port: config.database.port,
      username: config.database.username,
      password: config.database.password,
      database: config.database.database,
      entities: config.database.entities,
      synchronize: config.database.synchronize,
    }),
    UserModule,
    ReportModule,
    ChatModule,
    AuthModule,
  ],
})
export class AppModule {}
