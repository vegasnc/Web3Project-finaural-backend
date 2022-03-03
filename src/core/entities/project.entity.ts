import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";
import { Exclude } from "class-transformer";

@Entity()
export class Project {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column({ unique: true })
  filePath: string;

  // @ManyToOne((_type) => User, (user) => user.projects, {eager: false})
  // @Exclude({ toPlainOnly: true })
  // user: User
}