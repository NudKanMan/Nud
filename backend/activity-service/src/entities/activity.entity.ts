import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ActivityParticipant } from './activity-participant.entity';
import { ActivityStatus } from 'src/constants/enum';

@Entity({ name: 'activities' })
export class Activity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column({ nullable: true })
  description: string;

  @Column()
  ownerId: string;

  @Column()
  maxParticipants: number;

  @Column('date')
  startDate: Date;

  @Column('date')
  endDate: Date;

  @Column({ default: 0 })
  currentParticipants: number;

  @Column({ type: 'enum', enum: ActivityStatus, default: ActivityStatus.OPEN })
  status: ActivityStatus;

  @OneToMany(() => ActivityParticipant, (participant) => participant.activity)
  participants: ActivityParticipant[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
