import {
  Column, Entity, PrimaryGeneratedColumn,
} from "typeorm";

@Entity()
export class User {

  @PrimaryGeneratedColumn("uuid")
  public id: string;

  @Column({ nullable: true })
  public name: string;

  @Column({ nullable: true })
  public address: string;

}
