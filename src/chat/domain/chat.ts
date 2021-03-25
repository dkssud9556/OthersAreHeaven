import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Room } from '../../user/domain/room';

@Entity('chat')
export class Chat {
  @PrimaryGeneratedColumn({ name: 'id' })
  id!: number;

  @Column({ name: 'content' })
  content!: string;

  @Column({ name: 'sender_email' })
  senderEmail!: string;

  @ManyToOne((type) => Room, (room) => room.uuid)
  @JoinColumn({ name: 'room_uuid' })
  room!: Room;
}
