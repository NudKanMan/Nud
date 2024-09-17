import { Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity({ name: 'activities' })
export class Activity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column({ nullable: true })
    description: string;

    @Column()
    ownerId: number;

    @Column({ nullable: true })
    start_date: Date;

    @Column({ nullable: true })
    end_date: Date;

    // @Column('json')
    // participantIds: number[] = [];
}
