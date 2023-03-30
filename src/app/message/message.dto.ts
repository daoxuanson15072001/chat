export class CreateMessageDto {
  senderId: number;
  senderType?: number;
  content: string;
  roomId: number;
}
