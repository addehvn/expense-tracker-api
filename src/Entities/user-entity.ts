import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('users')
export class User{
  @PrimaryGeneratedColumn()
  Id:number

  @Column()
  username:string
  @Column()
  email:string 
  @Column()
  password:string
  @CreateDateColumn()
  created_at:Date
  @UpdateDateColumn()
  updated_at:Date 

}