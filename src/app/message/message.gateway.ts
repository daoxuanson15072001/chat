import { HttpException, HttpStatus, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
} from '@nestjs/websockets';
import { ConnectedSocket } from '@nestjs/websockets/decorators';
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
} from '@nestjs/websockets/interfaces/hooks';
import { Server, Socket } from 'socket.io';
import User from 'src/database/entities/User';
import { UserService } from '../user/user.service';
import { CreateMessageDto } from './message.dto';
import { MessageService } from './message.service';
import { v4 as uuidv4 } from 'uuid';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class MessageGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  server: Server;

  private readonly logger = new Logger('chat');
  constructor(
    private readonly messageService: MessageService,
    private jwtService: JwtService,
    private userService: UserService,
  ) {}

  async getDataUserFromToken(client: Socket): Promise<User> {
    const authToken: any = client.handshake?.query?.token;
    try {
      const decoded = this.jwtService.verify(authToken);

      return await this.userService.getUserById(decoded.userId); // response to function
    } catch (ex) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }
  }

  @SubscribeMessage('createMessage')
  async create(@MessageBody() params: CreateMessageDto) {
    const message = await this.messageService.createMessage(params);
    this.server.emit('message', {
      ...params,
      _id: uuidv4(),
      createdAt: new Date().toISOString(),
    });
  }

  @SubscribeMessage('joinRoom')
  async joinRoom(@MessageBody('name') name, @ConnectedSocket() client: Socket) {
    this.server.emit('noti', `${name} ${client.id} da tham gia phong thoai`);
    return true;
  }

  afterInit(server: Server) {
    this.logger.log('Init');
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`);
  }

  handleConnection(client: Socket, ...args: any[]) {
    this.logger.log(`Client connected: ${client.id}`);
  }
}
