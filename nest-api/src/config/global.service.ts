import { FilterQuery, Model } from 'mongoose';

export class GlobalService<ModelDoc, CreateDto, UpdateDto> {
  modelSchema: Model<ModelDoc>;

  async create(createDto: CreateDto) {
    const newDoc = new this.modelSchema(createDto);
    return newDoc.save();
  }

  async findAll() {
    return this.modelSchema.find().select('-__v').sort('-updated').exec();
  }

  async findPaginate(rows: string, page: string, filters: any) {
    const limit = parseInt(rows as string) || 10;
    const PAGE = Math.max(0, parseInt(page as string) - 1);
    const filtersParsed: any = { ...filters };

    delete filtersParsed['rows'];
    delete filtersParsed['page'];

    const docs = await this.modelSchema
      .find(filtersParsed)
      .select('-__v')
      .limit(limit)
      .skip(limit * PAGE)
      .sort('-updated');
    const count = await this.modelSchema.countDocuments(filtersParsed);

    return { docs, count };
  }

  async findOne(id: string) {
    return this.modelSchema.findOne({ _id: id } as FilterQuery<ModelDoc>);
  }

  async update(id: string, updateDto: UpdateDto) {
    return this.modelSchema.findByIdAndUpdate(
      id,
      {
        ...updateDto,
        updated: new Date(),
      },
      { returnOriginal: false, new: true },
    );
  }

  async remove(id: string): Promise<boolean> {
    try {
      await this.modelSchema.findByIdAndRemove(id);
      return true;
    } catch (e) {
      return false;
    }
  }
}
