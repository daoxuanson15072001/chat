import { Module } from '@nestjs/common';
import { RoomService } from './room.service';
import { RoomController } from './room.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import Room from 'src/database/entities/Room';
import User from 'src/database/entities/User';
import { UserRoom } from 'src/database/entities/UserRoom';

@Module({
  imports :[TypeOrmModule.forFeature([Room , User , UserRoom])],
  controllers: [RoomController],
  providers: [RoomService]
})
export class RoomModule {}
