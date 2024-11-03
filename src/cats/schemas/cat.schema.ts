import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Schema as MongooseSchema } from 'mongoose';
import { User } from 'src/user/schemas/user.schema';

@Schema({
  toJSON: {
    virtuals: true,
    versionKey: false,
    transform: (doc, ret) => {
      ret.id = ret._id;
      delete ret._id;

      return ret;
    },
  },
})
export class Cat {
  id: string;

  @Prop()
  name: string;

  @Prop()
  age: number;

  @Prop()
  breed: string;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User' })
  owner: string | User;
}

export type CatDocument = HydratedDocument<Cat>;

export const CatSchema = SchemaFactory.createForClass(Cat);
