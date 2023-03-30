import { Module } from '@nestjs/common';
import { RoomService } from './room.service';
import { RoomController } from './room.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import Room from 'src/database/entities/Room';
import User from 'src/database/entities/User';
import { UserRoom } from 'src/database/entities/UserRoom';
import { MongooseModule } from '@nestjs/mongoose';
import { Message, MessageSchema } from 'src/database/entities/chat/Message';

@Module({
  imports: [
    TypeOrmModule.forFeature([Room, User, UserRoom]),
    MongooseModule.forFeature([{ name: Message.name, schema: MessageSchema }]),
  ],
  controllers: [RoomController],
  providers: [RoomService],
})
export class RoomModule {}
