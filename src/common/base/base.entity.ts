export abstract class BaseEntity {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date | null;

  constructor(props?: Partial<BaseEntity>) {
    this.id = props?.id ?? crypto.randomUUID();
    this.createdAt = props?.createdAt ?? new Date();
    this.updatedAt = props?.updatedAt ?? new Date();
    this.deletedAt = props?.deletedAt ?? null;
  }

  markAsDeleted() {
    this.deletedAt = new Date();
  }

  touch() {
    this.updatedAt = new Date();
  }
}
