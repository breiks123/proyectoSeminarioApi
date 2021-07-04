//HORACIO
import mongoose, { Schema, Document } from "mongoose";

export interface ISimpleProducto {
  nombreProducto: string,
  registerdate?: Date,
  precio:number,
  stock:number,
  estado?:boolean,//disponible- agotado
  categoria?:string,
  uriImagen?: string,
  pathImagen?: string,
}
export interface IProducto extends Document {
    nombreProducto: string,
  registerdate?: Date,
  precio:number,
  stock:number,
  estado?:boolean,
  categoria?:string,
  uriImagen?: string,
  pathImagen?: string,
 
  
  
}
const productoSchema: Schema = new Schema({
    nombreProducto:{type:String,required:true},
    registerdate: {type:Date},
    precio:{type:Number,required:true},
    stock:{type:Number,required:true},
    estado:{type:Boolean},//true = disponible// false=agotado
    categoria:{type:String},
    uriImagen:{type:String},
    pathImagen: {type:String},
  
});
export default mongoose.model<IProducto>("Productos", productoSchema);