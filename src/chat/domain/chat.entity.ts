import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { RoomEntity } from '../../user/domain/room.entity';

@Entity('chat')
export class ChatEntity {
  @PrimaryGeneratedColumn({ name: 'id' })
  id!: number;

  @Column({ name: 'content' })
  content!: string;

  @Column({ name: 'sender_email' })
  senderEmail!: string;

  @ManyToOne((type) => RoomEntity, (room) => room.uuid)
  @JoinColumn({ name: 'room_uuid' })
  room!: RoomEntity;
}
