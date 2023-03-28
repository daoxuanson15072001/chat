import { LiteralObject } from '@nestjs/common';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

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

  @Prop({ type: mongoose.Schema.Types.Mixed })
  payload: LiteralObject;
}

export const MessageSchema = SchemaFactory.createForClass(Message).set(
  'timestamps',
  true,
);
