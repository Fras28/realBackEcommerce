import { DataTypes, Model } from "sequelize";
import sequelizeConnection from "../db";

interface ProductsAttributes {
  id?: number;
  name?:string;
  pedido?: string;
  description: string;
  size?:string[];
  color?:string[];
  photo?: string[];
  mesa?: number;
  comercio?: string
  section?:string;
  price:number;
  status: boolean;
}

class product extends Model<ProductsAttributes> {
  public id?: number;
  public pedido?: string;
  public name?: string;
  public description!: string;
  public size?:string[];
  public color?:string[];
  public photo?:string[];
  public mesa?: number;
  public comercio!: string;
  public section?: string;
  public price!:number;
  public status!: boolean;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public readonly deletedAt!: Date;
}

product.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
    },
    pedido: {
      type: DataTypes.STRING,
    },
    description: {
      type: DataTypes.STRING,
    },
    color:{
      type: DataTypes.ARRAY(DataTypes.STRING),
    },
    photo: {
      type: DataTypes.ARRAY(DataTypes.STRING),
    },
    size:{
      type: DataTypes.ARRAY(DataTypes.STRING),
    },
    mesa: {
      type: DataTypes.DECIMAL,
    },
    comercio:{
      type: DataTypes.STRING,
    },
    section:{
      type: DataTypes.STRING,
    }
    ,
    price:{
      type: DataTypes.DECIMAL,
    },
    status: {
      type: DataTypes.BOOLEAN,
    }
  },
  { sequelize: sequelizeConnection, paranoid: true }
);

export default product;
