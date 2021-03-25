import { Entity, JoinColumn, OneToOne, PrimaryColumn } from 'typeorm';
import { Room } from '../../user/domain/room';
import { User } from '../../user/domain/user';

@Entity('report')
export class Report {
  @PrimaryColumn()
  @OneToOne((type) => Room, (room) => room.uuid)
  @JoinColumn({ name: 'room_uuid' })
  roomUuid!: string;

  @OneToOne((type) => User, (user) => user.email)
  @JoinColumn({ name: 'suspect_email' })
  user!: User;
}
