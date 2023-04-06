import { LiteralObject } from '@nestjs/common';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { MessageType } from 'src/enums/enum';

export type MessageDocument = HydratedDocument<Message>;

@Schema()
export class Message {
  @Prop({ name: 'room_id', type: 'number', required: true })
  roomId: string;

  @Prop({ name: 'sender_id', type: 'number', required: true })
  senderId: number;

  @Prop({ name: 'sender_type', type: 'number', required: false })
  senderType: number;

  @Prop({ name: 'content', type: 'string', required: true })
  content: string;

  @Prop({ name: 'message_type', type: 'number', default: MessageType.TEXT })
  messageType: string;

  @Prop({ type: mongoose.Schema.Types.Mixed })
  payload: LiteralObject;
}

export const MessageSchema = SchemaFactory.createForClass(Message).set(
  'timestamps',
  true,
);
