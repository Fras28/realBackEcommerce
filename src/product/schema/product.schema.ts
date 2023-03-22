import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ProductDocument = Product & Document;

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
export class Product extends Document {
  @Prop({
    type: String,
    required: true,
    trim: true,
  })
  name: string;

  @Prop({
    type: Number,
  })
  price: number;

  @Prop({
    type: String,
    trim: true,
  })
  section: string;

  @Prop({
    type: String,
    trim: true,
  })
  description: string;

  @Prop({
    type: Boolean,
    default: false,
  })
  available: boolean;

  @Prop({
    type: Number,
    select: false,
  })
  __v: number;

  @Prop({
    select: false,
  })
  createdAt: string;

  @Prop({
    select: false,
  })
  updatedAt: string;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
