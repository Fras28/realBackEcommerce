import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Exclude } from 'class-transformer';
import { Document } from 'mongoose';

export type OrderDocument = Order & Document;

@Schema({
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: (doc, returned, opts) => {
      returned.id = returned._id;
      delete returned._id;
    },
  },
})
export class Order extends Document {
  @Prop({
    type: Number,
    required: true,
    trim: true,
  })
  table: number;

  @Prop({
    type: Number,
  })
  items: [];

  @Prop({
    type: Number,
  })
  total: number;

  @Prop({
    type: Number,
    select: false,
  })
  __v: number;

  @Prop({
    select: false,
  })
  updatedAt: string;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
