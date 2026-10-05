import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Category } from "./category-entity";
import { Accounts } from "./account-Entity";

@Entity('transactions')

export class Transaction{
  @PrimaryGeneratedColumn()
  transactionId:number

  @ManyToOne(()=>Category,
  {onDelete:'CASCADE'})
  @JoinColumn({name:'categoryId'})
  category:Category

  @ManyToOne(()=>Accounts,
  {onDelete:'CASCADE'})
  @JoinColumn({name:'accountId'})
  account:Accounts

  
  @Column()
  name:string 

  @Column({type:'decimal', precision:5, scale:2 , default:0})
  price:number

  @CreateDateColumn()
  created_at:Date

  @UpdateDateColumn()
  updated_at:Date
}