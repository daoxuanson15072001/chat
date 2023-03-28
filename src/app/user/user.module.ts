import { MongooseModule } from '@nestjs/mongoose/dist';
import { Module } from '@nestjs/common';
import { Message, MessageSchema } from 'src/database/entities/chat/Message';
import { TypeOrmModule } from '@nestjs/typeorm';
import User from 'src/database/entities/User';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Message.name, schema: MessageSchema }]),
    TypeOrmModule.forFeature([User]),
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
