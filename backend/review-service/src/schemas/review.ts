import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({
  toJSON: {
    virtuals: true, // Include virtuals when converting the document to JSON
  },
})
export class Review extends Document {
  @Prop()
  activityId: string;

  @Prop()
  userId: string;

  @Prop()
  rating: number;

  @Prop()
  comment: string;

  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop({ default: null })
  updatedAt: Date;
}

const ReviewSchema = SchemaFactory.createForClass(Review);

ReviewSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: (_, ret) => {
    ret.id = ret._id.toString(); // Change _id to id
    delete ret._id; // Remove _id from JSON
  },
});

export { ReviewSchema };
