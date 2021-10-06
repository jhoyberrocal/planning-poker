import { Schema } from 'mongoose';
import slugify from 'slugify';

type DocMock = { slug: string; name: string };

export const slugFactory = <T extends DocMock, S extends Schema>(Schema: S) => {
  const schema = Schema;
  schema.pre<T>('save', function (next) {
    this.slug = slugify(this.name, { lower: true });
    next();
  });
  return schema;
};
