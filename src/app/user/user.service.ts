import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { hash } from 'bcrypt';
import User from 'src/database/entities/User';
import { Repository } from 'typeorm';
import { CreateUserDto, updateUserDto } from './user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async getUserById(userId: number) {
    return await this.userRepository.findOne({ where: { id: userId } });
  }

  async createUser({ email, password, username }: CreateUserDto) {
    await this.userRepository.insert({
      email,
      password: await hash(password, Number(process.env.SALT)),
      username,
    });
  }

  async updateUser(userId: number, params: updateUserDto) {
    await this.userRepository.update({ id: userId }, { ...params });
  }
}
