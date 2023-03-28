import { Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import Room from './Room';
import User from './User';

@Entity('user_room')
export class UserRoom {
  @PrimaryColumn({ name: 'room_id', type: 'int', unsigned: true })
  roomId: number;

  @PrimaryColumn({ name: 'user_id', type: 'int', unsigned: true })
  userId: number;

  @ManyToOne(() => Room)
  @JoinColumn({ name: 'room_id' })
  room: Room;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;
}
