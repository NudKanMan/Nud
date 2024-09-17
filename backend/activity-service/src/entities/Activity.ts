import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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

  @Column({ nullable: true })
  start_date: Date;

  @Column({ nullable: true })
  end_date: Date;

  // @Column('json')
  // participantIds: number[] = [];
}
