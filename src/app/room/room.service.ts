import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
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
}
