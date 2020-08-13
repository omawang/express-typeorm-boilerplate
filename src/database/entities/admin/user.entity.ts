import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  BaseEntity,
  BeforeInsert,
  BeforeUpdate,
} from 'typeorm'
import bcrypt from 'bcrypt'
import { UsergroupEnum } from 'src/shared/enums/admin/user.enum'

@Entity({ schema: 'admin', name: 'users' })
export class User extends BaseEntity {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number

  @Column({ type: 'varchar' })
  usergroup: UsergroupEnum

  @Column({ type: 'varchar' })
  name: string

  @Column({ type: 'varchar' })
  phone: string

  @Column({ type: 'varchar', nullable: true })
  avatar: string

  @Column({ type: 'varchar', unique: true })
  email: string

  @Column({ type: 'varchar', select: false })
  password: string

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date

  @Column({ type: 'timestamp without time zone', nullable: true })
  deleted_at: Date

  @BeforeInsert()
  @BeforeUpdate()
  async hashPasswordAndPin() {
    const salt = process.env.SALT_ROUND ? Number(process.env.SALT_ROUND) : 10
    if (this.password) {
      this.password = await bcrypt.hashSync(this.password, salt)
    }
  }
}
