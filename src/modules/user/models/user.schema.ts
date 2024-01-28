import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Role } from 'src/common/enums/rol.enum';
import { Membership } from 'src/common/enums/membership.enum';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: String, required: true })
  lastName: string;

  @Prop()
  age: number;

  @Prop({ type: Number })
  height: number;

  @Prop({ type: Number })
  weight: number;

  @Prop({ type: String, required: true })
  email: string;

  @Prop({ type: String })
  password: string;

  @Prop({ type: String })
  genre: string;

  @Prop({ type: String, enum: Membership, default: Membership.FULL })
  membership: Membership;

  @Prop({ type: String, enum: Role, default: Role.USER })
  role: Role;
}

export const UserSchema = SchemaFactory.createForClass(User);
UserSchema.set('toJSON', {
  transform: (doc, ret) => {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
  },
});
