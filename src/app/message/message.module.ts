import { MongooseModule } from '@nestjs/mongoose/dist';
import { Module } from '@nestjs/common';
import { Message, MessageSchema } from 'src/database/entities/chat/Message';
import { TypeOrmModule } from '@nestjs/typeorm';
import User from 'src/database/entities/User';
import { MessageController } from './message.controller';
import { MessageService } from './message.service';
import { MessageGateway } from './message.gateway';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import Room from 'src/database/entities/Room';
import { UserRoom } from 'src/database/entities/UserRoom';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Message.name, schema: MessageSchema }]),
    TypeOrmModule.forFeature([User , Room , UserRoom]),
  ],
  controllers: [MessageController],
  providers: [MessageService, MessageGateway, JwtService, UserService],
})
export class MessageModule {}
