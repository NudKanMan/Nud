import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
  Column,
} from 'typeorm';
import { User } from './user.entity';

@Entity('friends')
export class Friends {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, (user) => user.id)
  user: User;

  @Column({ unique: true })
  userId: string;

  @ManyToOne(() => User, (user) => user.id)
  friend: User;

  @Column({ unique: true })
  friendId: string;

  @CreateDateColumn()
  createdAt: Date;
}
