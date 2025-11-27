export abstract class BaseEntity {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date | null;

  constructor() {
    this.id = crypto.randomUUID();
    this.createdAt = new Date();
    this.updatedAt = new Date();
    this.deletedAt = null;
  }

  markAsDeleted() {
    this.deletedAt = new Date();
  }

  touch() {
    this.updatedAt = new Date();
  }
}