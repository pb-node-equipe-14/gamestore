import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from 'typeorm';

@Entity('payment_infos')
class PaymentInfo {
  @PrimaryGeneratedColumn('uuid')
  readonly id: string;

  @Column({ length: 120 })
  name: string;

  @Column({ length: 120 })
  number: string;

  @CreateDateColumn({ type: 'date' })
  dueDate: Date;

  @Column({ length: 3 })
  code: string;
}

export { PaymentInfo };
