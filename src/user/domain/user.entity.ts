import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('user')
export class UserEntity {
  @PrimaryColumn({ name: 'email', length: 25 })
  email!: string;

  @Column({ name: 'password', length: 60 })
  password!: string;

  @Column({ name: 'is_suspended', default: false })
  isSuspended!: boolean;
}
