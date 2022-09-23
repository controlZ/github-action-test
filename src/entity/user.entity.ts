import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity({name: 'Users'})
export class User{
    @PrimaryColumn()
    id: number;

    @Column({nullable:false})
    nickname: string;

    @Column({nullable:true})
    email: string;

    @Column({nullable:true})
    comment: string;
}