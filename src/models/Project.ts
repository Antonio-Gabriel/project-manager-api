import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm";

import { Client } from "./Client";
import ProjectStatus from "../status/ProjectStatus";
import { User } from "./User";

@Entity("projects")
class Project {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  client_id: string;

  @ManyToOne(() => Client)
  @JoinColumn({ name: 'client_id'})
  client: string;

  @Column()
  user_id: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id'})
  user: string;

  @Column({
    type: "varchar"
  })
  status: ProjectStatus;

  @Column()
  logo: string;

  @Column()
  description: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export { Project }