import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { User } from "./user-entity";


@Entity('accounts')
export class Accounts{
  @PrimaryGeneratedColumn()
  accountId:number

  @ManyToOne(()=>User,{
    onDelete:"CASCADE"
  })
  @JoinColumn({name:'userId'})
  user:User

  @Column({type:'varchar'})
  name:string 

  @Column({type:'decimal',precision:12,scale:2,default:0})
  balance:number

  @CreateDateColumn()
  created_at:Date

  @UpdateDateColumn()
  updated_at:Date

}