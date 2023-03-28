import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import User from 'src/database/entities/User';
import { Repository } from 'typeorm';
import { LoginDto } from './auth.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async login({ email, password }: LoginDto) {
    const user = await this.userRepository.findOne({ where: { email } });
    if (!user) throw Error('email not found');
    const isMatch = bcrypt.compare(password, user.password);
    if (!isMatch) throw Error('email or password does not exist');
    const payload = {
      userId: user.id,
      email: user.email,
    };
    const accessToken = this.jwtService.sign(payload, {
      secret: process.env.TOKEN_SECRET,
      expiresIn: '120s',
    });
    if (!user.refreshToken) {
      const newRefreshToken = this.jwtService.sign(payload, {
        secret: process.env.REFRESH_TOKEN_SECRET,
        expiresIn: '30d',
      });
      await this.userRepository.update(user.id, {
        refreshToken: newRefreshToken,
      });
      return { accessToken, refreshToken: newRefreshToken };
    }
    return {
      accessToken,
      refreshToken: user?.refreshToken,
    };
  }
}
