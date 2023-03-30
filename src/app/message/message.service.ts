import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { InjectRepository } from '@nestjs/typeorm';
import { Model } from 'mongoose';
import { Message, MessageDocument } from 'src/database/entities/chat/Message';
import User from 'src/database/entities/User';
import { UserRoom } from 'src/database/entities/UserRoom';
import { Repository } from 'typeorm';
import { CreateMessageDto } from './message.dto';

@Injectable()
export class MessageService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectModel(Message.name) private messageModel: Model<MessageDocument>,
    @InjectRepository(UserRoom) private readonly userRoomRepository: Repository<UserRoom>,
  ) {}

  async createMessage(params: CreateMessageDto) {
    const message = await this.messageModel.create({ ...params });
    return message;
  }
}
