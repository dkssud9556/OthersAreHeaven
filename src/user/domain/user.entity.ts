import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('user')
export class UserEntity {
  @PrimaryColumn({ name: 'email' })
  email!: string;

  @Column({ name: 'password' })
  password!: string;

  @Column({ name: 'is_suspended', default: false })
  isSuspended!: boolean;
}
