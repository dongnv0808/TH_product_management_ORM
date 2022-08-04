import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Books{
    @PrimaryGeneratedColumn()
    readonly id: number;

    @Column({type: "varchar"})
    name: string;

    @Column({type: "int"})
    price: number;

    @Column({type: "int"})
    quantity: number;

    @Column({type: "varchar"})
    author: string;
}