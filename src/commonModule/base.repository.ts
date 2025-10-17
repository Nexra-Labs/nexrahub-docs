// base.repository.ts
import {
  Model,
  HydratedDocument,
  UpdateQuery,
  QueryOptions,
  PopulateOptions,
  Types
} from 'mongoose';

export class BaseRepository<T> {
  protected readonly model: Model<HydratedDocument<T>>;

  constructor(model: Model<HydratedDocument<T>>) {
    this.model = model;
  }

  async create(data: Partial<T>): Promise<HydratedDocument<T>> {
    const newDocument = new this.model(data);
    return newDocument.save() as Promise<HydratedDocument<T>>;
  }

  async updateById(
    id: string | Types.ObjectId,
    data: UpdateQuery<HydratedDocument<T>>,
    options?: QueryOptions,
  ): Promise<HydratedDocument<T> | null> {
    return await this.model.findByIdAndUpdate(id, data, {
      new: true,
      ...options,
    });
  }

  async findAll(): Promise<HydratedDocument<T>[]> {
    return await this.model.find().exec();
  }

  async findById(id: string | Types.ObjectId): Promise<HydratedDocument<T> | null> {
    return await this.model.findById(id).exec();
  }

  async findOne(
    query: object,
    projection?: object,
    options?: QueryOptions,
    populate?: string | PopulateOptions | Array<string | PopulateOptions>,
  ): Promise<HydratedDocument<T> | null> {
    let queryBuilder = this.model.findOne(query, projection, options);

    if (populate) {
      if (typeof populate === 'string') {
        queryBuilder = queryBuilder.populate({ path: populate });
      } else {
        queryBuilder = queryBuilder.populate(populate);
      }
    }

    return await queryBuilder.exec();
  }

  async delete(id: string): Promise<HydratedDocument<T> | null> {
    const result = await this.model.findByIdAndDelete(id);
    return result;
  }

  async documentCount(query?: object): Promise<number> {
    return await this.model.countDocuments(query);
  }
}
