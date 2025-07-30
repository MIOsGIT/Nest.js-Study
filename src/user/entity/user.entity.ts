import { User_Res } from 'src/dto/reponse';
import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Board_ } from '../../board/entity/board.entity';

@Entity({
    database: 'second',
})
export class User_{
    @PrimaryColumn()
    id: string;

    @Column()
    pw: string;

    @Column()
    name: string;

    @Column()
    age: number;

    @Column({ default: true })
    isActive: boolean;

    @Column()
    createdAt: Date;

    constructor(){
        this.isActive = true;
        this.createdAt = new Date();
    }

    setter(dto: User_Res){
            this.id = dto.id;
            this.pw = dto.pw;
            this.name = dto.name;
            this.age = dto.age;
        }

    @OneToMany(() => Board_, (board) => board.user)
    boards: Board_[];
}