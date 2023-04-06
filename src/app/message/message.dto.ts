export class CreateMessageDto {
  senderId: number;
  senderType?: number;
  messageType?: number;
  content: string;
  roomId: number;
}
