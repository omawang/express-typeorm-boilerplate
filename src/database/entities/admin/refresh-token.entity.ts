import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm'
import { User } from './user.entity'

@Entity({ schema: 'admin', name: 'refresh_tokens' })
export class RefreshToken extends BaseEntity {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number

  @ManyToOne(() => User, (user) => user.id, { eager: true })
  @JoinColumn({ name: 'user_id' })
  user: User
  @Column({ type: 'bigint' })
  user_id: number

  @Column({ type: 'text' })
  token: string

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date

  @Column({ type: 'timestamp without time zone', nullable: true })
  deleted_at: Date
}
