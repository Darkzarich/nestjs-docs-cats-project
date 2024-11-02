import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

@Schema({
  toJSON: {
    virtuals: true,
    versionKey: false,
  },
})
export class User {
  @Prop({ required: true, unique: true })
  login: string;

  /** Hashed password */
  @Prop({ required: true })
  password: string;
}

export type UserDocument = HydratedDocument<User>;

export const UserSchema = SchemaFactory.createForClass(User);
