import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity({ name: 'Users' })
export class User {
  @PrimaryColumn({ type: 'bigint' })
  id: bigint;

  @Column({ nullable: false })
  nickname: string;

  @Column({ nullable: true })
  email: string;
}
