import { Entity, Column, PrimaryColumn } from 'typeorm';

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
}