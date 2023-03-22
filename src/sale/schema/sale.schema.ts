import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type SaleDocument = Sale & Document;

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
export class Sale extends Document {
  @Prop({
    type: String,
    required: true,
    trim: true,
  })
  order: string;

  @Prop({
    type: Number,
  })
  vat: number;

  @Prop({
    type: String,
    trim: true,
  })
  total: string;

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

export const SaleSchema = SchemaFactory.createForClass(Sale);
