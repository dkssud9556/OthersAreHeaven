import { Entity, JoinColumn, OneToOne, PrimaryColumn } from 'typeorm';
import { RoomEntity } from '../../user/domain/room.entity';
import { UserEntity } from '../../user/domain/user.entity';

@Entity('report')
export class ReportEntity {
  @PrimaryColumn()
  @OneToOne((type) => RoomEntity, (room) => room.uuid)
  @JoinColumn({ name: 'room_uuid' })
  roomUuid!: string;

  @OneToOne((type) => UserEntity, (user) => user.email)
  @JoinColumn({ name: 'suspect_email' })
  user!: UserEntity;
}
