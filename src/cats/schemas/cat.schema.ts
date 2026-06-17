import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Schema as MongooseSchema } from 'mongoose';
import { User } from 'src/user/schemas/user.schema';

@Schema({
  versionKey: false,
})
export class Cat {
  _id: string;

  @Prop()
  name: string;

  @Prop()
  age: number;

  @Prop()
  breed: string;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User' })
  owner: string | Pick<User, '_id' | 'login'>;
}

export type CatDocument = HydratedDocument<Cat>;

export const CatSchema = SchemaFactory.createForClass(Cat);
