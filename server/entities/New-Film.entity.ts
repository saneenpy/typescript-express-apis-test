import {
    BaseEntity,
    Entity,
    Column,
    PrimaryGeneratedColumn
} from 'typeorm';

@Entity('film')
export class Film extends BaseEntity {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column({
        name: 'releaseDate'
    })
    releaseDate!: string;

    @Column({
        name: 'title'
    })
    title!: string;

    @Column({
        type: 'simple-array',
        default: []
    })
    characters!: string[];

}
