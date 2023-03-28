import { RoomType } from '../../enums/enum';
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  CreateDateColumn,
  OneToMany,
} from 'typeorm';
import { UserRoom } from './UserRoom';
@Entity('room')
export default class Room {
  @PrimaryGeneratedColumn({ name: 'id', type: 'int', unsigned: true })
  id: number;

  @Column({ name: 'username', type: 'text' })
  name: string;

  @Column({ name: 'description', type: 'text', nullable: true })
  description: string;

  @Column({
    name: 'type',
    type: 'enum',
    enum: RoomType,
    default: RoomType.PERSON,
  })
  type: number;

  @Column({
    name: 'status',
    type: 'tinyint',
    default: 1,
    comment: '0: Inactive, 1: Active.',
  })
  status: number;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp', nullable: true })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp', nullable: true })
  updatedAt: Date | null;
}
