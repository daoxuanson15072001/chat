import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  Request,
  UseGuards,
  Query,
} from '@nestjs/common';
import { RoomService } from './room.service';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { JwtAuthGuard } from '../auth/jwtAuth.guard';
import { ChatHistoryDto } from './dto/chat-history.dto';
import { assignPaging } from 'src/utils/helper';

@Controller('room')
export class RoomController {
  constructor(private readonly roomService: RoomService) {}

  @UseGuards(JwtAuthGuard)
  @Get('/list')
  getListRoomSended(@Request() req, @Query() query) {
    return this.roomService.getListRoomSended(req.user?.userId, query);
  }

  @Post()
  create(@Body() createRoomDto: CreateRoomDto) {
    return this.roomService.create(createRoomDto);
  }

  @Get()
  findAll() {
    return this.roomService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.roomService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRoomDto: UpdateRoomDto) {
    return this.roomService.update(+id, updateRoomDto);
  }

  @Post(':roomId/add-user')
  addUserToRoom(@Body() body, @Param('roomId', ParseIntPipe) roomId: number) {
    return this.roomService.addUserToRoom(body?.userIds, roomId);
  }

  @Get(':roomId/history')
  getChatHistory(
    @Param('roomId', ParseIntPipe) roomId: number,
    @Query() query: ChatHistoryDto,
  ) {
    assignPaging(query);
    return this.roomService.getChatHistory(roomId, query);
  }

  @Get(':roomId/last-message')
  getLastMessage(@Param('roomId', ParseIntPipe) roomId: number) {
    return this.roomService.getLastMessage(roomId);
  }
}
