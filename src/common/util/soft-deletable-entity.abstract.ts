import { DeleteDateColumn, DeepPartial } from 'typeorm';
import { BaseEntity } from './base-entity.abstract';

/**
 * Soft deletable entities, adds a deleted_at column to the base entity
 */
export abstract class SoftDeletableEntity extends BaseEntity {
  @DeleteDateColumn({ type: 'datetime', name: 'deleted_at', nullable: true })
  public deletedAt: Date;

  protected constructor(input?: DeepPartial<SoftDeletableEntity>) {
    super(input);

    if (input) {
      for (const [key, value] of Object.entries(input)) {
        this[key] = value;
      }
    }
  }
}
