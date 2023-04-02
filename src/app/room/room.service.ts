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
import { CreateRoomDto, ListRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { ChatHistoryDto } from './dto/chat-history.dto';
import { returnPaging } from 'src/utils/helper';

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

  async getListRoomSended(userId: number, params: ListRoomDto) {
    const queryBuilder = this.roomRepository
      .createQueryBuilder('r')
      .leftJoinAndMapMany('r.userRoom', UserRoom, 'ur', 'ur.roomId = r.id')
      .where('ur.userId = :userId', { userId });
    if (params?.keyword) {
      queryBuilder.andWhere('LOWER(r.name) LIKE :keyword', {
        keyword: `%${params.keyword.toLowerCase()}%`,
      });
    }
    const listRoom = await queryBuilder.getMany();
    const infoListRoom = await Promise.all(
      listRoom.map(async (item) => {
        const lastMessageByRoomId = await this.messageModel.aggregate([
          { $match: { roomId: item?.id } },
          { $sort: { createdAt: -1 } },
          { $limit: 1 },
        ]);
        return {
          ...item,
          lastMessage: lastMessageByRoomId?.[0],
        };
      }),
    );
    return infoListRoom.sort(
      (a, b) => b?.lastMessage?.['createdAt'] - a?.lastMessage?.['createdAt'],
    );
    // const listMessagebyRoom = await this.messageModel.aggregate([
    //   { $match: { senderId: userId } },
    //   { $sort: { createdAt: 1 } },
    //   {
    //     $group: {
    //       _id: '$roomId',
    //       content: { $last: '$content' },
    //       time: { $last: '$createdAt' },
    //     },
    //   },
    // ]);
    // const roomIds = listMessagebyRoom.map((item) => item?._id);
    // const room = await this.roomRepository.find({ where: { id: In(roomIds) } });
    // return room.map((item) => {
    //   const content = listMessagebyRoom.find((ms) => ms._id === item.id);
    //   return {
    //     ...item,
    //     ...content,
    //   };
    // });
  }

  async getLastMessage(roomId: number) {
    const lastMessageByRoomId = await this.messageModel.aggregate([
      { $match: { roomId: roomId } },
      { $sort: { createdAt: -1 } },
      { $limit: 1 },
    ]);
    return lastMessageByRoomId;
  }

  async getChatHistory(roomId: number, params: ChatHistoryDto) {
    const data = await this.messageModel
      .find({ roomId })
      .skip(params.skip)
      .limit(params.take)
      .sort({ createdAt: -1 });
    const totalItems = await this.messageModel.count();
    return returnPaging(data, totalItems, params);
  }
}
