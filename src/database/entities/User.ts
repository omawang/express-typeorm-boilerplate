import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  BaseEntity,
  BeforeInsert,
} from 'typeorm'
import bcrypt from 'bcrypt'

@Entity({ schema: 'master', name: 'users' })
export class User extends BaseEntity {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number

  @Column({ type: 'varchar' })
  name: string

  @Column({ type: 'varchar', unique: true })
  phone: string

  @Column({ type: 'varchar' })
  profession: string

  @Column({ nullable: true })
  avatar: string

  @Column({ type: 'varchar', unique: true })
  email: string

  @Column({ type: 'varchar', select: false })
  password: string

  @Column({ type: 'varchar', select: false })
  pin: string

  @Column({ type: 'boolean', default: false })
  is_agent: string

  @Column({ type: 'timestamp without time zone', nullable: true })
  agent_verified_at: Date

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date

  @Column({ type: 'timestamp without time zone', nullable: true })
  deleted_at: Date

  @BeforeInsert()
  async hashPassword() {
    const salt = process.env.SALT_ROUND ? Number(process.env.SALT_ROUND) : 10
    this.password = await bcrypt.hashSync(this.password, salt)
    this.pin = await bcrypt.hashSync(this.pin, salt)
  }
}
