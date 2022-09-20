import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'Users'})
export class User{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    username: string;
}