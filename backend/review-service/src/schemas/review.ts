import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Review {
  @Prop()
  title: string;

  @Prop()
  description: number;
}

export const ReviewSchema = SchemaFactory.createForClass(Review);
