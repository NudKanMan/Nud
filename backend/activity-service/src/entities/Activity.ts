import { Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity({name:'activities'})
export class Activity{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column({nullable: true})
    description: string;

    @Column()
    ownerId: number;

    @Column('int', {array: true, default:[]})
    participantIds: number[];
}