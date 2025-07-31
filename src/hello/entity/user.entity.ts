import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';
import { CreateUserDto_Res } from 'src/dto/reponse';

@Entity()
export class User {
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

    setter(dto: CreateUserDto_Res){
        this.id = dto.id;
        this.pw = dto.pw;
        this.name = dto.name;
        this.age = dto.age;
    }
}
