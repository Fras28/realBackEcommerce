import Products from "../db/models/products.model";
import Users from "../db/models/users.model";
import Comments from "../db/models/coments.model";

import ProductM from "../db/models/products.model";
import { where } from "sequelize";

export type Product = {
  id?: number;
  name:string;
  pedido: string;
  description: string;
  size?: string[];
  color?: string[];
  photo?: string[];
  mesa: number;
  price: number;
  status: boolean;
};

export type Adm = "admin";

export type User = {
  id?: number;
  name: string;
  lastname: string;
  nickname: string;
  date?: string;
  picture: string;
  email: string;
  status: boolean;
  category: Adm;
};

export type Comment = {
  id?: number;
  movieId: number;
  idUser: number;
  name: string;
  coment: string;
  picture: string;
  status: boolean;
};

export class AdminService {
  constructor(private UserModel: Users) {}

  async bannUser(id: number) {
    let userX = await Users.update({ status: false }, { where: { id } });
    return userX;
  }

  async unnBanUser(id: number) {
    let userX = await Users.update({ status: true }, { where: { id } });
    return userX;
  }

  async addProduct(product: Product) {
    const findInDb = await Products.findOne({ where: { pedido: product.pedido } });
    console.log(findInDb);
    if (!findInDb) {
      console.log("=============entrandooo======");
      return await Products.create(product, { validate: true });
    }
    console.log("llegamos aca");
    throw Error;
  }

  async statusProduct(id: number) {
    const productInfo = await Products.findAll({ where: { id } });
    if (productInfo[0].status === true) {
      const byeProduct = await Products.update(
        { status: false },
        { where: { id } }
      );
      return !!byeProduct;
    } else {
      const byeProduct = await Products.update(
        { status: true },
        { where: { id } }
      );
      return !!byeProduct;
    }
  }


  async modifierProduct(stat: string, element: string | number, id: number) {
    const ojetEdit = await ProductM.findOne({ where: { id } });
    if (ojetEdit) {
      if (typeof element === "string") {
        if (stat === "pedido") {
          let articleX = await ProductM.update(
            { pedido: element },
            { where: { id } }
          );
          return articleX;
        }
        if (stat === "size") {
          let newArrS: string[] = [];
          newArrS.push(element);
          if (ojetEdit.size) {
            const rta = [...ojetEdit.size, ...newArrS]
            let articleX = await ProductM.update(
              { size: rta },
              { where: { id } }
            );
            return articleX;
          }
          let articleX = await ProductM.update(
            { size: newArrS },
            { where: { id } }
          );
          return articleX;
        }
        if (stat === "description") {
          let articleX = await ProductM.update(
            { description: element },
            { where: { id } }
          );
          return articleX;
        }
        if (stat === "photo") {
          let newArrP: string[] = [];
          newArrP.push(element);
          const rta = [...ojetEdit.photo, ...newArrP]
          let articleX = await ProductM.update(
            { photo: rta },
            { where: { id } }
          );
          return articleX;
        }
        if (stat === "color") {
          let newArrC: string[] = [];
          newArrC.push(element);
          if (ojetEdit.color) {
            const rta = [...ojetEdit.color, ...newArrC]
            let articleX = await ProductM.update(
              { color: rta },
              { where: { id } }
            );
            return articleX;
          }
          let articleX = await ProductM.update(
            { color: newArrC },
            { where: { id } }
          );
          return articleX;
        }
      }
      if (typeof element === "number") {
        if (stat === "mesa") {
          let articleX = await ProductM.update(
            { mesa: element },
            { where: { id } }
          );
          return articleX;
        }
        if (stat === "price") {
          let articleX = await ProductM.update(
            { price: element },
            { where: { id } }
          );
          return articleX;
        }
      }
    }
  }

  async defineAdmin(id: number) {
    let userX = await Users.update({ category: "admin" }, { where: { id } });
    return userX;
  }

  async editeName(id: number, string: string) {
    let editPedido = await Products.update({ pedido: string }, { where: { id } });
    return editPedido;
  }

  async getUserByEmail(email: string) {
    let emailUser = await Users.findOne({ where: { email } });
    return emailUser;
  }

  async allUsers() {
    let arrUsers = await Users.findAll();
    arrUsers.sort((a, b) => {
      if (a.nickname < b.nickname) {
        return 1;
      }
      if (b.nickname < a.nickname) {
        return -1;
      }
      return 0;
    });
    return arrUsers;
  }

  async getUserById(id: number) {
    let idUser = await Users.findOne({ where: { id } });
    return idUser;
  }

  async bannComment(idUser: number) {
    let bann = await Comments.update({ status: false }, { where: { idUser } });
    return bann;
  }



}
