import { UpdateOptions } from 'mongodb';
import {
  Model,
  HydratedDocument,
  UpdateQuery,
  QueryOptions,
  PopulateOptions,
  FilterQuery,
  Types,
  ProjectionType,
  ClientSession,
  PipelineStage,
} from 'mongoose';

/**
 * Generic Base Repository for Mongoose models.
 */
export class BaseRepository<T> {
  protected readonly model: Model<T>;

  constructor(model: Model<T>) {
    this.model = model;
  }

  /**
   * Create a new document
   */
  async create(data: Partial<T>, session?: ClientSession): Promise<HydratedDocument<T>> {
    return await this.model.create([data], { session }).then((docs) => docs[0]);
  }

  /**
   * Insert multiple documents (bulk create)
   */
  async insertMany(
    data: Partial<T>[],
    options?: { ordered?: boolean; session?: ClientSession },
  ) {
    return await this.model.insertMany(data, options);
  }

  /**
   * Find all documents (optionally with filter, projection, and population)
   */
  async findAll(
    filter: FilterQuery<T> = {},
    projection?: ProjectionType<T>,
    options?: QueryOptions<T>,
    populate?: PopulateOptions | (string | PopulateOptions)[]
  ): Promise<HydratedDocument<T>[]> {
    const query = this.model.find(filter, projection, options);

    if (populate) query.populate(populate);

    return await query.exec();
  }

  /**
   * Find one document by filter
   */
  async findOne(
    filter: FilterQuery<T>,
    projection?: ProjectionType<T>,
    options?: QueryOptions<T>,
    populate?: PopulateOptions | (string | PopulateOptions)[]
  ): Promise<HydratedDocument<T> | null> {
    const query = this.model.findOne(filter, projection, options);
    if (populate) query.populate(populate);
    return await query.exec();
  }

  /**
   * Find document by ID
   */
  async findById(
    id: string | Types.ObjectId,
    projection?: ProjectionType<T>,
    options?: QueryOptions<T>,
    populate?: PopulateOptions | (string | PopulateOptions)[]
  ): Promise<HydratedDocument<T> | null> {
    const query = this.model.findById(id, projection, options);
    if (populate) query.populate(populate);
    return await query.exec();
  }

  /**
   * Update by ID and return updated document
   */
  async updateById(
    id: string | Types.ObjectId,
    update: UpdateQuery<T>,
    options: QueryOptions = { new: true },
  ): Promise<HydratedDocument<T> | null> {
    return await this.model.findByIdAndUpdate(id, update, options).exec();
  }

  /**
   * Update by filter
   */
  async updateOne(
    filter: FilterQuery<T>,
    update: UpdateQuery<T>,
    options?: UpdateOptions,
  ): Promise<{ matchedCount: number; modifiedCount: number }> {
    return await this.model.updateOne(filter, update, options).exec();
  }

  /**
   * Update many documents
   */
  async updateMany(
    filter: FilterQuery<T>,
    update: UpdateQuery<T>,
    options?: UpdateOptions,
  ): Promise<{ matchedCount: number; modifiedCount: number }> {
    const res = await this.model.updateMany(filter, update, options).exec();
    return {
      matchedCount: res.matchedCount,
      modifiedCount: res.modifiedCount,
    };
  }

  /**
   * Delete a document by ID
   */
  async deleteById(id: string | Types.ObjectId): Promise<HydratedDocument<T> | null> {
    return await this.model.findByIdAndDelete(id).exec();
  }

  /**
   * Delete by filter
   */
  async deleteMany(filter: FilterQuery<T>): Promise<number> {
    const res = await this.model.deleteMany(filter).exec();
    return res.deletedCount ?? 0;
  }

  /**
   * Count documents by filter
   */
  async count(filter: FilterQuery<T> = {}): Promise<number> {
    return await this.model.countDocuments(filter).exec();
  }

  /**
   * Paginated find
   */
  async paginate(
    filter: FilterQuery<T>,
    {
      page = 1,
      limit = 10,
      sort = { createdAt: -1 },
      projection,
      populate,
    }: {
      page?: number;
      limit?: number;
      sort?: Record<string, 1 | -1>;
      projection?: ProjectionType<T>;
      populate?: PopulateOptions | (string | PopulateOptions)[];
    } = {},
  ): Promise<{ data: HydratedDocument<T>[]; pagination: { total: number; page: number; pages: number; limit: number; }; }> {
    const skip = (page - 1) * limit;

    const [data, total] = await Promise.all([
      this.model
        .find(filter, projection)
        .sort(sort)
        .skip(skip)
        .limit(limit)
        .populate(populate || [])
        .exec(),
      this.model.countDocuments(filter),
    ]);

    return {
      data,
      pagination: {
        total,
        page,
        pages: Math.ceil(total / limit),
        limit
      }
    };
  }

  /**
   * Start a transaction (useful for multi-step wallet ops)
   */
  async startTransaction(): Promise<ClientSession> {
    return await this.model.db.startSession();
  }

  /**
   * Check if document exists
   */
  async exists(filter: FilterQuery<T>): Promise<boolean> {
    const exists = await this.model.exists(filter);
    return !!exists;
  }

  /**
   * Raw aggregate pipeline
   */
  async aggregate<R = any>(pipeline: PipelineStage[]): Promise<R[]> {
    return await this.model.aggregate(pipeline).exec();
  }
}