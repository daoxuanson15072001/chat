import { Controller, Get, Post, Request  , Body, UseGuards, Put, Param, ParseIntPipe} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwtAuth.guard';
import { CreateUserDto, updateUserDto } from './user.dto';
import { UserService } from './user.service';


@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(JwtAuthGuard)
  @Get('/profile')
  async getProfile(@Request() req) {
    return this.userService.getUserById(req.user?.userId);
  }

  @Post('/')
  async createUser(@Body() body : CreateUserDto) {
    return this.userService.createUser(body)
  }

  @Put('/:userId')
  async updateUser(@Body() body : updateUserDto , @Param('userId' , ParseIntPipe) userId : number) {
    return this.userService.updateUser(userId , body);
  }
}
