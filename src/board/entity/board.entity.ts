import { Board_Res } from 'src/dto/reponse';
import { board_create_reponse_dto } from 'src/dto/board.create.reponse';
import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn, ManyToOne, OneToMany } from 'typeorm';
import { User_ } from '../../user/entity/user.entity';

@Entity({
  database: 'second',
})
export class Board_{
    @PrimaryGeneratedColumn()
    number: number;

    @Column()
    title: string;

    @Column()
    description: string;

    @Column()
    createdAt: Date;

    @ManyToOne(() => User_, { onDelete: 'CASCADE' })
    user: User_;

    constructor(){
        this.createdAt = new Date();
    }

    setter(dto: board_create_reponse_dto){
    this.title = dto.title;
    this.description = dto.description;
    }
}