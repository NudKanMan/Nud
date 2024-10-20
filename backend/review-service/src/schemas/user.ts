import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({
  toJSON: {
    virtuals: true, // Include virtuals when converting the document to JSON
  },
})
export class User extends Document {
  @Prop()
  userId: string;

  @Prop()
  name: string;

  @Prop()
  email: string;
}

const UserSchema = SchemaFactory.createForClass(User);

UserSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: (_, ret) => {
    ret.id = ret._id.toString(); // Change _id to id
    delete ret._id; // Remove _id from JSON
  },
});

export { UserSchema };
