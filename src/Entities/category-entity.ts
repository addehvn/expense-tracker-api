import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Accounts } from "./account-Entity";
import { User } from "./user-entity";

@Entity('categories')
export class Category{
  @PrimaryGeneratedColumn()
  categoryId:number

  @ManyToOne(()=>Accounts,
  {onDelete:'CASCADE'})
  @JoinColumn({name:'accountId'})
  account:Accounts

  @Column()
  name:string

  @CreateDateColumn()
  created_at:Date

  @UpdateDateColumn()
  updated_at:Date
}