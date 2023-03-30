import {
  Controller,Post,Body
} from '@nestjs/common';
import { MessageService } from './message.service';

@Controller('message')
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @Post('')
  createMessage(@Body() body) {
    return this.messageService.createMessage(body)
  }
}
