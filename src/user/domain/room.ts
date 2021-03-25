import { Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { User } from './user';

@Entity('room')
export class Room {
  @PrimaryColumn({ name: 'uuid' })
  uuid!: string;

  @ManyToOne((type) => User, (user) => user.email)
  @JoinColumn({ name: 'first_user_email' })
  firstUser!: User;

  @ManyToOne((type) => User, (user) => user.email)
  @JoinColumn({ name: 'second_user_email' })
  secondUser!: User;
}
