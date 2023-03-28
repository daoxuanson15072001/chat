import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose/dist';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './app/auth/auth.module';
import { MessageModule } from './app/message/message.module';
import { dataSourceOptions } from './database/data-source';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './app/user/user.module';

require('dotenv').config();
@Module({
  imports: [
    TypeOrmModule.forRoot(dataSourceOptions),
    MongooseModule.forRoot('mongodb://localhost:27017/chat'),
    MessageModule,
    AuthModule,
    UserModule,
    ConfigModule.forRoot({ isGlobal: true }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
