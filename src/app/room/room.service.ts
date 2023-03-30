import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { InjectRepository } from '@nestjs/typeorm';
import { Model } from 'mongoose';
import { Message, MessageDocument } from 'src/database/entities/chat/Message';
import Room from 'src/database/entities/Room';
import User from 'src/database/entities/User';
import { UserRoom } from 'src/database/entities/UserRoom';
import { CommonStatus } from 'src/enums/enum';
import { In, Repository } from 'typeorm';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';

@Injectable()
export class RoomService {
  constructor(
    @InjectRepository(Room) private readonly roomRepository: Repository<Room>,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(UserRoom)
    private readonly userRoomRepository: Repository<UserRoom>,
    @InjectModel(Message.name) private messageModel: Model<MessageDocument>,
  ) {}
  async create(params: CreateRoomDto) {
    await this.roomRepository.insert({ ...params });
  }

  async findAll() {
    return await this.roomRepository.find();
  }

  async findOne(id: number) {
    return await this.roomRepository.findOne({ where: { id } });
  }

  async update(id: number, updateRoomDto: UpdateRoomDto) {
    await this.roomRepository.update({ id }, { ...updateRoomDto });
  }

  async addUserToRoom(userIds: number[], roomId: number) {
    const userActive = await this.userRepository.find({
      where: {
        id: In(userIds),
        status: CommonStatus.ACTIVE,
      },
    });
    const userIdsActive = userActive.map((item) => ({
      userId: item.id,
      roomId,
    }));
    await this.userRoomRepository.save(userIdsActive);
    return true;
  }

  async getListRoomSended(userId: number) {
    const listMessagebyRoom = await this.messageModel.aggregate([
      { $match: { senderId: userId } },
      { $sort: { createdAt: 1 } },
      {
        $group: {
          _id: '$roomId',
          content: { $last: '$content' },
          time: { $last: '$createdAt' },
        },
      },
    ]);
    const roomIds = listMessagebyRoom.map((item) => item?._id);
    const room = await this.roomRepository.find({ where: { id: In(roomIds) } });
    return room.map((item) => {
      const content = listMessagebyRoom.find((ms) => ms._id === item.id);
      return {
        ...item,
        ...content,
      };
    });
  }

  async getChatHistory(roomId: number) {
    return this.messageModel.find({ roomId }).sort({ createdAt: -1 });
  }
}
