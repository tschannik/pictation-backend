import { PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, DeepPartial } from 'typeorm';

/**
 * Contains common entity properties
 */
export abstract class BaseEntity {
  @PrimaryGeneratedColumn('increment')
  public id: number;

  @CreateDateColumn({ type: 'datetime', name: 'created_at' })
  public createdAt: Date;

  @UpdateDateColumn({ type: 'datetime', name: 'updated_at' })
  public updatedAt: Date;

  protected constructor(input?: DeepPartial<BaseEntity>) {
    if (input) {
      for (const [key, value] of Object.entries(input)) {
        this[key] = value;
      }
    }
  }
}
