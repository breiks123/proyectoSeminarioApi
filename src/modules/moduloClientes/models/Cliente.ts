import mongoose, { Schema, Document } from "mongoose";

export interface ISimpleCliente {
  nombre: string,
  apellidos:string,
  email: string,
  password?: string;
  telefono?:string,
  ci?:string,
  registerdate?: Date,
  zona?:string,
  calleNumero?:string,
  tipoCliente?:string,
  estadoCliente?:string,
  probabilidadCaptacion?:Number,
  longitud?:string,
  latitud?:string,
  rutaCliente?:boolean,
  uriavatar?: string,
  pathavatar?: string,
  idVendedor?:string
}
export interface ICliente extends Document {
  
  nombre: string,
  apellidos:string,
  email: string,
  password?: string,
  telefono:string,
  ci:string,
  registerdate: Date,
  idVendedor:string,
  zona?:string,
  calleNumero:string,
  tipoCliente:string,
  estadoCliente:string,
  probabilidadCaptacion:Number,
  longitud:string,
  latitud:string,
  rutaCliente:boolean,
  uriavatar?: string,
  pathavatar?: string
  
  
}
const clienteSchema: Schema = new Schema({
  nombre: { type: String, required: true},
  apellidos: {type: String, required: true},
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  telefono: { type: String, required: true },
  ci:{ type: String, required: true, unique:true },
  registerdate: { type: Date, required: true },
  idVendedor:{type:String},
  zona:{ type: String},
  calleNumero:{ type: String},
  tipoCliente:{ type: String},
  estadoCliente:{type:String},
  probabilidadCaptacion:{ type: Number},
  longitud:{ type: String},
  latitud:{ type: String},
  rutaCliente:{type:Boolean},
  uriavatar: { type: String },
  pathavatar: { type: String },
  
});
export default mongoose.model<ICliente>("Cliente", clienteSchema);