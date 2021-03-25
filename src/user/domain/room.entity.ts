import { Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { UserEntity } from './user.entity';

@Entity('room')
export class RoomEntity {
  @PrimaryColumn({ name: 'uuid' })
  uuid!: string;

  @ManyToOne((type) => UserEntity, (user) => user.email)
  @JoinColumn({ name: 'first_user_email' })
  firstUser!: UserEntity;

  @ManyToOne((type) => UserEntity, (user) => user.email)
  @JoinColumn({ name: 'second_user_email' })
  secondUser!: UserEntity;
}
